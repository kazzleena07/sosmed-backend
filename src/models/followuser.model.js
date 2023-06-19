module.exports = (sequelize, Sequelize) => {
    const FollowUser = sequelize.define("follow_user", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idUser: {
            type: Sequelize.INTEGER,
        },
        idFollow: {
            type: Sequelize.INTEGER
        },
    });

    return FollowUser;
};
