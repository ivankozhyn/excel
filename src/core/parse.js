import {Parser} from 'hot-formula-parser'

export function parse(value = '') {
  if (value.startsWith('=')) {
    try {
      const parser = new Parser()
      return parser.parse(value.slice(1)).result;
    } catch (e) {
      return value;
    }
  }
  return value;
}
