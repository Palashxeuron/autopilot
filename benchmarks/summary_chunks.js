const { main: doTask } = require('../ui')
const fs = require('fs');
const path = require('path');
const LineDiff = require("line-diff")
const { review } = require('../agents/reviewer')

let score = 0
const loops = 1
const task = "In some situations, summaries can have too many tokens to be processed in 1 go. Fix that by loop the summaries and split them by the max amount of 3000 tokens"
const criteria = [
    "none"
]

async function main(){
    for (let i = 0; i < loops; i++) {
        try {
            console.log(`Loop ${i + 1}`);
            const oldFile = fs.readFileSync(path.posix.join(__dirname, 'files', 'ui.js'), 'utf-8')
            const solution = await doTask(task, test = true)
            const newFile = solution[0].code
            const diff = new LineDiff(oldFile,newFile).toString()
            console.log(diff)
            const reviewRes = await review(task, diff, criteria)
            console.dir(reviewRes, { depth: null })
            score += Number(reviewRes.output.evaluation.rating)
        } catch (error){
            console.log(error)
            score += 0
        }
    }
    console.log('Final Score:', score/loops)
}

main()