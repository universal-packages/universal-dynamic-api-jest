import { DynamicApi } from '@universal-packages/dynamic-api'
import stripAnsi from 'strip-ansi'

import '../src'
import GoodDynamic from './__fixtures__/Good.dynamic'
import GoodAfterHookDynamic from './__fixtures__/GoodAfterHook.dynamic'
import GoodBeforeHookDynamic from './__fixtures__/GoodBeforeHook.dynamic'

describe('dynamic-api-jest', (): void => {
  describe('toHaveBeenHookedBefore', (): void => {
    it('asserts if a hook as performed before a dynamic', async (): Promise<void> => {
      const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__' })

      await dynamicApi.loadDynamics()

      dynamicApi.performDynamicSync('good', { call: 1, good: true })

      expect(GoodBeforeHookDynamic).toHaveBeenHookedBefore(GoodDynamic)
      expect(GoodAfterHookDynamic).not.toHaveBeenHookedBefore(GoodDynamic)
    })

    it('fails and shows if a hook was not performed before a dynamic because the dynamic was not even performed', async (): Promise<void> => {
      const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__' })

      await dynamicApi.loadDynamics()

      let error: Error

      try {
        expect(GoodBeforeHookDynamic).toHaveBeenHookedBefore(GoodDynamic)
      } catch (e) {
        error = e
      }

      expect(stripAnsi(error.message)).toEqual('expected "GoodBeforeHookDynamic" to have been hooked before "GoodDynamic" but the dynamic was not performed')
    })

    it('fails and shows if a hook was not performed before a dynamic and tells which ones where', async (): Promise<void> => {
      const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__' })

      await dynamicApi.loadDynamics()

      dynamicApi.performDynamicSync('good', { call: 1, good: true })

      let error: Error

      try {
        expect(GoodAfterHookDynamic).toHaveBeenHookedBefore(GoodDynamic)
      } catch (e) {
        error = e
      }

      expect(stripAnsi(error.message)).toEqual(
        'expected "GoodAfterHookDynamic" to have been hooked before "GoodDynamic" but it was not. Performed hooks were: "GoodBeforeHookDynamic"'
      )
    })

    it('fails and shows if a hook was performed before a dynamic but it was not expected', async (): Promise<void> => {
      const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__' })

      await dynamicApi.loadDynamics()

      dynamicApi.performDynamicSync('good', { call: 1, good: true })

      let error: Error

      try {
        expect(GoodBeforeHookDynamic).not.toHaveBeenHookedBefore(GoodDynamic)
      } catch (e) {
        error = e
      }

      expect(stripAnsi(error.message)).toEqual('expected "GoodBeforeHookDynamic" not to have been hooked before "GoodDynamic", but it was')
    })
  })
})
