const Admin_category = require("../models/admin/category");

class Categorycontrollers {
  getAll(req, res) {
    res.json({ message: "/app" })
  }
}
module.exports = new Categorycontrollers();