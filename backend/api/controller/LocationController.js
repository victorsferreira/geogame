const BaseController = require('../../libs/core/BaseController');
const { redis, Session } = __LIBS;

class LocationController extends BaseController {
    constructor() {
        super();

        BaseController.build(this, {
            service: ['AccountService', 'UserService'],
            model: ['SpotModel']
        });
    }

    ping(req, res, next) {
        const { location } = req.body;

        this.spotModel.db.find({
            $expr: {
                $gte: ["$coordinate.radius", Math.acos(Math.sin("$coordinate.lat") * Math.sin(location.lat) + Math.cos("$coordinate.lat") * Math.cos(location.lat) * Math.cos("$coordinate.lng" - location.lng)) * 6371]
            }
        })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                res.status(500).json(err.message);
            });
    }
}

module.exports = LocationController;