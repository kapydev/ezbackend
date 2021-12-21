import { ezWarning } from '../src'
import stripAnsi from 'strip-ansi'

describe("EzWarning tests", () => {
    test("ezWarning should work with an external logger", async () => {

        const logger = {
            log: function (msg: string) {
                const noAnsiMsg = stripAnsi(msg)
                expect(noAnsiMsg).toMatch(`⚠️ This warning should work`)
            }
        }

        ezWarning("This warning should work", logger)
    })

    test("ezWarning should work by itself", async() => {
        ezWarning("This warning should work")
    })
})
