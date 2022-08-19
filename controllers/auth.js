const jwt = require('jsonwebtoken');
const config = require('../config/dev');
const joi = require('joi');
const database = require('./database');
const bcrypt = require('bcrypt');
const utility = require("../shared/utilityFunctions");

module.exports = {
    login: async function (req, res, next) {
        const schema = joi.object({
            email: joi.string().required().min(6).max(255).email(),
            password: joi.string().required().min(6),
        });

        const {
            error,
            value
        } = schema.validate(req.body);

        if (error) {
            console.log(error.details[0].message);
            res.status(401).send('Unauthorized');
            return;
        }

        const sql = 'SELECT * FROM users WHERE email=?;';

        try {
            const result = await database.query(sql, [value.email]);
            const user = result[0][0];
            const validPassword = await bcrypt.compare(value.password, user.password);
            if (!validPassword) throw 'Invalid password';

            const param = {
                id: user.id
            };
            const token = jwt.sign(param, config.JWT_SECRET, {
                expiresIn: '72800s'
            });

            res.json({
                token: token,
                id: user.id,
                name: user.name,
                email: user.email
            });
        } catch (err) {
            console.log(`Error: ${err}`);
            res.status(401).send('Unauthorized');
            return;
        }
    },

    getUser: async function (req, res, next) {
        const token = req.header("x-auth-token");
        let payload = utility.getPayload(token);
        const sql = "SELECT * FROM users WHERE id=?;";

        try {
            const result = await database.query(sql, [payload.id]);
            let user = result[0][0];

            res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
            });
        } catch (err) {
            console.log(`Error: ${err}`);
            res.status(400).send("No match for your request");
            return;
        }
    },



    registerUser: async function (req, res, next) {
        const schema = joi.object({
            name: joi.string().required().min(2).max(255),
            email: joi.string().required().email().min(6).max(255),
            password: joi.string().required().min(6).max(32),
        });

        const {
            error,
            value
        } = schema.validate(req.body);

        if (error) {
            console.log(error.details[0].message);
            res.status(400).send('error sign up new user');
            return;
        }

        const sql = `INSERT INTO users(name, email, password) VALUES(?,?,?)`;

        try {
            const hash = await bcrypt.hash(value.password, 10);
            const result = await database.query(sql, [
                value.name,
                value.email,
                hash
            ]);

            res.json({
                id: result[0].insertId,
                name: value.name,
                email: value.email
            })
        } catch (err) {
            console.log(err.message);
            res.status(400).send('error signing up new user');
        }
    }
}