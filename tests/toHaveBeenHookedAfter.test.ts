import { DynamicApi } from '@universal-packages/dynamic-api'
import stripAnsi from 'strip-ansi'

import GoodDynamic from './__fixtures__/Good.dynamic'
import GoodAfterHookDynamic from './__fixtures__/GoodAfterHook.dynamic'
import GoodBeforeHookDynamic from './__fixtures__/GoodBeforeHook.dynamic'

describe('dynamic-api-jest', (): void => {
  describe('toHaveBeenHookedAfter', (): void => {
    it('asserts if a hook as performed after a dynamic', async (): Promise<void> => {
      const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__' })

      await dynamicApi.loadDynamics()

      dynamicApi.performDynamicSync('good', { call: 1, good: true })

      expect(GoodAfterHookDynamic).toHaveBeenHookedAfter(GoodDynamic)
      expect(GoodBeforeHookDynamic).not.toHaveBeenHookedAfter(GoodDynamic)
    })

    it('fails and shows if a hook was not performed after a dynamic because the dynamic was not even performed', async (): Promise<void> => {
      const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__' })

      await dynamicApi.loadDynamics()

      let error: Error

      try {
        expect(GoodAfterHookDynamic).toHaveBeenHookedAfter(GoodDynamic)
      } catch (e) {
        error = e
      }

      expect(stripAnsi(error.message)).toEqual('expected "GoodAfterHookDynamic" to have been hooked after "GoodDynamic" but the dynamic was not performed')
    })

    it('fails and shows if a hook was not performed after a dynamic and tells which ones where', async (): Promise<void> => {
      const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__' })

      await dynamicApi.loadDynamics()

      dynamicApi.performDynamicSync('good', { call: 1, good: true })

      let error: Error

      try {
        expect(GoodBeforeHookDynamic).toHaveBeenHookedAfter(GoodDynamic)
      } catch (e) {
        error = e
      }

      expect(stripAnsi(error.message)).toEqual(
        'expected "GoodBeforeHookDynamic" to have been hooked after "GoodDynamic" but it was not. Performed hooks were: "GoodAfterHookDynamic"'
      )
    })

    it('fails and shows if a hook was performed after a dynamic but it was not expected', async (): Promise<void> => {
      const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__' })

      await dynamicApi.loadDynamics()

      dynamicApi.performDynamicSync('good', { call: 1, good: true })

      let error: Error

      try {
        expect(GoodAfterHookDynamic).not.toHaveBeenHookedAfter(GoodDynamic)
      } catch (e) {
        error = e
      }

      expect(stripAnsi(error.message)).toEqual('expected "GoodAfterHookDynamic" not to have been hooked after "GoodDynamic", but it was')
    })
  })
})
