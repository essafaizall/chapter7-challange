const fs = require('fs')
const { User_game } = require("../models")
const { generateJwtToken } = require('../utils/tokenHandler')


class login{
    static postLogin(req, res){
        const { username, password } = req.body
        const foundUser = fs.readFileSync('data/data-statis.json', 'utf-8')
        console.log(foundUser)
        const parsedDatanya = JSON.parse(foundUser)
        const DataDitemukan = parsedDatanya.find((user) => user.username == username)

        if(!DataDitemukan){
            res.redirect('login')
        } else if(DataDitemukan.password == password){
            res.redirect('user-game/data')
        } else{
            res.redirect('login')
        }
    }

    static async posttLogin(req, res){
        try {
            const inputPassword = req.body.password
            await User_game.findOne({
                where:{
                    username: req.body.username
                }
            })
            if(!User_game){
                throw{
                    status: 404,
                    message: "Email not found"
                }
            } else if(comparePassword(inputPassword, User_game.password)){
              const accessToken = generateJwtToken({
                  id: User_game.id,
                  email: User_game.email
              })
              res.status(200).json({ User_game, message: "berhasil login", accessToken})
            } else {
                throw {
                    status: 401,
                    message: "Invalid email/password"
                }
            }
        } catch (error) {
            res.json(error)
        }
    
    }

    static getLogin(req, res){
        res.render('login')
    }
}
module.exports = login