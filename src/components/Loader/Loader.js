import {$} from '../../core/dom'

export function loader() {
  return $.create('div', 'loaderWrapper').html(`
    <div class="loader">
      <div class="l_main">
        <div class="l_square"><span></span><span></span><span></span></div>
        <div class="l_square"><span></span><span></span><span></span></div>
        <div class="l_square"><span></span><span></span><span></span></div>
        <div class="l_square"><span></span><span></span><span></span></div>
      </div>
    </div>
  `)
}
