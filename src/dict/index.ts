import _ from 'lodash'
import userDict from './components/user'

interface DictOptions {
  [key: string]: string
}

export const dictInfo = {
  ...userDict,
}

/**
 * 获取字典信息
 * @param options 字典选项
 * @param value 值
 * @param valueKey 值的键名
 * @returns 字典信息
 */
export function getDictInfo(
  options: DictOptions[],
  value: any,
  valueKey?: string,
) {
  const cloneValueKey = valueKey || 'value'

  const cloneOptions = _.cloneDeep(options)

  const result = cloneOptions.find(option => option[cloneValueKey] === value)

  return result ?? '--'
}
