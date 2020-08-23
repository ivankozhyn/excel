import {Parser} from 'hot-formula-parser'

const parser = new Parser()

export function parse(value = '') {
  if (value.startsWith('=')) {
    try {
      return parser.parse(value.slice(1)).result;
    } catch (e) {
      return value;
    }
  }
  return value;
}
