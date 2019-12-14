const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

const commentSchema = new Schema({
    comment: String,
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    createUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createDate: {
        type: Date,
        default: Date.now
    },
    modifyUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    modifyDate: {
        type: Date,
        default: Date.now
    },
});

commentSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
commentSchema.set('toJSON', {
    virtuals: true
});

const Comment = mongoose.model('Comments', commentSchema);

exports.findByEventId = (id) => {
    return Comment.find({eventId: id})
    .then((result) => {
        return result;
    });
};

exports.createComment = (commentData, eventId) => {
    const comment = new Comment(commentData);
    comment.eventId = eventId;
    return comment.save();
};

exports.patchComment = (id, commentData) => {
    return new Promise((resolve, reject) => {
        Comment.findById(id, function (err, comment) {
            if (err) reject(err);
            for (let i in commentData) {
                comment[i] = commentData[i];
            }
            comment.save(function (err, updatedComment) {
                if (err) return reject(err);
                resolve(updatedComment);
            });
        });
    })
};

exports.removeById = (commentId) => {
    return new Promise((resolve, reject) => {
        Comment.remove({_id: commentId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};


// exports.list = (perPage, page) => {
//     return new Promise((resolve, reject) => {
//         Comment.find()
//             .limit(perPage)
//             .skip(perPage * page)
//             .exec(function (err, comments) {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(comments);
//                 }
//             })
//     });
// };
