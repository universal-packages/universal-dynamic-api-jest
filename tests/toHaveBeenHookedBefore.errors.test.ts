import { DynamicApi } from '@universal-packages/dynamic-api'

import GoodDynamic from './__fixtures__/Good.dynamic'
import GoodBeforeHookDynamic from './__fixtures__/GoodBeforeHook.dynamic'

describe('dynamic-api-jest', (): void => {
  describe('toHaveBeenHookedBefore (errors)', (): void => {
    it('throws if dynamics are not loaded', async (): Promise<void> => {
      let error: Error

      try {
        expect(GoodBeforeHookDynamic).toHaveBeenHookedBefore(GoodDynamic)
      } catch (e) {
        error = e
      }

      expect(error.message).toEqual('Expected hook to have been loaded properly by an API, but it was not')
    })

    it('throws if a dynamic is passed instead of a hook', async (): Promise<void> => {
      const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__' })

      await dynamicApi.loadDynamics()

      let error: Error

      try {
        expect(GoodDynamic).toHaveBeenHookedBefore(GoodDynamic)
      } catch (e) {
        error = e
      }

      expect(error.message).toEqual('Subject is a dynamic class, not a hook')
    })

    it('throws if the subject is not a hook', async (): Promise<void> => {
      const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__' })

      await dynamicApi.loadDynamics()

      let error: Error

      try {
        expect({}).toHaveBeenHookedBefore(GoodDynamic)
      } catch (e) {
        error = e
      }

      expect(error.message).toEqual('Expected subject to be a hook but is not')
    })

    it('throws if dynamic was not loaded', async (): Promise<void> => {
      const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__' })

      await dynamicApi.loadDynamics()

      let error: Error

      try {
        expect(GoodBeforeHookDynamic).toHaveBeenHookedBefore({ __name: 'dynamic' })
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
        expect(GoodBeforeHookDynamic).toHaveBeenHookedBefore(GoodBeforeHookDynamic)
      } catch (e) {
        error = e
      }

      expect(error.message).toEqual('Dynamic is a hook, not a dynamic class')
    })

    it('throws if the dynamic is not a dynamic', async (): Promise<void> => {
      const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__' })

      await dynamicApi.loadDynamics()

      let error: Error

      try {
        expect(GoodBeforeHookDynamic).toHaveBeenHookedBefore({})
      } catch (e) {
        error = e
      }

      expect(error.message).toEqual('Expected dynamic to be a dynamic but is not')
    })
  })
})
