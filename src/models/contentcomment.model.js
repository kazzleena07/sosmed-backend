module.exports = (sequelize, Sequelize) => {
    const ContentComment = sequelize.define("content_comment", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        comment: {
            type: Sequelize.STRING
        },
        idContent: {
            type: Sequelize.INTEGER,
        },
        idUser: {
            type: Sequelize.INTEGER,
        },
    });

    return ContentComment;
};
