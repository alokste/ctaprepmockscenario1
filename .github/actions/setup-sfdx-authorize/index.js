const core = require('./core')
const exec = require('child_process').exec
const fs = require('fs')

try {
  createAuthFile()
} catch (error) {
  core.setFailed(error.message)
}

function createAuthFile(){
  fs.writeFileSync('/tmp/sfdx_auth.txt', core.getInput('sfdx-auth-url'))
  authSFDX()
}

function authSFDX(){
  var params = '--setdefaultdevhubusername --setdefaultusername -a SFDX-ENV'
  exec('sfdx auth:sfdxurl:store -f /tmp/sfdx_auth.txt '+params, function(error, stdout, stderr){
    if(error) throw(stderr)
	core.debug(stdout)
  })
}

