const db = require('./connection');
const urls = db.get('urls');
const Joi = require('joi');


const schema = Joi.object().keys({
    url: Joi.string().uri({
        scheme: [
            /https?/
        ]
    }).required(),
    id: Joi.string().alphanum().min(7).max(7).required()
}).with('url', 'id');

async function create(urlObject) {
    const validationResult = Joi.validate(urlObject, schema);

    if (validationResult.error === null) {
        const url = await urls.findOne({
            id: urlObject.id
        });

        if (!url) {
            return urls.insert(urlObject)
        } else {
            return Promise.reject({
                isJoi: true,
                details: [{
                    message: 'ID is in use.'
                }]
            });
        }
    } else {
        return Promise.reject(validationResult.error);
    }

}

module.exports = {
    create
};