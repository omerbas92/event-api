const EventsController = require('./controllers/events.controller');
const CommentsController = require('../comments/controllers/comments.controller');

const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post('/events', [
        EventsController.insert
    ]);
    app.get('/events', [
        ValidationMiddleware.validJWTNeeded,
        EventsController.list
    ]);
    app.get('/events/:eventId', [
        ValidationMiddleware.validJWTNeeded,
        EventsController.getById
    ]);
    app.get('/events/user/:userId', [
        ValidationMiddleware.validJWTNeeded,
        EventsController.getByUserId
    ]);
    app.patch('/events/:eventId', [
        ValidationMiddleware.validJWTNeeded,
        EventsController.patchById
    ]);
    app.delete('/events/:eventId', [
        ValidationMiddleware.validJWTNeeded,
        EventsController.removeById
    ]);
};