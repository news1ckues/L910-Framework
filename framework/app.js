const http = require('http')
const Router = require('./router')

function createApp() {
    const router = new Router()

    const server = http.createServer((req, res) => {
        router.handle(req, res)
    })

    return {
        get: router.get.bind(router),
        post: router.post.bind(router),
        put: router.put.bind(router),
        patch: router.patch.bind(router),
        delete: router.delete.bind(router),

        listen: (port, cb) => {
            server.listen(port, cb)
        }
    }
}

module.exports = createApp