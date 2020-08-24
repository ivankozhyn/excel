import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {changeTitle} from '@/redux/actions'
import {defaultTitle, throttleTime} from '@/config/config'
import {throttle} from '@core/utils'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    })
  }

  prepare() {
    this.onInput = throttle(this.onInput, throttleTime)
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
      <input type="text" class="input" value="${title}">
      <div>
        <div
          class="button"
          data-button="delete"
          title="Видалити таблицю"
        >
          <i class="material-icons" data-button="delete">
            delete
          </i>
        </div>
        <div
          class="button"
          data-button="exit"
          title="Перейти в панель управління"
        >
        <i class="material-icons" data-button="exit">
          exit_to_app
        </i>
      </div>
      </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }

  onClick(event) {
    const target = $(event.target)
    if (target.data.button === 'delete') {
      const decision = confirm('Вы действительно хотите удалить эту таблицу?')
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if (target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }
}