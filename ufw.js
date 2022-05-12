// directly run command as if from command line
function run(actionstr) {
    const execSync = require('child_process').execSync;
    // import { execSync } from 'child_process';  // replace ^ if using ES modules

    const output = execSync(`sudo echo ${actionstr}`, { encoding: 'utf-8' });  // the default is 'buffer'
    return output
}
/// (req.params.website, req.params.listen, req.params.backend, req.params.cache, req.params.security, req.params.ssl-prikey, req.params.ssl-crtkey)
// add a domain to the proxy
function adddomain() {
    return run(`${website}/http:\/\/${listen}/http:\/\/${backend}/${cache}/${security}/${ssl-prikey}/${ssl-crtkey} >>/vddos/conf.d/website.conf`)
}

// enable firewall
function enable() {
    return run('--force enable')
}

// default allow -- allow all
function allow() {
    return run('default allow outgoing')
}  

// allow port, any protocol
function allow(port) {
    return run(`allow ${port}`)
} 

// allow port, tcp or udp protocol
function allow(port, protocol) {
    return run(`allow ${port}/${protocol}`)
}

//default deny -- deny all
function deny() {
    return run('default deny incoming')
}

// deny port, any protocol
function deny(port) {
    return run(`deny ${port}`)
} 

// deny port, tcp or udp protocol
function deny(port, protocol) {
    return run(`deny ${port}/${protocol}`)
}


function show_rules() {
   return run(`status`).replaceAll('\n', '<br>').replaceAll('\r', '')
}

// delete rules referencing port
function remove(rule) {
    return run(`delete ${rule}`)
}

// restore defaults
function reset() {
    return run('--force reset')
}

// return status string
function status() {
    return run('status verbose')
} 

// deny specific ip
function deny_ip(ip) {
    return run(`deny from ${ip}`)
}

// deny specific ip and port
function deny_ip(ip, port) {
    return run(`deny from ${ip} to any ${port}`)
}

// deny specific ip and port, protocol
function deny_ip(ip, port, protocol) {
    return run(`deny from ${ip} to ${protocol} ${port}`)
}


module.exports = { run, adddomain, enable, allow, deny, remove, reset, status, deny_ip, show_rules };