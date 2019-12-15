const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

const collectionSchema = new Schema({
    eventId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    location: [{
        longitute: Number,
        latitude: Number
    }],
    createUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createDate: {
        type: Date,
        default: Date.now
    }
});

collectionSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

collectionSchema.set('toJSON', {
    virtuals: true
});

const Collection = mongoose.model('Collections', collectionSchema);

exports.findByEventId = (id) => {
    return Collection.findById(id)
    .then((result) => {
        return result;
    });
};

exports.insert = (collectionData) => {
    const collection = new Collection(collectionData);
    return collection.save();
};

exports.removeById = (collectionId) => {
    return new Promise((resolve, reject) => {
        Collection.remove({_id: collectionId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};
