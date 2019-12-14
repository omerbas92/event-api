const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

const eventSchema = new Schema({
    name: String,
    description: String,
    imagePath: String,
    startDate: Date,
    endDate: Date,
    isRepating: Boolean,
    location: Array,
    keywords: Array,
    url: String,
    price: Array,
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

eventSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
eventSchema.set('toJSON', {
    virtuals: true
});

eventSchema.findById = function (cb) {
    return this.model('Events').find({id: this.id}, cb);
};

eventSchema.findByUserId = function (cb) {
    return this.model('Events').find({userId: this.id}, cb);
};

const Event = mongoose.model('Events', eventSchema);

exports.findById = (id) => {
    return Event.findById(id)
    .then((result) => {
        return result;
    });
};

exports.findByUserId = (id) => {
    return Event.find({userId: id})
    .then((result) => {
        return result;
    });
};

exports.findByName = (name) => {
    return Event.find({name: name});
};

exports.createEvent = (eventData) => {
    const event = new Event(eventData);
    return event.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Event.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, events) {
                if (err) {
                    reject(err);
                } else {
                    resolve(events);
                }
            })
    });
};

exports.patchEvent = (id, eventData) => {
    return new Promise((resolve, reject) => {
        Event.findById(id, function (err, event) {
            if (err) reject(err);
            for (let i in eventData) {
                event[i] = eventData[i];
            }
            event.save(function (err, updatedEvent) {
                if (err) return reject(err);
                resolve(updatedEvent);
            });
        });
    })
};

exports.removeById = (eventId) => {
    return new Promise((resolve, reject) => {
        Event.remove({_id: eventId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

