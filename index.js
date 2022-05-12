// #   ufw.disable()        # disable firewall
// #   ufw.enable()         # enable firewall
// #   ufw.allow()          # default allow -- allow all
// #   ufw.allow(22)        # allow port 22, any protocol
// #   ufw.allow(22,'tcp')  # allow port 22, tcp protocol
// #   ufw.allow('22,'tcp')  # allow port 22, tcp protocol
// #   ufw.allow(53,'udp')  # allow port 53, udp protocol
// #   ufw.allow(53,'udp')  # allow port 53, udp protocol
// #   ufw.deny()           # default deny -- deny all
// #   ufw.deny(22,'tcp')   # deny port 22, tcp protocol
// #   ufw.delete(22)       # delete rules referencing port 22 !!!!!!!!!!!!!!!!!!!!!!
// #   ufw.reset()          # restore defaults
// #   ufw.status()         # return status string
// #   ufw.run("allow 22")  # directly run command as if from command line



const express= require('express')
const app = express()

const config = require('./config.json')

const ufw = require("./ufw");

const bodyparser = require('body-parser')
app.use(bodyparser.text())

app.get('/api/run/:command',(req,res)=>{ 
    var out = ufw.run(req.params.command)
    res.json({ output: `${out}` })
 })

 app.get('/api/add-domain/:website/:listen/:backend/:cache/:security/:ssl-prikey/:ssl-crtkey',(req,res)=>{ 
    var out = ufw.adddomain(req.params.website, req.params.listen, req.params.backend, req.params.cache, req.params.security, req.params.ssl-prikey, req.params.ssl-crtkey)
    res.json({ output: `${out}` })
 })

app.get('/api/enable', (req,res)=>{
    var out = ufw.enable()
    res.json({ output: `${out}`})
})

app.get('/api/allow', (req,res)=>{
    var out = ufw.allow()
    res.json({ output: `${out}`})
})

app.get('/api/allow/:port', (req,res)=>{
    var out = ufw.allow(req.params.port)
    res.json({ output: `${out}`})
})

app.get('/api/allow/:port/:protocol', (req,res)=>{
    var out = ufw.allow(req.params.port, req.params.protocol)
    res.json({ output: `${out}`})
})

app.get('/api/deny', (req,res)=>{
    var out = ufw.deny()
    res.json({ output: `${out}`})
})

app.get('/api/deny/:port', (req,res)=>{
    var out = ufw.deny(req.params.port)
    res.json({ output: `${out}`})
})

app.get('/api/deny/:port/:protocol', (req,res)=>{
    var out = ufw.deny(req.params.port, req.params.protocol)
    res.json({ output: `${out}`})
})

app.get('/api/reset', (req,res)=>{
    var out = ufw.reset()
    res.json({ output: `${out}`})
})

app.get('/api/status', (req,res)=>{
    var out = ufw.status()
    res.json({ output: `${out}`})
})

app.get('/api/deny_ip/:ip', (req,res)=>{
    var out = ufw.deny_ip(req.params.ip)
    res.json({ output: `${out}`})
})

app.get('/api/deny_ip/ip:/:port', (req,res)=>{
    var out = ufw.deny_ip(req.params.ip, req.params.port)
    res.json({ output: `${out}`})
})

app.get('/api/deny_ip/ip:/:port/:protocol', (req,res)=>{
    var out = ufw.deny_ip(req.params.ip, req.params.port, req.params.protocol)
    res.json({ output: `${out}`})
})

app.get('/api/show_rules', (req,res)=>{
    var out = ufw.show_rules()
    res.send(`${out}`)
})


app.get('/api/remove/:port', (req,res)=>{
    var out = ufw.remove(req.params.port)
    res.send(`${out}`)
})


app.listen(config.port)