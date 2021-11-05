//@ts-ignore
import {create} from '../__test-helpers__/cmd'
import path from 'path'
import fs from 'fs'

const tmpFolderPath = path.join(__dirname, "tmp")


describe("Run", () => {
    it("Should be able to install ezbackend", async ()=> {

        //Remove the tmp folder if it exists
        if (fs.existsSync(tmpFolderPath)) {
            fs.rmdirSync(tmpFolderPath,{recursive:true})
        }

        const processPath = path.join(__dirname, "../bin/index.js")

        await create(processPath).execute(["init","--no-install","-f", tmpFolderPath])
    })

    it.todo("Should not be able to install ezbackend if the folder already exists")

    it.todo("Should test all the possible options for installation")

    //This test requires additional work
    it.skip("Should be able run ezbackend after installing", async() => {

        const indexPath = path.join(tmpFolderPath,"src/index.ts")

        require(indexPath)

    })

    
})