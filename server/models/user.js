const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    number: { type: Number, required: true },
    age: { type: Number, required: true },
    experience: { type: String, required: true },
    job: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Job' }],
    applied: [{ type: Object, ref: 'Applied' }]
});


module.exports = mongoose.model('User', userSchema);
