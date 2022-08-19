const joi = require("joi");
const database = require("./database");
const bcrypt = require("bcrypt");

module.exports = {

    getCustomers: async function (req, res, next) {
        const param = req.query;
        const schema = joi.object({
            user_id: joi.number().required(),
        });
        const {
            error,
            value
        } = schema.validate(param);
        if (error) {
            console.log(error);
            res.status(400).send("Not found");
            return;
        }
        const sql =
            `SELECT * FROM customers WHERE user_id=? ORDER BY last_name ASC;`;

        try {
            const result = await database.query(sql, [value.user_id]);
            res.set('Access-Control-Allow-Origin', '*');
            res.status(200).json(rows);
        } catch (err) {
            console.log(err);
            res.status(500).send(`Something went wrong`);
        }
    },

    deleteCustomer: async function (req, res, next) {
        const schema = joi.object({
            id: joi.number().required(),
        });
        const {
            error,
            value
        } = schema.validate(req.params);
        if (error) {
            console.log(error);
            res.status(400).send("Error deleting customer");
            return;
        }
        const sql = `DELETE FROM customers WHERE id=?`;

        try {
            const result = await database.query(sql, [value.id]);
            res.status(200).send(`Customer #${value.id} successfully deleted`)
        } catch (err) {

            console.log(err);
        }
    },

    editCustomer: async function (req, res, next) {
        const reqBody = req.body;
        const schema = joi.object({
            id: joi.number().required(),
            first_name: joi.string().min(2).max(200),
            last_name: joi.string().min(2).max(300),
            phone: joi.string().regex(/^[0-9-]{8,12}$/),
            email: joi
                .string()
                .required()
                .email()
                .regex(/^[^@]+@[^@]+$/),
            user_id: joi.number().required(),

        }).min(1);

        const {
            error,
            value
        } = schema.validate(reqBody);

        if (error) {
            console.log(`Error: ${error}`);
            res.status(400).send(`error updating customer: ${error}`);
            return;
        }
        const keys = Object.keys(value);
        const values = Object.values(value);
        const fields = keys.map(key => `${key}=?`).join(',');
        values.push(req.params.id);

        const sql = `UPDATE customers SET ${fields} WHERE id=?`;
        try {
            const result = await database.query(sql, values);
            res.status(200).send(`Customer #${req.params.id} updated`);
        } catch (err) {
            console.log(err.message);
            res.status(401).send('failure updating customer');
            return;
        }

    },
}