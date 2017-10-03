/* global describe, test */
const assert = require('assert')
const app = require('../../app')

describe('\'questions\' service', () => {
  test('registered the service', () => {
    const service = app.service('questions')

    assert.ok(service, 'Registered the service')
  })
})
