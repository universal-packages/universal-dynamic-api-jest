import { Dynamic } from '@universal-packages/dynamic-api'

@Dynamic('excellent')
export default class ExcellentDynamic {
  public static calls = []

  public perform(body: any): void {
    ExcellentDynamic.calls.push(body)
  }
}
