var _                = require('lodash'),
    Promise          = require('bluebird'),
    signup;

/**
 * ## Signup API Methods
 */
signup = {
    create: function(object) {
        console.log(arguments);
        return Promise.resolve({test:'test'});
    }
};

module.exports = signup;
