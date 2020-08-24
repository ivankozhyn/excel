import {storage} from '@core/utils'

function toHTML(key) {
  const model = storage(key)
  const id = key.split(':')[1]
  return `
    <li class="db__record">
      <a href="#excel/${id}">
        <span class="db-record__title">
          ${model.title}
        </span>
        <span class="db-record__date">
          <span class="db-record__date--day">
            ${new Date(model.openedDate).toLocaleDateString('ru-RU')}
          </span>
          <span class="db-record__date--time">
            ${new Date(model.openedDate).toLocaleTimeString('ru-RU')}
          </span>
        </span>
      </a>
    </li>
  `
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i< localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }

  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()
  if (!keys.length) {
    return `
      <p style="text-align: center">Ви не створили жодної таблиці<p/>
    `
  }
  return `
    <div class="db__list-header">
      <span>Назва</span>
      <span>Дата відкриття</span>
    </div>
    <ul class="db__list">
      ${keys.map(toHTML).join('')}
    </ul>
  `
}
