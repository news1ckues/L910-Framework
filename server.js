const createApp = require('./framework/app')

const app = createApp()

require('./routes/accounts')(app)
require('./routes/cards')(app)

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})