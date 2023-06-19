const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Profile = db.profile;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const crypto = require("crypto");
const { profile } = require("console");

exports.signup = async (req, res) => {
    // Save User to Database
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            emailToken: crypto.randomBytes(64).toString("hex"),
        });
        
        let rolesParam = ["user"]

        const roles = await Role.findAll({
            where: {
                name: {
                    [Op.or]: rolesParam, 
                },
            },
        });

        const result = user.setRoles(roles);
        if (result) res.send({error:0, message: "User registered successfully!" });
    } catch (error) {
        res.status(500).send({error: 500, message: error.message });
    }
};

exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password!",
            });
        }

        const token = jwt.sign({ id: user.id },
            config.secret,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
            });

        await user.update({
            token: token
        })

        let authorities = [];
        // const roles = await user.getRoles();
        // for (let i = 0; i < roles.length; i++) {
        //     authorities.push("ROLE_" + roles[i].name.toUpperCase());
        // }

        // req.session.token = token;
        const profile = await Profile.findOne({
            where: {
                idUser: user.id
            }
        })

        let result = {
            id: user.id,
            username: user.username,
            email: user.email,
            token: token,
            emailToken: user.emailToken,
            isVerified: user.isVerified,
            profile: profile
        }
        return res.status(200).send({error: 0, message : "success", data: result });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

exports.signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({error:0, 
            message: "You've been signed out!"
        });
    } catch (err) {
        this.next(err);
    }
};

exports.checkEmailAndUserRegistered = async (req, res) => {
    try {
        return res.status(200).send({ error:0, 
            message: "success"
        });
    } catch (err) {
        return res.status(500).send({ message: error.message });
    }
};
