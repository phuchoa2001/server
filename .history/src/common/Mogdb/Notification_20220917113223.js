const Admin_notification = require("../../app/controllers/models/admin/notification");

async function AddNotification(name, desc) {
    console.log("name, desc" , name, desc)
    const post = new Admin_notification({ name, desc });
    await post.save();
}
module.exports = { AddNotification };
