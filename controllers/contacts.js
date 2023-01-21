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

//Creating POST that creates new contact that returns the new ID of contact
const createCont = async (req, res, next) =>{
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
      };
      const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
      if (response.acknowledged) {
        res.status(201).json(response);
      } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
      }
   
}

//Create a PUT route to update a contact. This route should allow for a url similar to 
//this: api-url-path/contacts/id-to-modify. (The id won't be modified, it will just be the
// means of finding a specific document in the database.) Return an http status code representing
// the successful completion of the request.

const updateCont = async (req, res, next) =>{
    const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
}

//Create a DELETE route to delete a contact. Return an http status code representing the 
//successful completion of the request.

const deleteCont = async (req, res, next) =>{
    const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('contacts').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
}

module.exports = {getCont, getSingleCont, createCont, updateCont, deleteCont}
