const { authJwt, fileUpload } = require("../middleware");
const controller = require("../controllers/content.controller");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/content/list",
        [authJwt.verifyToken],
        controller.getAllContent
    );
    
    app.get(
        "/api/content/detail",
        [authJwt.verifyToken],
        controller.getDetailContent
    );

    app.post(
        "/api/content/create",
        [authJwt.verifyToken, fileUpload.single('contentImage')],
        controller.createContent
    );   

    app.post(
        "/api/content/like",
        [authJwt.verifyToken],
        controller.postLikeContent
    );  

    app.post(
        "/api/content/comment",
        [authJwt.verifyToken],
        controller.postCommentContent
    ); 

};