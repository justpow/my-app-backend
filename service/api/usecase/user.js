import md5 from 'md5';

export default class UserUseCase {
    constructor(userRepository, authUsecase) {
        this.userRepository = userRepository;
        this.authUsecase = authUsecase;
    }

    // Login usecase, all steps login process occured here.
    login = async (email, pass) => {
        const user = await this.userRepository.getUserByEmailAndPassword(email, md5(pass));
        if (user.err) {
            console.error('[UserUsecase] Login error with error => ', user.err);
            return user;
        }

        if (!user.data) {
            console.info('[UserUsecase] Email or password didn\'t match');
            return {
                data: null,
                err: 'Email or password didn\'t match'
            }
        }

        const auth = await this.authUsecase.generateAccessToken(user.data);

        return auth;
    }
}