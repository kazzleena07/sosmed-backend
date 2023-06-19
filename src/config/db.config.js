module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "jcwd2402",
    DB: "medsos",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};