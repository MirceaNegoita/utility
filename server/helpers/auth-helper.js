import bcrypt from 'bcryptjs';
import User from '../models/User';

class AuthHelper{
    async hashPassword(password){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    }

    async checkIfEmailExists(email){
        const user = await User.findOne({email});

        console.log("User", user);

        if (user) {
            return true;
        }

        return false;
    }

    async comparePasswords(requestPassword, userPassword){
        const validPass = await bcrypt.compare(requestPassword, userPassword);

        return validPass;
    }
}

export default AuthHelper;