var _                = require('lodash'),
    Promise          = require('bluebird'),
    request          = require('request'),
    config           = require('../../../config'),
    errors           = require('../errors'),
    signup;

console.log(config);
var mcapi = require('mailchimp-api');
var mc = new mcapi.Mailchimp(config.production.mailchimp.apikey);

/**
 * ## Signup API Methods
 */
signup = {
    create: function(object) {
        var firstName = object.name.split(' ').slice(0, -1).join(' ');
        var lastName = object.name.split(' ').slice(-1).join(' ');

        mc.lists.subscribe({
            id: config.production.mailchimp.listId,
            email: {email: object.email},
            merge_vars: {
                EMAIL: object.email,
                FNAME: firstName,
                LNAME: lastName,
                FULLNAME: object.name
            }
        },
        function(data){
            console.log('Success!', data);
        },
        function(err){
            if (err) {
                return console.error(err);
            }
        });
        return Promise.resolve({});
    }
};

module.exports = signup;
