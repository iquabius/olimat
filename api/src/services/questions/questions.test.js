/* global afterEach, beforeEach, describe, expect, test */
process.env.NODE_ENV = 'test'

const assert = require('assert')
const app = require('../../app')

const knex = app.get('knexClient')

describe('\'questions\' service', () => {
  beforeEach(done => {
    knex.migrate.rollback()
      .then(() => {
        knex.migrate.latest()
          .then(() => {
            knex.seed.run()
              .then(() => {
                done()
              })
          })
      })
  })

  afterEach(done => {
    knex.migrate.rollback()
      .then(() => {
        done()
      })
  })

  test('registered the service', () => {
    const service = app.service('questions')

    assert.ok(service, 'Registered the service')
  })

  test('find() method returns all questions', () => {
    const questions = app.service('questions')

    return questions.find().then(itemsPage => {
      // 2 questions in seed file
      expect(itemsPage.data.length).toBe(2)
      expect(itemsPage.total).toBe(2)

      // Pagination
      expect(itemsPage.skip).toBe(0)
      expect(itemsPage.limit).toBe(10)

      expect(itemsPage.data[0]).toHaveProperty('id')
      expect(itemsPage.data[0]).toHaveProperty('wording')
      expect(itemsPage.data[0]).toHaveProperty('created_at')
      expect(itemsPage.data[0]).toHaveProperty('updated_at')
    })
  })
})
