function enhanceRes(res){

    res.send = function(data){
        res.end(data)
    }

    res.json = function(data){
        res.setHeader('Content-Type','application/json')
        res.end(JSON.stringify(data))
    }

    res.status = function(code){
        res.statusCode = code
        return res
    }

}

module.exports = enhanceRes