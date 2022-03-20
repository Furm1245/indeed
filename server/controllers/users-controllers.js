const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');




const getUsers = async (req, res, next) => {
    const userId = req.params.id;

    let users;
    try {
        users = await User.findById(userId, '-password');
        res.json({ users: users.toObject({ getters: true }) });
    } catch (err) {
        const error = new HttpError(
            'Fetching users failed, please try again later.',
            500
        );
        return next(error);
    }
};



const register = async (req, res, next) => {
    try {

        const { name, email, age, number, experience } = req.body;

        const newPassword = await bcrypt.hash(req.body.password, 10)
        const createdUser = new User({
            name,
            password: newPassword,
            email,
            age,
            number,
            experience
        })

        let existingUser;
        try {
            existingUser = await User.findOne({ name: createdUser.name });
        } catch (err) {
            const error = new HttpError(
                'Signing up failed, please try again later.',
                500
            );
            return next(error);
        }
        if (existingUser) {
            const error = new HttpError(
                'User exists already, please login instead.',
                422
            );
            return next(error);
        }

        let token;
        try {
            await createdUser.save()
            token = jwt.sign(
                { userId: createdUser.id, name: createdUser.name },
                process.env.JWT_KEY,
                { expiresIn: '1h' }
            );
        } catch (err) {
            console.log(err);
        }

        res.json({ userId: createdUser.id, name: createdUser.name, token: token, status: 'ok' })
    }
    catch (err) {
        res.json({ status: 'error', error: 'Something went wrong' })
    }
}

const login = async (req, res, next) => {
    let existingUser
    try {
        existingUser = await User.findOne({
            email: req.body.email,
        })

        if (!existingUser) {
            const error = new HttpError(
                'Invalid credentials, could not log you in.',
                403
            );
            return next(error);
        }
    } catch (err) {
        const error = new HttpError(
            'Logging in failed, please try again later.',
            500
        );
        return next(error);
    }


    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        existingUser.password
    )

    if (isPasswordValid) {
        let token;
        try {
            token = jwt.sign(
                { userId: existingUser.id, name: existingUser.name },
                process.env.JWT_KEY,
                { expiresIn: '1h' }
            );
        } catch (err) {
        }
        return res.json({
            userId: existingUser.id,
            name: existingUser.name,
            token: token
        });
    } else {
        return res.json({ status: 'error', existingUser: false })
    }
}

exports.getUsers = getUsers;
exports.register = register;
exports.login = login;
