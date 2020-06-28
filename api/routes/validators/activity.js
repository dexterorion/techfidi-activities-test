const { body } = require('express-validator');

module.exports = {
    create: [
        body('title').isString().notEmpty(),
        body('description').isString().notEmpty(),
        body('status').isIn(['Pending', 'InProgress', 'Done'])
    ],
    updateStatus: [
        body('status').isIn(['Pending', 'InProgress', 'Done'])
    ]
}