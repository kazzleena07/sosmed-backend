const db = require("../models");
const config = require("../config/auth.config");
const { sendVerificationEmail } = require("../utils/sendVerificationEmai.jsx");
const Profile = db.profile;
const Image = db.imageupload;
const FollowUser = db.followuser;
const User = db.user;
const fs = require("fs");

const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({
            where: {
                idUser: req.query.idUser,
            },
        });

        const followUser = await FollowUser.findAll({
            where: {
                idUser: req.query.idUser,
            },
        });

        let idFollow = []

        if (followUser) {
            followUser.forEach(item => {
                idFollow.push(item)
            })
        }

        let result = {
            profile: profile,
            followUser: idFollow
        };

        return res.status(200).send({ error: 0, message: "success", data: result });
    } catch (error) {
        return res.status(500).send({ error: 500, message: error.message });
    }
}

exports.updateCreateProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({
            where: {
                idUser: req.body.idUser,
            },
        });

        if (req.file) {
            await Image.create({
                type: req.file.mimetype,
                name: req.file.filename.trim(),
                route: 'profile',
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

        if (!profile) {
            const result = await Profile.create({
                idUser: req.body.idUser,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address,
                birthDay: req.body.birthDay,
                gender: req.body.gender,
                bio: req.body.bio,
                phoneNumber: req.body.phoneNumber,
                profilePicture: imageUrl,
                followerCount: 0,
                followedCount: 0,
            });

            if (result) res.send({ error: 0, message: "success" });
        } else {
            const result = await profile.update({
                profilePicture: imageUrl ?? profile.firstName,
                firstName: req.body.firstName ?? profile.firstName,
                lastName: req.body.lastName ?? profile.lastName,
                address: req.body.address ?? profile.address,
                birthDay: req.body.birthDay ?? profile.birthDay,
                gender: req.body.gender ?? profile.gender,
                bio: req.body.bio ?? profile.bio,
                phoneNumber: req.body.phoneNumber ?? profile.phoneNumber,
            });

            if (result) res.send({ error: 0, message: "success" });
        }

    } catch (error) {
        res.status(500).send({ error: 500, message: error.message });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const emailToken = req.body.emailToken;
        if (!emailToken) return res.status(404).send({ error: 404, message: "EmailToken not found" });

        const user = await User.findOne({
            whereL: { emailToken: emailToken }
        })

        if (user) {
            user.emailToken = null;
            user.isVerified = true;

            await user.save();
            res.status(200).send({ error: 0, message: "Email verification success" })
        } else {
            res.statu(403).send({ error: 403, message: "Email verification failed, invalid Token" })
        }
    } catch (e) {
        res.status(500).send({ error: 500, message: e.message });
    }
}

exports.sendVerifyEmail = async (req, res) => {
    try {
        let userVerify = {}

        const user = await User.findOne({
            where: {
                id: req.body.idUser
            }
        })

        if (user) {
            const profile = await Profile.findOne({
                where: { idUser: user.id }
            })

            if (profile) {
                userVerify = {
                    fullName: profile.firstName + " " + profile.lastName,
                    email: user.email,
                    emailToken: user.emailToken
                }
            } else {
                userVerify = {
                    fullName: user.email,
                    email: user.email,
                    emailToken: user.emailToken
                }
            }
            sendVerificationEmail(userVerify)
            res.status(200).send({ error: 0, message: "Email verification has been sent" })
        } else {
            res.status(404).send({ error: 404, message: "User not found!" });
        }
    } catch (e) {
        res.status(500).send({ error: 500, message: e.message });
    }
};

exports.getImageProfile = async (req, res) => {
    try{
        const profile = await Profile.findOne({
            where:{
                idUser: req.query.idUser
            }
        })
        res.sendFile(__basedir+'/resources/static/assets/uploads/'+profile.profilePicture);
    }catch(e){
        res.status(500).send({error: 500, message: e.message});
    }

}