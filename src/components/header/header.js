import {ExcelComponent} from '@core/excelComponent';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  toHTML() {
    return `
    <input type="text" class="text" value="New table" />
    <div>
      <div class="button">
        <span class="material-icons">delete</span>
      </div>
      <div class="button">
        <span class="material-icons">exit_to_app</span>
      </div>
    </div>
    `
  }
}
