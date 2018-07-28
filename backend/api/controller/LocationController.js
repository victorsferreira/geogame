const BaseController = require('../../libs/core/BaseController');
const { redis, Session } = __LIBS;

class LocationController extends BaseController {
    constructor() {
        super();

        BaseController.build(this, {
            service: ['AccountService', 'UserService'],
            model: ['AccountModel']
        });
    }

    ping(req, res, next){
        const { location } = req.body;
        console.log(location)
        this.logger.debug(`Received a ping`, location);
        res.status(200).json('Pong!');
    }
}

module.exports = LocationController;