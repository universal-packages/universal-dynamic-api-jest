import { Dynamic } from '@universal-packages/dynamic-api'

@Dynamic('good')
export default class GoodDynamic {
  public static calls = []

  public perform(body: any): any {
    GoodDynamic.calls.push(body)
    return body
  }
}
