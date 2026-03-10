const fs = require('fs')
const parseBody = require('../utils/bodyParser')

const path = './data/accounts.json'

function readData(){
    return JSON.parse(fs.readFileSync(path))
}

function writeData(data){
    fs.writeFileSync(path, JSON.stringify(data,null,2))
}

module.exports = (app) => {

    app.get('/accounts', (req,res)=>{
        const data = readData()
        res.json(data.accounts)
    })

    app.get('/accounts/:id', (req,res)=>{
        const data = readData()
        const id = req.url.split('/')[2]

        const acc = data.accounts.find(a=>a.id===id)

        if(!acc){
            res.status(404).json({error:"Not found"})
            return
        }

        res.json(acc)
    })

    app.post('/accounts', async (req,res)=>{

        const body = await parseBody(req)

        const data = readData()

        const newAcc = {
            id: Date.now().toString(),
            ...body
        }

        data.accounts.push(newAcc)

        writeData(data)

        res.status(201).json(newAcc)

    })

}