const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String, required: true },
    type: { type: String, required: true },
    qualifications: { type: String, required: true },
    description: { type: String, required: true },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    applicant: [{ type: Object, ref: 'applicant' }]
});

module.exports = mongoose.model('Job', jobSchema);
