import { Dynamic } from '@universal-packages/dynamic-api'

@Dynamic('good')
export default class GoodDynamic {
  public static calls = []

  public perform(body: any): void {
    GoodDynamic.calls.push(body)
  }
}
