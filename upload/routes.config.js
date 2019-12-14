const multer = require('multer');

var uploads = multer({dest: './uploads'});

exports.routesConfig = function (app) {
    app.post('/uploadImage', uploads.single('image'), (req, res, next) => {
        const file = req.file
        if (!file) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            return next(error)
        }
        res.send(file)
    })
};