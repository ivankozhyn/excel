import {
  DEFAULT_COL_WIDTH,
  DEFAULT_ROW_HEIGHT,
  defaultStyles,
} from '@/config/config'
import {toInlineStyles} from '@core/utils'
import {parse} from '@core/parse'

const KEYBOARD_CODES = {
  A: 65,
  Z: 90,
}

const toColumn = ({col, index, width}) => {
  return `
<div
  class="column"
  data-type="resizable"
  data-col="${index}"
  style="width: ${width}"
>
  ${col}
  <div class="col-resize" data-resize="col"></div>
</div>
`
}

function toCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`
    const width = getWidth(state.colState, col)
    const data = state.dataState[id]
    const styles = toInlineStyles({...defaultStyles, ...state.stylesState[id]})

    return `
      <div
        class="cell"
        contenteditable
        data-type="cell"
        data-col="${col}"
        data-id="${id}"
        style="${styles}; width: ${width}"
        data-value="${state.dataState[id] || ''}"
        spellcheck="false"
      >
      ${parse(data) || ''}
      </div>
    `
  }
}

function createRow(index, content, state) {
  const height = getHeight(state, index)
  const resizer = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : ''

  return `
  <div
    class="row"
    data-type="resizable"
    data-row="${index}"
    style="height: ${height}"
  >
  <div class="row-info">
    ${index ? index : ''}
    ${resizer}
  </div>
  <div class="row-data">${content}</div>
</div>
  `
}

const toChar = (_, index) => String.fromCharCode(KEYBOARD_CODES.A + index)

function getWidth(state, index) {
  return (state[index] || DEFAULT_COL_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_ROW_HEIGHT) + 'px'
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index),
    }
  }
}

export function createTable(rowsCount = 20, state = {}) {
  const colsCount = KEYBOARD_CODES.Z - KEYBOARD_CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols, {}))

  for (let row = 0; row < rowsCount; row += 1) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('')
    rows.push(createRow(row + 1, cells, state.rowState))
  }

  return rows.join('')
}
