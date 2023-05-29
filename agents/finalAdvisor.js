const { callAgent } = require('./genericAgent');

function formatSolutions(solutions) {
  let result = ''
  for (const file of solutions) {
    result += "File: " + file.file + '\n'
    result += file.code + '\n\n'
  }
  return result
}

const promptTemplate = 
` 
# YOUR ROLE
Based on the "File-Level Summary" section below, write an answer to send to the user.
Include:
- Your reasoning to the solution
- File paths and functions/variable names (optional)
- All necessary code snippets (optional)
You are allowed to edit the information coming from the file-level summaries to make the final answer coherent. 

# User input
## Original user input/request
{task}

# File-Level Summary
## This is an analysis of the relevant files in the project
{analysis}
` 

/**
 * Asynchronously suggests changes to a task's source code using an advanced model.
 * @param {string} task - The task to suggest changes for.
 * @param {} file - A file to apply code to.
 * @returns {Promise<string>} - A Promise that resolves with the suggested changes.
 */
async function finalAdvisor(task, payload) {
  const analysis = formatSolutions(payload.solutions)
  const values = {task, analysis}
  const reply = await callAgent(promptTemplate, values, process.env.FINALADVISOR_MODEL);
  return reply;
}

module.exports = { finalAdvisor }