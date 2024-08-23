import { DynamicApi } from '@universal-packages/dynamic-api'

import '../src'
import GoodDynamic from './__fixtures__/Good.dynamic'

describe('dynamic-api-jest', (): void => {
  it('lets you mock a dynamic response once', async (): Promise<void> => {
    const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__' })

    await dynamicApi.loadDynamics()

    let result = dynamicApi.performDynamicSync('good', { call: 1 })

    expect(result).toEqual({ call: 1 })

    dynamicApiJest.mockDynamicReturnValue(GoodDynamic, 'mocked result')

    result = dynamicApi.performDynamicSync('good', { call: 2 })

    expect(result).toEqual('mocked result')

    result = dynamicApi.performDynamicSync('good', { call: 3 })

    expect(result).toEqual({ call: 3 })

    expect(GoodDynamic).toHaveBeenPerformedWith({ call: 1 })
    expect(GoodDynamic).toHaveBeenPerformedWith({ call: 2 })
    expect(GoodDynamic).toHaveBeenPerformedWith({ call: 3 })
  })
})
