const CommentModel = require('../models/comments.model');

exports.getByEventId = (req, res) => {
    CommentModel.findByEventId(req.params.eventId)
        .then((result) => {
            res.status(200).send(result);
        });
};

// exports.list = (req, res) => {
//     let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
//     let page = 0;
//     if (req.query) {
//         if (req.query.page) {
//             req.query.page = parseInt(req.query.page);
//             page = Number.isInteger(req.query.page) ? req.query.page : 0;
//         }
//     }
//     CommentModel.list(limit, page)
//         .then((result) => {
//             res.status(200).send(result);
//         })
// };

exports.insert = (req, res) => {
    req.body.permissionLevel = 1;
    CommentModel.createComment(req.body, req.params.eventId)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

exports.removeById = (req, res) => {
    CommentModel.removeById(req.params.commentId)
        .then((result)=>{
            res.status(204).send({});
        });
};

exports.patchById = (req, res) => {
    CommentModel.patchComment(req.params.commentId, req.body)
        .then((result) => {
            res.status(204).send({});
        });
};