// Import Db reference
const mongodb = require("../db/connect");
const { all } = require("../routes");
const ObjectId = require('mongodb').ObjectId;

const getCont = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('contacts').find();
    
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    })
    
}

const getSingleCont  = async (req, res, next) =>{
    console.log(req.params);
    const userId = new ObjectId(req.params.id);

    const result = await mongodb.getDb().db().collection('contacts').find({_id: userId});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    })
}

module.exports = {getCont, getSingleCont}
