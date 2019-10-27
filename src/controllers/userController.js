const mongoose = require('mongoose');

const User = mongoose.model('User');

const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

const bcrypjs = require('bcryptjs');

module.exports = {
  async create(req, res) {
    try {
      const { email } = req.body;

      if (await User.findOne({ email })) {
        return res.send({ error: 'User already exists.', errorId: '1' })
      }

      const user = await User.create(req.body);

      user.password = undefined;

      return res.send(
        {
          user,
          token: generateToken({ id: user.id })
        }
      );
    } catch (error) {
      return res.send({ error: 'User registration failed.', errorId: '2' })
    }
  },

  async authenticate(req, res) {
    const { email, password } = req.body;

    if (!await User.findOne({ email })) { //Se não for encontrado o e-mail (ou seja, se for false, negação de true)
      return res.send({ error: 'User not found.', errorId: '1' });
    }

    const user = await User.findOne({ email }).select('+password'); //.select('+password') seleciona o password do email, pois o mesmo está definido como false no model, ou seja, não é retornado    

    if (!await bcryptjs.compare(password, user.password)) { //O bcrypt.compare verifica se a senha não bate com a senha criptografada
      return res.send({ error: 'Invalid password.', errorId: '2' });
    }

    user.password = undefined; //Define a senha como undefined, para não ser mostrada para o cliente

    return res.send({
      user,
      token: generateToken({ id: user.id })
    });
  },

  async show(req, res) {
    try {
      const user = await User.findOne({ email: req.params.email });

      if (user == null) {
        return res.send({ error: 'User not found.' })
      }

      return res.send({ user });
    } catch (error) {
      return res.send({ error: 'Error retrieving user information.' })
    }
  },

  async update(req, res) {
    try {
      const userFromParam = await User.findOne({ email: req.params.email });

      const userFromReq = await User.findOne({ _id: req.userId });

      if (userFromParam.id == userFromReq.id) {
        const user = await User.findByIdAndUpdate(req.userId, req.body, { new: true });
        return res.send({ user });
      } else {
        throw new Error;
      }
    } catch (error) {
      return res.send({ error: 'Error updating user.' })
    }
  },

  async index(req, res) {
    try {
      const { firstName, lastName } = req.query;

      if (lastName == undefined) {
        let users = await User.find({ firstName: { $regex: firstName, $options: "i" } });
        return res.send({users});
      } else {
        let users = await User.find({
          $and: [
            { firstName: { $regex: firstName, $options: "i" } },
            { lastName: { $regex: lastName, $options: "i" } }
          ]
        });
        return res.send({users});
      }
      //regex: Expressão regular (encontra nomes que contenham em qualquer parte do nome, as letras pesquisadas pelo usuário)
    } catch (error) {
      return res.send({ error: "Failed searching for users." });
    }
  },

  async delete(req, res) {
    try {
      const userFromParam = await User.findOne({ email: req.params.email });

      const userFromReq = await User.findOne({ _id: req.userId });

      if (userFromParam.id == userFromReq.id) {
        await User.findByIdAndDelete(req.userId);

        return res.send({ success: 'User deleted.' });
      } else {
        throw new Error;
      }
    } catch (error) {
      return res.send({ error: 'Error deleting user.' })
    }
  },

  async updatePassword(req, res) {
    try {
      const email = req.params.email;

      const userFromParam = await User.findOne({ email });

      const userFromReq = await User.findOne({ _id: req.userId });

      if (userFromParam.id == userFromReq.id) {

        const { currentPassword, newPassword } = req.body;

        let user = await User.findOne({ email }).select('+password');

        if (!await bcryptjs.compare(currentPassword, user.password)) {
          return res.send({ error: 'Invalid current password.', errorId: '1' });
        }

        const hash = await bcrypjs.hash(newPassword, 10);

        user.password = hash;

        await User.findByIdAndUpdate(req.userId, user, { new: true });

        return res.send({ success: true });
      } else {
        throw new Error;
      }
    } catch (error) {
      return res.send({ error: 'Error updating password.' })
    }
  }
};

function generateToken(params = {}) {
  return token = jwt.sign(params, authConfig.secret, {
    expiresIn: 86400 //Expira em 1 dia (86400 segundos)
  });
}