import jwt from 'jsonwebtoken';

export default class authUsecase {
    constructor(tokenSecret) {
        this.tokenSecret = tokenSecret;
    }

    // Access token generator using user data.
    generateAccessToken = async (userData) => {
        if (!userData) {
            return {
                data: null,
                err: 'Invalid user data'
            }
        }

        const data = {
            accessToken: jwt.sign(userData, this.tokenSecret)
        }

        return {
            data: data,
            err: null
        }
    }
}