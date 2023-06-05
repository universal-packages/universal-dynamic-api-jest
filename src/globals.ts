import { DynamicClassLike } from '@universal-packages/dynamic-api'

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveBeenPerformed(): R
      toHaveBeenPerformedWith(payload: any): R
      toHaveBeenHookedBefore(dynamic: any): R
      toHaveBeenHookedAfter(dynamic: any): R
    }
  }
}

export {}
