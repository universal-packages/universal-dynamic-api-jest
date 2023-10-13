# Dynamic Api Jest

[![npm version](https://badge.fury.io/js/@universal-packages%2Fdynamic-api-jest.svg)](https://www.npmjs.com/package/@universal-packages/dynamic-api-jest)
[![Testing](https://github.com/universal-packages/universal-dynamic-api-jest/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-dynamic-api-jest/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-dynamic-api-jest/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-dynamic-api-jest)

Jest matchers for [Dynamic Api](https://github.com/universal-packages/universal-dynamic-api) testing.

## Install

```shell
npm install @universal-packages/dynamic-api-jest

npm install @universal-packages/dynamic-api
```

## Setup

Add the following to your `jest.config.js` or where you configure Jest:

```js
module.exports = {
  setupFilesAfterEnv: ['@universal-packages/dynamic-api-jest']
}
```

## Matchers

### toHaveBeenPerformed

```js
import { MyDynamic } from './MyDynamic'

it('should have performed MyDynamic', async () => {
  await dynamicApi.perform('my-dynamic')

  expect(MyDynamic).toHaveBeenPerformed()
})
```

### toHaveBeenPerformedWith

```js
import { MyDynamic } from './MyDynamic'

it('should have performed MyDynamic with payload', async () => {
  await dynamicApi.perform('my-dynamic', { foo: 'bar' })

  expect(MyDynamic).toHaveBeenPerformedWith({ foo: 'bar' })
})
```

### toHaveBeenHookedBefore

```js
import { MyDynamic } from './MyDynamic'
import { MyHook } from './MyHook'

it('should have hooked MyHook before MyDynamic', async () => {
  await dynamicApi.perform('my-dynamic')

  expect(MyHook).toHaveBeenHookedBefore(MyDynamic)
})
```

### toHaveBeenHookedAfter

```js
import { MyDynamic } from './MyDynamic'
import { MyHook } from './MyHook'

it('should have hooked MyHook after MyDynamic', async () => {
  await dynamicApi.perform('my-dynamic')

  expect(MyHook).toHaveBeenHookedAfter(MyDynamic)
})
```

## Typescript

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
