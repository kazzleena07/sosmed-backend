const { authJwt, fileUpload } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.post(
        "/api/user/updateProfile",
        [authJwt.verifyToken, fileUpload.single("profilePicture")],
        controller.updateCreateProfile
    );

    app.get(
        "/api/user/getProfile",
        [authJwt.verifyToken],
        controller.getProfile
    );

    app.post(
        "/api/user/verifyEmail",
        [authJwt.verifyToken],
        controller.verifyEmail
    );

    app.post(
        "/api/user/sendVerifyEmail",
        [authJwt.verifyToken],
        controller.sendVerifyEmail
    );
    
    app.get(
        "/api/user/getImage",
        [authJwt.verifyToken],
        controller.getImageProfile
    );
};