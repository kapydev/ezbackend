'use strict';

const cliWrapper = require('..');

describe('cli-wrapper', () => {
    it('Should not crash',()=> {
        test("does not crash", () => {
            expect(1).toBe(1)
        })
    });
});
