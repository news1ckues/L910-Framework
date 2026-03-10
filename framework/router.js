class Router {

    constructor() {
        this.routes = []
    }

    register(method, path, handler) {
        this.routes.push({method, path, handler})
    }

    get(path, handler) {
        this.register('GET', path, handler)
    }

    post(path, handler) {
        this.register('POST', path, handler)
    }

    put(path, handler) {
        this.register('PUT', path, handler)
    }

    patch(path, handler) {
        this.register('PATCH', path, handler)
    }

    delete(path, handler) {
        this.register('DELETE', path, handler)
    }

    handle(req, res) {

        const {method, url} = req

        const route = this.routes.find(r =>
            r.method === method && url.startsWith(r.path)
        )

        if(route){
            route.handler(req, res)
        }else{
            res.writeHead(404)
            res.end("Route not found")
        }
    }
}

module.exports = Router