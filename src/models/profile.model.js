module.exports = (sequelize, Sequelize) => {
    const Profile = sequelize.define("profile", { 
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idUser: {
            type: Sequelize.INTEGER,
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        birthDay: {
            type: Sequelize.DATEONLY
        },
        gender: {
            type: Sequelize.STRING
        },
        profilePicture: {
            type: Sequelize.STRING
        },
        bio: {
            type: Sequelize.STRING
        },
        phoneNumber: {
            type: Sequelize.STRING
        },
        followerCount: {
            type: Sequelize.INTEGER
        },
        followedCount: {
            type: Sequelize.INTEGER
        },
    });

    return Profile;
};