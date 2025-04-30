// middleware for schema validation
const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        images : Joi.array().items(Joi.string()).max(3),
        categories : Joi.array().items(Joi.string()),
        price : Joi.number().min(0).required(),
        location : Joi.string().required(),
        country : Joi.string().required(),
    }).required(),
});

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().min(1).max(5).required(),
        comment : Joi.string().required(),
    }).required(),
});