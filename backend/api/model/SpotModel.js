const BaseModel = require('../../libs/core/BaseModel');
const Joi = BaseModel.Joi;

const schema = Joi.object({
    coodinates: Joi.array().default([]).required().meta({ default: [] }),
    name: Joi.string().required(),
    description: Joi.string(),
    info: Joi.object().default({}).meta({ default: {} })
});

class SpotModel extends BaseModel {
    constructor() {
        super();
        this.setModel('Spot', schema);
    }
}

module.exports = new SpotModel();