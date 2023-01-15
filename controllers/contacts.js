// Import Db reference
const mongodb = require("../db/connect");

const getCont = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('contacts').find();
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

module.exports = {getCont}