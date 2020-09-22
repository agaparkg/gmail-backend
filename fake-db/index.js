var primary = require('./primary');
var social = require('./social');
var promotions = require('./promotions');

var allInbox = [...primary, ...social, ...promotions];

module.exports = { primary, social, promotions, allInbox };
