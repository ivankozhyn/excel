import {Page} from '@core/Page'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {createStore} from '@/core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {normalizeInitialState} from '@/redux/initialState'
import {storage, throttle} from '@core/utils'
import {throttleTime} from '@/config/config'

function storageName(param) {
  return `excel:${param}`
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString()
    const state = storage(storageName(params))
    const store = createStore(rootReducer, normalizeInitialState(state))

    const stateListener = throttle(state => {
      storage(storageName(params), state)
    }, throttleTime)

    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init(0)
  }

  destroy() {
    this.excel.destroy()
  }
}
