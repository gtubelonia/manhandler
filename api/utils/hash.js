var argon2 = require('argon2');

exports.argonHash = async (password) => {
    try {
        const hash = await argon2.hash(password);
        return hash;
    } catch (err) {
        throw Error("Error Occured hashing password");
    }
}

exports.argonVerify = async (hash, password) => {
    try {
        return await argon2.verify(hash, password)
    } catch (err) {
        throw Error("Error Occured hashing password");
    }
}