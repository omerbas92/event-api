const CollectionsController = require('./controllers/collections.controller');

const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.get('/collections/', [
        ValidationMiddleware.validJWTNeeded,
        CollectionsController.getByEventId
    ]);
    app.post('/collections/', [
        ValidationMiddleware.validJWTNeeded,
        CollectionsController.insert
    ]);
    app.delete('/collections/:Id/', [
        ValidationMiddleware.validJWTNeeded,
        CollectionsController.removeById
    ]);
};