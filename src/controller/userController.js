const userController = {
    profile : async (req, res, next) => {
        const user = {...req.user}
        return res.json({
            user
        })
    }
}

module.exports = {
    userController
}