declare global {
  namespace dynamicApiJest {
    function mockDynamicReturnValue(dynamic: any, value?: any): void
  }
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
