import { DynamicApi } from '@universal-packages/dynamic-api'

import GoodDynamic from './__fixtures__/Good.dynamic'
import GoodBeforeHookDynamic from './__fixtures__/GoodBeforeHook.dynamic'

describe('dynamic-api-jest', (): void => {
  describe('toHaveBeenPerformedWith (errors)', (): void => {
    it('throws if dynamics are not loaded', async (): Promise<void> => {
      let error: Error

      try {
        expect(GoodDynamic).toHaveBeenPerformedWith({ case: 1 })
      } catch (e) {
        error = e
      }

      expect(error.message).toEqual('Expected dynamic to have been loaded properly by an API, but it was not')
    })

    it('throws if a hook is passed instead of a dynamic', async (): Promise<void> => {
      const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__' })

      await dynamicApi.loadDynamics()

      let error: Error

      try {
        expect(GoodBeforeHookDynamic).toHaveBeenPerformedWith({ case: 1 })
      } catch (e) {
        error = e
      }

      expect(error.message).toEqual('Subject is a hook, not a dynamic class')
    })

    it('throws if the subject is not a dynamic', async (): Promise<void> => {
      const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__' })

      await dynamicApi.loadDynamics()

      let error: Error

      try {
        expect({}).toHaveBeenPerformedWith({ case: 1 })
      } catch (e) {
        error = e
      }

      expect(error.message).toEqual('Expected subject to be a dynamic but is not')
    })
  })
})
