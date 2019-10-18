const mongoose = require('mongoose');

const Kennel = mongoose.model('Kennel');

const Dog = mongoose.model('Dog')

module.exports = {  
  async index(req, res){
    try {
      const {name} = req.query;

      const kennels = await Kennel.find({
        name: { $regex: name, $options: "i" }
      }).populate(['kennelAdm', 'dogs']);

      return res.send({kennels});      
    } catch (error) {
      return res.send({error: 'Error searching for kennels.'})
    }
  },

  async show(req, res){
    try {
      const kennel = await Kennel.findById(req.params.id).populate(['kennelAdm', 'dogs']);
    
      return res.send({kennel});      
    } catch (error) {
      return res.send({error: 'Error searching for kennel.'})
    }
  },

  async create(req, res){
    try {
      const {name, estado, cidade, bairro, rua, numero, email, phone1, phone2, dogs} = req.body;

      const kennel = await Kennel.create({name, estado, cidade, bairro, rua, numero, email, phone1, phone2, kennelAdm: req.userId})
      
      await Promise.all(dogs.map(async dog => {
        const newDog = new Dog({...dog, kennel: kennel._id});

        await newDog.save();
           
        kennel.dogs.push(newDog);
      }));

      await kennel.save();

      return res.send({kennel});      
    } catch (error) {
      return res.send({error: 'Error creating kennel.'});
    }
  },

  async update(req, res){    
    try {
      const {name, estado, cidade, bairro, rua, numero, email, phone1, phone2, dogs} = req.body;

      const kennel = await Kennel.findByIdAndUpdate(req.params.id, {
        name,
        estado,
        cidade,
        bairro,
        rua,
        numero,
        email,
        phone1,
        phone2
      }, {new: true}); //Retorna o Kennel atualizado (e não o antigo)

      kennel.dogs = [];
      await Dog.deleteMany({kennel: kennel._id})

      await Promise.all(dogs.map(async dog => {
        const updatedDog = new Dog({...dog, kennel: kennel._id});

        await updatedDog.save();
           
        kennel.dogs.push(updatedDog);
      }));

      await kennel.save();

      return res.send({kennel});      
    } catch (error) {
      return res.send({error: 'Error updating kennel.'});
    }
  },

  async delete(req, res){
    try {
      const kennel = await Kennel.findById(req.params.id);      

      if(kennel == null){
        return res.send({error: 'Kennel not found.', errorId: '1'})
      }
      
      kennel.remove();

      return res.send({success: 'Kennel deleted.'});      
    } catch (error) {
      return res.send({error: 'Error deleting kennel.', errorId: '2'})
    }
  }
};