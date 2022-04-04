const { validationResult } = require('express-validator')

const validate = (schemas) => {
  return async (req, res, next) => {
    await Promise.all(schemas.map((schema) => schema.run(req)));

    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }

    const errors = {
      error: {
        name: 'ValidatorError',
        errors: result.array()
      }
    };
    return res.send(errors)
  };
}

module.exports = validate;
