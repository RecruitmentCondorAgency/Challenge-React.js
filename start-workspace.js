const prompt = require('prompt-sync')()
let [workspaceName] = process.argv.slice(2)

if (!workspaceName) {
  workspaceName = prompt('Please enter the workspace name: ')
}

if (!workspaceName) {
  console.log('No workspace name provided. Exiting...')
  process.exit(1)
}

const execSync = require('child_process').execSync
console.log(`Running ${workspaceName}`)
const command = `npm run start --workspace=${workspaceName}`

execSync(command, { stdio: 'inherit' })
