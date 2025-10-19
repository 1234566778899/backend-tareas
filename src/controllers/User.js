const User = require("../models/User");
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).send({ msg: 'Usuario ya registrado' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const instance = new User({
            ...req.body,
            password: hashedPassword
        });
        
        await instance.save();
        return res.status(200).json({ msg: 'Usuario registrado' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username,password)
        const user = await User.findOne({ username, active: true });
        console.log(user)
        if (!user) {
            return res.status(404).send({ msg: 'Usuario inválido' });
        }
        const esValido = await bcrypt.compare(password, user.password);
        if (esValido) {
            return res.status(200).json({ token: user._id });
        }
        return res.status(404).json({ msg: 'Usuario inválido' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = {
    register,
    login
}

