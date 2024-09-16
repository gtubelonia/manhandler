var { PrismaClient } = require('@prisma/client');
var prisma = new PrismaClient();


async function UserRegister(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);
    try {
        data.password = await argonHash(data.password);

        const allUsers = await prisma.systemusers.find();
    
        return res.status(201).send(ToUserDto(newUser));
    } catch (err) {
        return (next(err));
    }
};

module.exports = {UserRegister }