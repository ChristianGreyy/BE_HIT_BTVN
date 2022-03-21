var CryptoJS = require("crypto-js");

exports.encode = (req, res, next) => {
    const { code } = req.body;
    const encode = CryptoJS.AES.encrypt(code, process.env.SECRET_CRYPTO_KEY).toString();
    res.json({
        encode,
    })
}

exports.decode = (req, res, next) => {
    const { code } = req.body;
    var decode = CryptoJS.AES.decrypt(code, process.env.SECRET_CRYPTO_KEY).toString(CryptoJS.enc.Utf8);

    res.json({
        decode,
    })
}