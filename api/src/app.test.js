/* global describe, test */

const assert = require('assert')
const rp = require('request-promise')

describe('Feathers application tests', () => {
  test('starts and shows the index page', () => {
    return rp('http://api:3030').then(body =>
      assert.ok(body.indexOf('<html>') !== -1)
    )
  })

  describe('404', function () {
    test('shows a 404 HTML page', () => {
      return rp({
        url: 'http://api:3030/path/to/nowhere',
        headers: {
          'Accept': 'text/html'
        }
      }).catch(res => {
        assert.equal(res.statusCode, 404)
        assert.ok(res.error.indexOf('<html>') !== -1)
      })
    })

    test('shows a 404 JSON error without stack trace', () => {
      return rp({
        url: 'http://api:3030/path/to/nowhere',
        json: true
      }).catch(res => {
        assert.equal(res.statusCode, 404)
        assert.equal(res.error.code, 404)
        assert.equal(res.error.message, 'Page not found')
        assert.equal(res.error.name, 'NotFound')
      })
    })
  })
})
