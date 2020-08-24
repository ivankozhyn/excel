import {throttle} from '@core/utils'
import {throttleTime} from '@/config/config'

export class StateProcessor {
  constructor(client, delay = throttleTime) {
    this.client = client
    this.listen = throttle(this.listen.bind(this), delay)
  }

  listen(state) {
    this.client.save(state)
  }

  get() {
    return this.client.get()
  }
}
