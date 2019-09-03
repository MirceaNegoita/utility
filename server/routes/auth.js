import { Router } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import AuthValidation from '../validation/auth';
import AuthHelper from '../helpers/auth-helper';

const router = Router();

router.post("/register", async (req, res) => {
    let {name, email, password} = req.body;

    const emailExists = await AuthHelper.prototype.checkIfEmailExists(email);
    if(emailExists) return res.status(400).send('Email already exists');
    
    password = await AuthHelper.prototype.hashPassword(password);

    const user = new User({ name, email, password});

    try {
        const savedUser = await user.save();
        res.status(200).send({user: savedUser._id});
    } catch (error) {
        res.status(400).send(error)
    }
});

router.post("/login", async (req, res) => {
    let {email, password} = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(400).send({message: "Email does not exist"});

    const checkPasswords = await AuthHelper.prototype.comparePasswords(password, user.password);
    if(!checkPasswords) return res.status(400).send({message: "Invalid credentials"});

    const token = await jwt.sign({_id: user.id, name: user.name}, process.env.TOKEN_SECRET);
    
    res.header('auth-token', token).send(token);

});

export default router;