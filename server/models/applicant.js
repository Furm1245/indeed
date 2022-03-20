const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const applicantSchema = new Schema([{
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: Number, required: true },
    age: { type: Number, required: true },
    experience: { type: String, required: true },
    job: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Job' }],
}]);


module.exports = mongoose.model('Applicant', applicantSchema);
