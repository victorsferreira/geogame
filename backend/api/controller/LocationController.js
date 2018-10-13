const BaseController = require('../../libs/core/BaseController');
const { mysql } = __LIBS;

class LocationController extends BaseController {
    constructor() {
        super();

        BaseController.build(this, {
            service: ['AccountService', 'UserService'],
            model: ['SpotModel']
        });
    }

    findPointsAroundCoordinate({ lat: latitude, lng: longitude }) {
        const sql = `SELECT * FROM point p WHERE p.id IN (
            SELECT c.point_id FROM coordinate c WHERE c.radius >= (
                ASIN(
                    SQRT(
                        SIN(
                            ((c.lat- ${latitude})*(PI()/180))/2
                        ) * 
                        SIN(
                            ((c.lat- ${latitude})*(PI()/180))/2
                        ) + 
                        COS(
                            ${latitude} *(PI()/180)
                        ) * 
                        COS(
                            c.lat*(PI()/180)
                        ) * 
                        SIN(
                            ((c.lng- ${longitude})*(PI()/180))/2
                        ) * 
                        SIN(
                            ((c.lng- ${longitude})*(PI()/180))/2
                        )
                    )
                )*6370000.97327862273
            )
        )`;

        return mysql.query(sql);
    }

    unlock(req, res, next) {
        const { location } = req.body;

        this.findPointsAroundCoordinate(location)
            .then((result) => {
                res.status(200).json(result);
            });
    }
}

module.exports = LocationController;