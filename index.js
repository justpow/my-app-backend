import API from './service/api';
import UserHandler from './service/api/handler/user';
import AuthUsecase from './service/api/usecase/auth';
import UserUsecase from './service/api/usecase/user';
import UserRepository from './service/api/repository/user';


import dotenv from 'dotenv';
import knex from 'knex';

// Load config variable.
dotenv.config();

// DB connection.
let db = knex({
    client: 'pg',
    version: '7.2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    }
});

// Repository.
const userRepository = new UserRepository(db);

// Usecase.
const authUsecase = new AuthUsecase(process.env.TOKEN_SECRET)
const userUsecase = new UserUsecase(userRepository, authUsecase);


// Handler.
const userHandler = new UserHandler(userUsecase);

// API server.
const api = new API(userHandler);

// Run API server.
api.run();