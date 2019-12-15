const CollectionModel = require('../models/collections.model');

exports.getCollections = (req, res) => {
    CollectionModel.getCollections()
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.insert = (req, res) => {
    req.body.permissionLevel = 1;
    CollectionModel.insert(req.body)
    .then((result) => {
        res.status(201).send({id: result._id});
    });
};

exports.removeById = (req, res) => {
    CollectionModel.removeById(req.params.Id)
        .then((result)=>{
            res.status(204).send({});
        });
};