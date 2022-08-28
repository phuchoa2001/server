
class Appcontrollers {
    getAll(req, res) {
      res.json({message : "/app"})
    }
}
module.exports = new Appcontrollers();