const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Job = require('../models/job')
const User = require('../models/user');


const getJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find({})
        res.json({ jobs: jobs.map(job => job.toObject({ getters: true })) });
    } catch (err) {
        const error = new HttpError(
            'Fetching jobs failed, please try again later.',
            500
        );
        return next(error);
    }
}



const getJobsById = async (req, res, next) => {
    let jobId = req.params.id;

    let job;
    try {
        job = await Job.findById(jobId);
        res.status(200).json({ job: job.toObject({ getters: true }) });
    } catch (err) {
        const error = new HttpError(
            'Couldnt find job, please try again.',
            500
        );
        return next(err);
    }

};

const createJob = async (req, res, next) => {

    const { title, location, salary, type, qualifications, description, creator } = req.body;

    try {
        const createdJob = new Job({
            title,
            location,
            salary,
            type,
            qualifications,
            description,
            creator
        });

        let user;
        try {
            user = await User.findById(creator);
        } catch (err) {
            console.log(err)
            const error = new HttpError(
                'Creating job failed, please try again.',
                500
            );
            return next(error);
        }

        if (!user) {
            const error = new HttpError('Could not find user for provided id.', 404);
            return next(error);
        }
        try {
            const sess = await mongoose.startSession();
            sess.startTransaction();
            await createdJob.save()
            user.job.push(createdJob);
            await user.save({ session: sess });
            await sess.commitTransaction();
        } catch (err) {
            console.log(err)
            const error = new HttpError(
                'Couldnt create job, please try again.',
                500
            );
            return next(error);
        }

        return res.json({
            status: 'ok',
        });
    } catch (err) {
        console.log(err)
    }

};



const applyToJob = async (req, res, next) => {
    const jobId = req.params.id;
    const { name, email, age, number, experience } = req.body;

    let job
    try {
        job = await Job.findById(jobId)
        let array = job.applicant;
        for (index = 0; index < array.length; index++) {
            if (array[index].name == name) {
                const error = new HttpError('You already applied.', 400);
                return next(error);
            }
        }
        job.applicant.push({
            name,
            email,
            age,
            number,
            experience
        })
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find job.',
            500
        );
        return next(error);
    }

    const title = job.title
    const location = job.location
    const salary = job.salary
    let creator
    try {
        creator = await User.findOne({ name: name });
        creator.applied.push({
            title,
            location,
            salary
        })

    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find user.',
            500
        );
        return next(err);
    }

    try {
        await job.save()
        await creator.save()
        res.json({ status: 'ok' })
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not save application.',
            500
        );
        return next(error);
    }

};


const updateJob = async (req, res, next) => {
    const post = req.body
    let name = req.body.title
    let job
    try {
        job = await Job.findOneAndUpdate(name, post)
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update job.',
            500
        );
    }

    if (job.creator.toString() !== req.userData.userId) {
        const error = new HttpError('You are not allowed to edit this place.', 401);
        return next(error);
    }
    try {
        await job.save()
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update job.',
            500
        );
    }
    return res.json({
        status: 'ok'
    })
};

const deleteJob = async (req, res, next) => {
    const name = req.body.name
    let job
    try {
        job = await Job.findOneAndDelete({ title: name })
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete job.',
            500
        );
    }

    if (job.creator.toString() !== req.userData.userId) {
        const error = new HttpError('You are not allowed to delete this job.', 401);
        return next(error);
    }

    return res.status(200).json({ message: 'Deleted place.' });
};

exports.getJobs = getJobs;
exports.getJobsById = getJobsById;
exports.applyToJob = applyToJob;
exports.createJob = createJob;
exports.updateJob = updateJob;
exports.deleteJob = deleteJob;
