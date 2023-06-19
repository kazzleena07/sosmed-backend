const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.profile = require("../models/profile.model.js")(sequelize, Sequelize);
db.followuser = require("../models/followuser.model.js")(sequelize, Sequelize);

db.imageupload = require("../models/imageupload.model.js")(sequelize, Sequelize);

db.content = require("../models/content.model.js")(sequelize, Sequelize);
db.contentcomment = require("../models/contentcomment.model.js")(sequelize, Sequelize);
db.contentlike = require("../models/contentlike.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles"
});

db.user.belongsToMany(db.role, {
    through: "user_roles"
});

db.profile.hasMany(db.content, {foreignKey: 'idUser'})
db.content.belongsTo(db.profile, {foreignKey: 'idUser'})

db.profile.hasMany(db.contentcomment, {foreignKey: 'idUser'})
db.contentcomment.belongsTo(db.profile, {foreignKey: 'idUser'})

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;