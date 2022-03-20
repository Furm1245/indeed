const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appliedSchema = new Schema([{
    title: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String, required: true },
}]);


module.exports = mongoose.model('Applied', appliedSchema);
