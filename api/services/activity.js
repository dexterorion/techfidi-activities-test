const models = require('../models');

module.exports = {
    findAll: callback => {
        return models.Activity.findAll().then(result => {
            return callback(null, result);
        }).catch(err => {
            return callback(new Error("Error list activity"));
        });
    },
    create: (data, callback) => {
        let activity = new models.Activity();
        activity.title = data.title;
        activity.status = data.status;
        activity.description = data.description;
        activity.save().then(result => {
            return callback(null, result);
        }).catch(err => {
            return callback(new Error("Error creating activity"));
        });
    },
    updateStatus: (data, callback) => {
        models.Activity.update({
            status: data.status
        }, {
            where: {
                id: data.id
            }
        }).then(result => {
            return callback(null, result);
        }).catch(err => {
            return callback(new Error("Error updating activity status"));
        });
    },
    getById: (data, callback) => {
        models.Activity.findOne({
            where: {
                id: data.id
            }
        }).then(result => {
            return callback(null, result);
        }).catch(err => {
            return callback(new Error("Error getting activity by id"));
        });
    }
}