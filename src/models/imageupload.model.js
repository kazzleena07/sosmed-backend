module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define("image_upload", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING,
        },
        route: {
            type: Sequelize.STRING,
        },
        data: {
            type: Sequelize.BLOB("long"),
        },
    });

    return Image;
};