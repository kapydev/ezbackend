//@ts-ignore
import { create } from '../__test-helpers__/cmd'
import path from 'path'
import fs from 'fs'
import util from 'util'

const tmpFolderPath = path.join(__dirname, "../__tmp__")


describe("Run", () => {
    it("Should be able to install ezbackend", async () => {

        // Remove the tmp folder if it exists
        const exists = await util.promisify(fs.exists)(tmpFolderPath)
        if (exists) {
            await util.promisify(fs.rmdir)(tmpFolderPath, { recursive: true })
        }

        const processPath = path.join(__dirname, "../bin/index.js")

        await create(processPath).execute(["init", "--no-install", "-f", tmpFolderPath])

        // Remove the tmp folder
        await util.promisify(fs.rmdir)(tmpFolderPath, { recursive: true })
    })

    it.todo("Should not be able to install ezbackend if the folder already exists")

    it.todo("Should test all the possible options for installation")

    //This test requires additional work
    it.skip("Should be able run ezbackend after installing", async () => {

        const indexPath = path.join(tmpFolderPath, "src/index.ts")

        require(indexPath)

    })


})