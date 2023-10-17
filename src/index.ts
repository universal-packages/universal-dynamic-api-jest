import { expect } from '@jest/globals'
import { DynamicApi, DynamicClassLike } from '@universal-packages/dynamic-api'

import './globals'

beforeEach(() => {
  DynamicApi.debugLog.length = 0
})

function toHaveBeenPerformed(dynamic: DynamicClassLike): jest.CustomMatcherResult {
  const Api = dynamic.__api
  const name = dynamic.__name
  const isHook = dynamic.__lifeCycle ? true : false

  if (!name) {
    throw new Error('Expected subject to be a dynamic but is not')
  }

  if (!Api) {
    throw new Error('Expected dynamic to have been loaded properly by an API, but it was not')
  }

  if (isHook) {
    throw new Error('Subject is a hook, not a dynamic class')
  }

  const pass = DynamicApi.debugLog.some((debugLog) => debugLog.name === name)

  if (pass) {
    return {
      message: () => `expected ${this.utils.printReceived(dynamic['name'])} not to have been performed, but it was`,
      pass: true
    }
  } else {
    return {
      message: () => {
        if (DynamicApi.debugLog.length === 0) {
          return `expected ${this.utils.printReceived(dynamic['name'])} to have been performed but no dynamics were performed`
        } else {
          return `expected ${this.utils.printReceived(dynamic['name'])} to have been performed but it was not performed. Performed dynamics were: ${DynamicApi.debugLog
            .map((debugLog) => this.utils.printExpected(debugLog.name))
            .join(', ')}`
        }
      },

      pass: false
    }
  }
}

function toHaveBeenPerformedWith(dynamic: DynamicClassLike, payload: Record<string, any>): jest.CustomMatcherResult {
  const Api = dynamic.__api
  const name = dynamic.__name
  const isHook = dynamic.__lifeCycle ? true : false

  if (!name) {
    throw new Error('Expected subject to be a dynamic but is not')
  }

  if (!Api) {
    throw new Error('Expected dynamic to have been loaded properly by an API, but it was not')
  }

  if (isHook) {
    throw new Error('Subject is a hook, not a dynamic class')
  }

  const performed = DynamicApi.debugLog.filter((debugLog) => debugLog.name === name)

  const pass = performed.some((debugLog) => {
    return this.equals(debugLog.payload, payload)
  })

  if (pass) {
    return {
      message: () => `expected ${this.utils.printReceived(dynamic['name'])} not to have been performed with the given payload, but it was`,
      pass: true
    }
  } else {
    return {
      message: () => {
        if (performed.length === 0) {
          return `expected ${this.utils.printReceived(dynamic['name'])} to have been performed with the given payload but no dynamics were performed at all`
        } else {
          const toPrint = performed.map((debugLog) => this.utils.diff(payload, debugLog.payload)).join('\n\n')

          return `expected ${this.utils.printReceived(dynamic['name'])} to have been performed with the given payload but it was not\n\nPayloads were:\n${toPrint}`
        }
      },

      pass: false
    }
  }
}

function toHaveBeenHookedBefore(hook: DynamicClassLike, dynamic: DynamicClassLike): jest.CustomMatcherResult {
  const Api = hook.__api
  const name = hook.__name
  const isHook = hook.__lifeCycle ? true : false

  if (!name) {
    throw new Error('Expected subject to be a hook but is not')
  }

  if (!Api) {
    throw new Error('Expected hook to have been loaded properly by an API, but it was not')
  }

  if (!isHook) {
    throw new Error('Subject is a dynamic class, not a hook')
  }

  if (!dynamic.__name) {
    throw new Error('Expected dynamic to be a dynamic but is not')
  }

  if (!dynamic.__api) {
    throw new Error('Expected dynamic to have been loaded properly by an API, but it was not')
  }

  if (dynamic.__lifeCycle) {
    throw new Error('Dynamic is a hook, not a dynamic class')
  }

  const anyPerformed = DynamicApi.debugLog.find((debugLog) => debugLog.name === name)
  const pass = anyPerformed && anyPerformed.hooks.before.some((beforeHook) => beforeHook === hook)

  if (pass) {
    return {
      message: () => {
        return `expected ${this.utils.printReceived(hook['name'])} not to have been hooked before ${this.utils.printReceived(dynamic['name'])}, but it was`
      },
      pass: true
    }
  } else {
    return {
      message: () => {
        if (anyPerformed) {
          const performedToPrint = anyPerformed.hooks.before.map((beforeHook) => this.utils.printExpected(beforeHook['name'])).join(', ')

          return `expected ${this.utils.printReceived(hook['name'])} to have been hooked before ${this.utils.printReceived(
            dynamic['name']
          )} but it was not. Performed hooks were: ${performedToPrint}`
        } else {
          return `expected ${this.utils.printReceived(hook['name'])} to have been hooked before ${this.utils.printReceived(dynamic['name'])} but the dynamic was not performed`
        }
      },

      pass: false
    }
  }
}

function toHaveBeenHookedAfter(hook: DynamicClassLike, dynamic: DynamicClassLike): jest.CustomMatcherResult {
  const Api = hook.__api
  const name = hook.__name
  const isHook = hook.__lifeCycle ? true : false

  if (!name) {
    throw new Error('Expected subject to be a hook but is not')
  }

  if (!Api) {
    throw new Error('Expected hook to have been loaded properly by an API, but it was not')
  }

  if (!isHook) {
    throw new Error('Subject is a dynamic class, not a hook')
  }

  if (!dynamic.__name) {
    throw new Error('Expected dynamic to be a dynamic but is not')
  }

  if (!dynamic.__api) {
    throw new Error('Expected dynamic to have been loaded properly by an API, but it was not')
  }

  if (dynamic.__lifeCycle) {
    throw new Error('Dynamic is a hook, not a dynamic class')
  }

  const anyPerformed = DynamicApi.debugLog.find((debugLog) => debugLog.name === name)
  const pass = anyPerformed && anyPerformed.hooks.after.some((afterHook) => afterHook === hook)

  if (pass) {
    return {
      message: () => {
        return `expected ${this.utils.printReceived(hook['name'])} not to have been hooked after ${this.utils.printReceived(dynamic['name'])}, but it was`
      },
      pass: true
    }
  } else {
    return {
      message: () => {
        if (anyPerformed) {
          const performedToPrint = anyPerformed.hooks.after.map((afterHook) => this.utils.printExpected(afterHook['name'])).join(', ')

          return `expected ${this.utils.printReceived(hook['name'])} to have been hooked after ${this.utils.printReceived(
            dynamic['name']
          )} but it was not. Performed hooks were: ${performedToPrint}`
        } else {
          return `expected ${this.utils.printReceived(hook['name'])} to have been hooked after ${this.utils.printReceived(dynamic['name'])} but the dynamic was not performed`
        }
      },

      pass: false
    }
  }
}

expect.extend({
  toHaveBeenPerformed,
  toHaveBeenPerformedWith,
  toHaveBeenHookedBefore,
  toHaveBeenHookedAfter
})
