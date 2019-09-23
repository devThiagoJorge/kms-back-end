const mongoose = require('mongoose');

const Kennel = mongoose.model('Kennel');

const Baia = mongoose.model('Baia')

module.exports = {
  // async ok(req, res){
  //   return res.send({ok: true, id: req.userId});
  // }
  async list(req, res){
    try {
      const kennels = await Kennel.find().populate(['kennelAdm', 'baias']);

      return res.send({kennels});      
    } catch (error) {
      return res.send({error: 'Error searching for kennels.'})
    }
  },

  async show(req, res){
    try {
      const kennel = await Kennel.findById(req.params.id).populate(['kennelAdm', 'baias']);
    
      return res.send({kennel});      
    } catch (error) {
      return res.send({error: 'Error searching for kennel.'})
    }
  },

  async create(req, res){
    try {
      const {name, estado, cidade, bairro, rua, numero, email, phone1, phone2, baias} = req.body;

      const kennel = await Kennel.create({name, estado, cidade, bairro, rua, numero, email, phone1, phone2, kennelAdm: req.userId})

      await Promise.all(baias.map(async baia => {
        const kennelBaia = new Baia({...baia, kennel: kennel._id});

        await kennelBaia.save();
           
        kennel.baias.push(kennelBaia);
      }));

      await kennel.save();

      return res.send({kennel});      
    } catch (error) {
      return res.send({error: 'Error creating kennel.', msg: error});
    }
  },

  async update(req, res){
    try {
      const kennel = await Kennel.findByIdAndUpdate(req.params.id, req.body,{
        new: true
      });

      return res.send({kennel});      
    } catch (error) {
      return res.send({error: 'Error updating kennel.'})
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