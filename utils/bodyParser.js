function parseBody(req){

    return new Promise((resolve, reject) => {

        let body = ''

        req.on('data', chunk => {
            body += chunk
        })

        req.on('end', () => {
            try{
                const data = body ? JSON.parse(body) : {}
                resolve(data)
            }catch(e){
                reject(e)
            }
        })

    })

}

module.exports = parseBody