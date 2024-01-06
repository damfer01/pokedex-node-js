const bcrypt = require('bcrypt');

const User = require('../models/UserModels');

module.exports = {
    async create(name, username, password) {
        const hash = await bcrypt.hash(password, 10);
        await User.create({
            name,
            username,
            password: hash,
        });

        return { success: true, message: 'sucesso' };
    },

    async index() {
        const users = await User.find();

        return {
            success: true,
            message: ' recovered',
            result: users,
        };
    },

    async show(id) {
        const user = await User.findById(id);

        return {
            success: true,
            message: ' user recovered success',
            result: user,
        };
    },

    async update(id, name, username,) {
        await User.findByIdAndUpdate(id ,{
            name,
            username,
 
        });

        return { success: true, message: 'sucesso' };


    },

    async delete(id) {
        await User.findByIdAndDelete(id);

        return {
            success: true,
            message: ' deleted'
        }
    },
};