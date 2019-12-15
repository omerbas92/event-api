const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

const eventSchema = new Schema({
    name: String,
    description: String,
    imagePath: String,
    startDate: Date,
    endDate: Date,
    isRepating: Boolean,
    location: [{
        longitute: Number,
        latitude: Number
    }],
    keywords: [String],
    url: String,
    price: {
        type: Number
    },
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

exports.search = (perPage, page, query) => {
    var queryBuilder = BuildQueryForSearch(query);

    return new Promise((resolve, reject) => {
        Event.find(queryBuilder)
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

function BuildQueryForSearch(query){
     // - Name
    // - Tag
    // - Location
    // - Date
    // - Price
    var queryBuilder = {};

    if(query.name){ 
        queryBuilder["name"] = {$regex : new RegExp(query.name, "i")};
    }

    if(query.keyword){
        queryBuilder["keywords"] = {$regex : new RegExp(query.keyword, "i")};
    }

    // if(query.location != ""){
    //     queryBuilder["location"] = {$regex : new RegExp(query.location, "i")};
    // }

    var dateQuery;

    if(query.startDate && query.endDate){
        dateQuery = {$gte : new Date(query.startDate), $lt : new Date(query.endDate)};
    } else {
        if(query.startDate){
            dateQuery = {$gte : new Date(query.startDate)};
        }
    
        if(query.endDate){
           dateQuery = {$lt : new Date(query.endDate)};
        }
    }

    if(dateQuery){
        queryBuilder["startDate"] = dateQuery;
    }

    // if(query.price != ""){
    //     queryBuilder["name"] = {$regex : new RegExp(query.name, "i")};
    // }

    return queryBuilder;
}

