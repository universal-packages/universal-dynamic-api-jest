import { DynamicApi } from '@universal-packages/dynamic-api'
import stripAnsi from 'strip-ansi'

import '../src'
import ExcellentDynamic from './__fixtures__/Excellent.dynamic'
import GoodDynamic from './__fixtures__/Good.dynamic'

describe('dynamic-api-jest', (): void => {
  describe('toHaveBeenPerformedWith', (): void => {
    it('asserts a dynamic being performed with a payload', async (): Promise<void> => {
      const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__' })

      await dynamicApi.loadDynamics()

      dynamicApi.performDynamicSync('good', { call: 1, good: true })
      dynamicApi.performDynamicSync('excellent', { call: 1, excellent: true })

      dynamicApi.performDynamicSync('good', { call: 2, good: true })
      dynamicApi.performDynamicSync('excellent', { call: 2, excellent: true })

      expect(GoodDynamic).toHaveBeenPerformedWith({ call: 1, good: true })
      expect(ExcellentDynamic).toHaveBeenPerformedWith({ call: 1, excellent: true })
      expect(GoodDynamic).toHaveBeenPerformedWith({ call: 2, good: true })
      expect(ExcellentDynamic).toHaveBeenPerformedWith({ call: 2, excellent: true })
    })

    it('fails and shows if a dynamic was not performed with a payload', async (): Promise<void> => {
      const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__' })

      await dynamicApi.loadDynamics()

      let error: Error

      try {
        expect(GoodDynamic).toHaveBeenPerformedWith({ call: 1, good: true })
      } catch (e) {
        error = e
      }

      expect(stripAnsi(error.message)).toEqual('expected "GoodDynamic" to have been performed with the given payload but no dynamics were performed at all')
    })

    it('fails and shows the if a dynamic was not performed with a payload and tells which ones where', async (): Promise<void> => {
      const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__' })

      await dynamicApi.loadDynamics()

      dynamicApi.performDynamicSync('good', { call: 2, excellent: true })

      let error: Error

      try {
        expect(GoodDynamic).toHaveBeenPerformedWith({ call: 1, good: true })
      } catch (e) {
        error = e
      }

      expect(stripAnsi(error.message)).toEqual(
        'expected "GoodDynamic" to have been performed with the given payload but it was not\n\nPayloads were:\n- Expected\n+ Received\n\n  Object {\n-   "call": 1,\n-   "good": true,\n+   "call": 2,\n+   "excellent": true,\n  }'
      )
    })

    it('fails and shows the if a dynamic was performed with a payload but it was not expected', async (): Promise<void> => {
      const dynamicApi = new DynamicApi({ dynamicsLocation: './tests/__fixtures__' })

      await dynamicApi.loadDynamics()

      dynamicApi.performDynamicSync('good', { call: 1, good: true })

      let error: Error

      try {
        expect(GoodDynamic).not.toHaveBeenPerformedWith({ call: 1, good: true })
      } catch (e) {
        error = e
      }

      expect(stripAnsi(error.message)).toEqual('expected \"GoodDynamic\" not to have been performed with the given payload, but it was')
    })
  })
})
