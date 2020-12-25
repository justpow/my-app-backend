const API_PREFIX = '/api'

// List of user API.
const user = {
    getUser: '/',
    login: `${API_PREFIX}/user/login`,
}

// List of whitelisted API that no need authentication.
const whitelisted = [
    user.login,
]

export default {
    user,
    whitelisted,
};