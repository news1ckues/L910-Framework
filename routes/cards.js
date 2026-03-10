const fs = require('fs')
const parseBody = require('../utils/bodyParser')

const path = './data/cards.json'

function readData(){
    return JSON.parse(fs.readFileSync(path))
}

function writeData(data){
    fs.writeFileSync(path, JSON.stringify(data, null, 2))
}

module.exports = (app) => {

    app.get('/cards', (req,res)=>{
        const data = readData()
        res.json(data.cards)
    })

    app.get('/cards/:id', (req,res)=>{
        const data = readData()
        const id = req.url.split('/')[2]

        const card = data.cards.find(c => c.id === id)

        if(!card){
            res.status(404).json({error:"Card not found"})
            return
        }

        res.json(card)
    })

    app.post('/cards', async (req,res)=>{

        const body = await parseBody(req)
        const data = readData()

        const newCard = {
            id: Date.now().toString(),
            ...body
        }

        data.cards.push(newCard)

        writeData(data)

        res.status(201).json(newCard)

    })

}