const { User_game_history } = require('../models')

class userHistoryController {
    static async viewAll(req, res){
        try {
            await User_game_history.findAll({
                order: [["id", 'ASC']]
            })
            res.render("user-history", {data})
        } catch (error) {
            res.json(error)
        }
    }
}

module.exports = userHistoryController