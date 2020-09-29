const jwt = require('jsonwebtoken')
const User = require('../model/User')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '') 
        const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET)
        const user = await User.findOne({_id:decoded._id, 'tokens.token': token})
      
        if (!user) {
            return res.status(401).send({error:'Please authenticate well'})
        }
        req.token = token; 
        req.user = user;
        next()
    } catch (error) {
        res.static(500).send()
    }

}
module.exports = auth