const CheckInput = require('node-input-validator');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status-codes');

export default class User {
    constructor(userUsecase){
        this.userUsecase = userUsecase;
    }

    // Example of unrestricted API (need auth process).
    getUser(req, res) {
        res.send('Hello World! lalala')
    }

    // Login is whitelisted API, to get valid token from user login.
    login = async (req, res) => {
        // Init rule of request body validation.
        let inputValidation = new CheckInput.Validator(req.body, {
            email: 'required|string',
            pass: 'required|string',
        });

        // Validation process
        let matched = await inputValidation.check();
    
        // If not match then return error message.
        if(!matched) {
            res.send({
                status: HttpStatus.BAD_REQUEST,
                data: inputValidation.errors
            })

            return;
        }

        // Send data to login usecase.
        const user = await this.userUsecase.login(req.body.email, req.body.pass);
        if (user && user.err) {
            res.send({
                status: HttpStatus.UNAUTHORIZED,
                data: user.err
            })

            return;
        }

        res.send({
            status: HttpStatus.OK,
            data: user.data
        })
    }
}