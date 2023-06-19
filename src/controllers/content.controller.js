const db = require("../models");
const config = require("../config/auth.config");
const Profile = db.profile;
const Image = db.imageupload;
const FollowUser = db.followuser;
const Content = db.content;
const ContentComment = db.contentcomment;
const ContentLike = db.contentlike;
const fs = require("fs");

const Op = db.Sequelize.Op;

exports.getAllContent = async (req, res) => {
    try {
        const content = await Content.findAll({
            order: [
                ['createdAt', 'DESC'],
            ],
            include:[Profile]
        });
        
        res.status(200).send({ error: 0, message: 'success', data: content })
    } catch (error) {
        res.status(500).send({ error: 500, message: error.message });
    }
};

exports.createContent = async (req, res) => {
    try {
        if (req.file) {
            await Image.create({
                type: req.file.mimetype,
                name: req.file.filename.trim(),
                route: 'content',
                data: fs.readFileSync(
                    __basedir + "/resources/static/assets/uploads/" + req.file.filename.trim()
                ),
            }).then((image) => {
                fs.writeFileSync(
                    __basedir + "/resources/static/assets/tmp/" + image.name.trim(),
                    image.data
                );
            });
        }

        var imageUrl = req.protocol + '://' + req.get('host') +'/'+req.file.filename.trim();

        const content = await Content.create({
            idUser: req.body.idUser,
            photo: imageUrl,
            title: req.body.title,
            description: req.body.description,
            commentCount: 0,
            likeCount: 0
        });

        if (content) res.status(200).send({ error: 0, message: 'success' })
    } catch (error) {
        res.status(500).send({ error: 500, message: error.message });
    }
};

exports.getDetailContent = async (req, res) => {
    try {
        const content = await Content.findOne({
            where: {
                id: req.query.id
            },
            include:[Profile]
        });

        const comment = await ContentComment.findAll({
            where: {
                idContent: content.id
            },
            include:[Profile],
            order:[
                ['createdAt', 'DESC'],
            ]
        })

        let result = {
            content: content,
            comment: comment
        }
        res.status(200).send({ error: 0, message: 'success', data: result })
    } catch (error) {
        res.status(500).send({ error: 500, message: error.message });
    }
};

exports.postLikeContent = async (req, res) => {
    try {
        const content = await Content.findOne({
            where:{
                id: req.body.idContent
            }
        });
        
        await ContentLike.create({
            idUser: req.body.idUser,
            idContent: req.body.idContent
        });

        let _likeCount = content.likeCount +1;

        const result = await content.update(
            {
                likeCount : _likeCount
            },
        );
        
        if(result) res.status(200).send({ error: 0, message: 'success' })
    } catch (error) {
        res.status(500).send({ error: 500, message: error.message });
    }
};

exports.postCommentContent = async (req, res) => {
    try {
        const content = await Content.findOne({
            where:{
                id: req.body.idContent
            }
        });

        await ContentComment.create({
            idUser: req.body.idUser,
            idContent: req.body.idContent,
            comment: req.body.comment
        });

        let _commentCount = content.commentCount +1;
        
        const result = await content.update(
            {
                commentCount : _commentCount
            },
        );
        
        if(result) res.status(200).send({ error: 0, message: 'success' })
    } catch (error) {
        res.status(500).send({ error: 500, message: error.message });
    }
};