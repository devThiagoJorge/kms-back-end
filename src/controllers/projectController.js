module.exports = {
  async ok(req, res){
    return res.send({ok: true, id: req.userId});
  }
};