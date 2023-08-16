const prompt = require('prompt-sync')()

const workspaceName = prompt('Please enter the workspace name: ')

if (workspaceName) {
	const execSync = require('child_process').execSync
	const command = `npm run start --workspace=${workspaceName}`

	execSync(command, { stdio: 'inherit' })
} else {
	console.log('No workspace name provided. Exiting...')
	process.exit(1)
}
