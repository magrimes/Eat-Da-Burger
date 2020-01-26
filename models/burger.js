var orm = require("../config/orm")

module.exports = {
    all: function (cb) {
        orm.selectAll("burgers", cb);
    },

    create: function (burgerName, cb) {
        orm.insertOne(burgerName, cb);
    },

    update: function (devoured, id, cb) {
        orm.updateOne(
            devoured, id, cb);
    }
}