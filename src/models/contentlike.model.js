module.exports = (sequelize, Sequelize) => {
    const ContentLike = sequelize.define("content_like", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idContent: {
            type: Sequelize.INTEGER,
        },
        idUser: {
            type: Sequelize.INTEGER,
        },
    });

    return ContentLike;
};
