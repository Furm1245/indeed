const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const HttpError = require('./models/http-error');
const usersRoutes = require('./routes/users-routes');
const jobsRoutes = require('./routes/jobs-routes');

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hmh3b.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.get('/', (req, res) => {

    res.status(200).json({
        status: 'success',
    });

});

app.use('/', usersRoutes);
app.use('/', jobsRoutes);

app.use(() => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.listen(process.env.PORT || 1337, () => {
    console.log('running')
})