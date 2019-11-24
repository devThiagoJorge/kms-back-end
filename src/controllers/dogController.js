const mongoose = require('mongoose');

const Dog = mongoose.model('Dog');

module.exports = {
  async show(req, res) {
    try {
      const dog = await Dog.findById(req.params.id);

      return res.send(dog);
    } catch (error) {
      return res.send({ error: 'Error searching for dog.' });
    }
  },

  async update(req, res) {
    try {
        const dog = await Dog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.send(dog);
    } catch (error) {
      return res.send({ error: 'Error updating dog.' })
    }
  },

  async delete(req, res) {
    try {
      const dog = await Dog.findById(req.params.id);

      if (dog == null) {
        return res.send({ error: 'Dog not found.', errorId: '1' })
      }

      dog.remove();

      return res.send({ success: 'Dog deleted.' });
    } catch (error) {
      return res.send({ error: 'Error deleting dog.', errorId: '2' })
    }
  }
};