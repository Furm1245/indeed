const express = require('express');

const jobsControllers = require('../controllers/jobs-controllers');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();



router.get('/jobs', jobsControllers.getJobs);

router.get('/job/:id', jobsControllers.getJobsById);

router.post('/job', jobsControllers.createJob);

router.post('/job/:id/apply', jobsControllers.applyToJob);

router.use(checkAuth);

router.put('/job/update', jobsControllers.updateJob);

router.delete('/delete', jobsControllers.deleteJob);

module.exports = router;
