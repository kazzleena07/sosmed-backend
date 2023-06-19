module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    emailToken: {
      type: Sequelize.STRING,
    },
    token: {
      type: Sequelize.STRING,
    }
  });

  return User;
};