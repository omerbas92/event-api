const CommentsController = require('./controllers/comments.controller');

const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.get('/events/:eventId/comments', [
        ValidationMiddleware.validJWTNeeded,
        CommentsController.getByEventId
    ]);
    app.post('/events/:eventId/comments', [
        ValidationMiddleware.validJWTNeeded,
        CommentsController.insert
    ]);
    app.patch('/events/:eventId/comments/:commentId', [
        ValidationMiddleware.validJWTNeeded,
        EventsController.patchById
    ]);
    app.delete('/events/:eventId/comments/:commentId', [
        ValidationMiddleware.validJWTNeeded,
        EventsController.removeById
    ]);
};