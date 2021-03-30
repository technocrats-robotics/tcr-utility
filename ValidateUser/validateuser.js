const express = require('express')


// TOKEN
const { TOKEN } = require('../constants')

const verifyToken = (req,res,next)=>{

    if(!req.headers['authorization']) return next(new Error('User token not found'))

    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]
    if(token==TOKEN) next()
    else 
        return next(new Error('Unauthorized User.'))
    
}

module.exports = verifyToken