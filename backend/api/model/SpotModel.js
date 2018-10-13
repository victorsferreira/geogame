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

    

    //   ASIN(SQRT(SIN(((c.lat-${lat})*(PI()/180))/2)*SIN(((c.lat-${lat})*(PI()/180))/2)+COS(${lat}*(PI()/180))*COS(c.lat*(PI()/180))*SIN(((c.lng-${lng})*(PI()/180))/2)*SIN(((c.lng-${lng})*(PI()/180))/2)))*6370000.97327862273;
}

module.exports = new SpotModel();