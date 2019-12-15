const LikesController = require('./controllers/likes.controller');

const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.get('/events/:eventId/likes', [
        ValidationMiddleware.validJWTNeeded,
        LikesController.getByEventId
    ]);
    app.post('/events/:eventId/likes', [
        ValidationMiddleware.validJWTNeeded,
        LikesController.insert
    ]);
    app.delete('/events/:eventId/likes/:likeId', [
        ValidationMiddleware.validJWTNeeded,
        LikesController.removeById
    ]);
};