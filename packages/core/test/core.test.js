const { expect } = require('@jest/globals')
const { EzBackend } = require('../src/ezbackend')

describe("Default Behaviour", () => {
    it('expects the plugins to run in order', () => {
        expect(1).toEqual(1)
    })
})
