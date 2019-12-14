const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

const likeSchema = new Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    createUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createDate: {
        type: Date,
        default: Date.now
    }
});

likeSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
likeSchema.set('toJSON', {
    virtuals: true
});

const Like = mongoose.model('Likes', likeSchema);

exports.findByEventId = (id) => {
    return Like.find({eventId: id})
    .then((result) => {
        return result;
    });
};

exports.like = (likeData, eventId) => {
    const comment = new Like(likeData);
    like.eventId = eventId;
    return like.save();
};

exports.removeById = (likeId) => {
    return new Promise((resolve, reject) => {
        Like.remove({_id: likeId}, (err) => {
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
