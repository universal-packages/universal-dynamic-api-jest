import { DynamicApi } from '@universal-packages/dynamic-api'
import stripAnsi from 'strip-ansi'

import '../src'
import ExcellentDynamic from './__fixtures__/Excellent.dynamic'
import GoodDynamic from './__fixtures__/Good.dynamic'

describe('dynamic-api-jest', (): void => {
  describe('toHaveBeenPerformed', (): void => {
    it('asserts a dynamic being performed', async (): Promise<void> => {
      const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__' })

      await dynamicApi.loadDynamics()

      dynamicApi.performDynamicSync('good', { call: 1 })
      dynamicApi.performDynamicSync('excellent', { call: 1 })

      expect(GoodDynamic).toHaveBeenPerformed()
      expect(ExcellentDynamic).toHaveBeenPerformed()
    })

    it('fails and shows if a dynamic was not performed', async (): Promise<void> => {
      const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__' })

      await dynamicApi.loadDynamics()

      let error: Error

      try {
        expect(GoodDynamic).toHaveBeenPerformed()
      } catch (e) {
        error = e
      }

      expect(stripAnsi(error.message)).toEqual('expected "GoodDynamic" to have been performed but no dynamics were performed')
    })

    it('fails and shows the if a dynamic was not performed and tells which ones where', async (): Promise<void> => {
      const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__' })

      await dynamicApi.loadDynamics()

      dynamicApi.performDynamicSync('excellent', { call: 1 })

      let error: Error

      try {
        expect(GoodDynamic).toHaveBeenPerformed()
      } catch (e) {
        error = e
      }

      expect(stripAnsi(error.message)).toEqual('expected "GoodDynamic" to have been performed but it was not performed. Performed dynamics were: "excellent"')
    })

    it('fails and shows the if a dynamic was performed but it was not expected', async (): Promise<void> => {
      const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__' })

      await dynamicApi.loadDynamics()

      dynamicApi.performDynamicSync('good', { call: 1 })

      let error: Error

      try {
        expect(GoodDynamic).not.toHaveBeenPerformed()
      } catch (e) {
        error = e
      }

      expect(stripAnsi(error.message)).toEqual('expected "GoodDynamic" not to have been performed, but it was')
    })
  })
})
