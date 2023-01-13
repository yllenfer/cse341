// Import Db reference
const mongodb = require("../db/connect");

const getPro = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('test').find();
    // res.send('OK')
    // console.log(result);
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    })
    // console.log(result);
    // result.toArray().then((lists) => {
        // res.SetHeader('Content-Type', 'application/json');
        // res.status(200).json(lists)
    // })
}

module.exports = {getPro}