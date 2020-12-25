const USER_TABLE = 'users';
const ALL_COLUMN = ['id', 'username', 'email'];

export default class UserRepository {
    constructor(db) {
        this.db = db;
    }

    // Check user by email and hashed password.
    getUserByEmailAndPassword = async (email, pass) => {
        return this.db
        .from(USER_TABLE)
        .select(ALL_COLUMN)
        .where('email', email)
        .where('pass', pass)
        .then( data => {
            return {
                data: data.shift(),
                err: null
            }
        })
        .catch( error => {
            return {
                data : null,
                err: error
            }
        })
    }
}