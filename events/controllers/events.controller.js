const EventModel = require('../models/events.model');

exports.insert = (req, res) => {
    req.body.permissionLevel = 1;
    EventModel.createEvent(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    EventModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    EventModel.findById(req.params.eventId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getByUserId = (req, res) => {
    EventModel.findByUserId(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.patchById = (req, res) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }

    EventModel.patchEvent(req.params.eventId, req.body)
        .then((result) => {
            res.status(204).send({});
        });
};

exports.removeById = (req, res) => {
    EventModel.removeById(req.params.eventId)
        .then((result)=>{
            res.status(204).send({});
        });
};