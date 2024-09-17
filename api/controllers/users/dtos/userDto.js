function ToUserDto(user) {
    return {
        username: user.username,
        email: user.email,
    }
}

module.exports = { ToUserDto }