let jwt = require("jsonwebtoken");

let genrateToken = async (data, expiretime) => {
    try {
        let token = await jwt.sign(
            { ...data },
            process.env.JWT_SECRET || "privatekey",
            { expiresIn: expiretime }
        );
        return token;

    } catch (error) {
        console.log(error);
        return null;
    }
};

let verifyToken = async (token) => {
    try {
        let decode = await jwt.verify(
            token,
            process.env.JWT_SECRET || "privatekey"
        );
        return decode;

    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = { genrateToken, verifyToken };