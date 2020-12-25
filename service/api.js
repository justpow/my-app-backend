const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors')

import jwt from 'jsonwebtoken';
import apiList from './api/apiList';


export default class API {

    constructor(userHandler){
        this.userHandler = userHandler;
        this.app = app;
    }

    // Router list.
    router= () => {
        // User.
        this.app.get(apiList.user.getUser, this.userHandler.getUser);
        this.app.post(apiList.user.login, this.userHandler.login);
    }


    run = () => {
        // Set cross-origin to all.
        this.app.use(cors());

        // Use json body parser, might add another body parser for different type of request.
        this.app.use(bodyParser.json({ extended: true }));

        // Use auth middleware.
        this.app.use(this.auth);

        // Load router list.
        this.router();

        // Run the service.
        this.app.listen(process.env.PORT, () => {
            console.info(`Application listening at ${process.env.HOST}:${process.env.PORT}`);
        })
    }

    // Middleware.
    auth = (req, res, next) => {

        // Check whitelisted API, if true doesn't need auth process.
        if (apiList.whitelisted.indexOf(req.path) !== -1) {
            return next();
        }

        // Gather the jwt access token from the request header
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) {
            return res.sendStatus(401)
        }

        // Verify access token from client.
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                console.error(err)
                return res.sendStatus(403)
            }

            req.user = user
            next() // pass the execution off to whatever request the client intended
        })
    }
}