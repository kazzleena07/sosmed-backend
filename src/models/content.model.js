module.exports = (sequelize, Sequelize) => {
    const Content = sequelize.define("content", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idUser: {
            type: Sequelize.INTEGER
        },
        photo: {
            type: Sequelize.STRING,
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        commentCount: {
            type: Sequelize.INTEGER
        },
        likeCount: {
            type: Sequelize.INTEGER
        },
    });

    return Content;
};
