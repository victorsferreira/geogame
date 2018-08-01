const Joi = require('joi');
const Mongoose = require('mongoose');
const Joigoose = require('joigoose')(Mongoose, null, { _id: true, timestamps: false });

const MongooseSchema = Mongoose.Schema;

const Base = require('./Base');

class BaseModel extends Base {
    constructor(moduleName) {
        super(moduleName);

        this.schema = null;
        this.db = null;
    }

    setModel(modelName, schema) {
        this.schema = schema;
        this.db = Mongoose.model(modelName, new MongooseSchema(Joigoose.convert(schema)));
    }

    updateField(criteria, field, value) {
        if (typeof (criteria) !== 'object') criteria = { _id: criteria };
        const data = {};
        data[field] = value;

        return this.db.update(criteria, { $set: data });
    }

    updateFields(criteria, data) {
        if (typeof (criteria) !== 'object') criteria = { _id: criteria };
        return this.db.update(criteria, { $set: data });
    }

    push(id, key, value) {
        if (!Array.isArray(value)) value = [value];

        const pushValue = {};
        pushValue[key] = value;

        return this.db.update({ _id: id }, { $push: pushValue });
    }

    pull(id, key, value) {
        if (!Array.isArray(value)) value = [value];

        const pullValue = {};
        pullValue[key] = { $in: value };

        return this.db.update({ _id: id }, { $pull: pullValue }, { multi: true });
    }

    contains(key, value) {
        if (!Array.isArray(value)) value = [value];

        const contains = {};
        contains[key] = { $in: value };

        return this.db.find(contains);
    }

    create(data) {
        return this.db.create(data);
    }

    edit(id, data, options) {
        if(!options) options = { new: true };
        return this.db.findOneAndUpdate({ _id: id }, { $set: data }, options);
    }

    permanentDelete(id) {
        return this.db.deleteOne({ _id: id });
    }

    softDelete(id) {
        return this.db.update({ _id: id }, { $set: { deleted: true } });
    }

    existsBy(field, value) {
        const criteria = {};
        criteria[field] = value;

        return this.db.findOne(criteria)
            .then((result) => {
                return !!result;
            });
    }

    findIn(ids, from = 0, amount = 10) {
        return this.db.find({ _id: { $in: ids } }).skip(from).limit(amount);
    }

    findById(id) {
        return this.db.findOne({_id: id});
    }

    find(criteria = {}, from = 0, amount = 10) {
        return this.db.find(criteria).skip(from).limit(amount);
    }

    findActive(criteria, from = 0, amount = 10) {
        return this.find({ ...criteria, deleted: false }, from, amount);
    }
}

BaseModel.Joi = Joi;
BaseModel.ObjectId = MongooseSchema.Types.ObjectId

module.exports = BaseModel;