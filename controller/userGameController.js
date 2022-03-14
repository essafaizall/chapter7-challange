const { User_game } = require("../models")
const { hashPassword } = require("../utils/passwordHandler")

class UserGameController {


    //membuat fungsi viewAll untuk membaca data dari postgres yang berasal dari folder module/module.export User_game
    static async viewAll(req, res){
        try {
            await User_game.findAll({
                order: [["id", 'ASC']]
            })
            res.render("user-game", {data})
        } catch (error) {
            res.json(error)
        }
    }

    //untuk memanggil fungsi dari addUserGame
    static async addUserGame(req, res){
        try {
            res.render("user-game/add")
        } catch (error) {
            res.json(error)
        }
    }

    //membuat fungsi add untuk di setorkan ke postgres
    static async addUser(req, res){
        try {
            let newUser = {
                username: req.body.username,
                password: hashPassword(req.body.password),
                createdAt: new Date(),
                updatedAt: new Date()
            }
            const addUser = await User_game.create(newUser)
            res.status(201).json(addUser)
            res.redirect("/user-game/data")
        } catch (error) {
            res.json(error)
        }
    }
    //ambil data untuk dimasukan kedalam form berdasarkan id
    static async getEditUser(req, res){
        try {
            const id = req.params.id
            await User_game.findByPk(id)
            res.render('user-game/edit', { data })
        } catch (error) {
            res.json(error)
        }
    }
    //fungsi untuk update
    static async updateUser(req, res){
        try {
            const id = req.params.id
                let updateUser = {
                username: req.body.username,
                password: req.body.password
                }
            await User_game.update(updateUser, {
                where: {
                    id: id
                }
            })
            res.redirect('/user-game/data')
        } catch (error) {
            res.json(error)
        }
    }

    static async deleteUserGame(req, res){
        try {
            const id = req.params.id
            await User_game.destroy({
                where:{
                    id:id
                }
            })
            res.redirect('/user-game/data')
        } catch (error) {
            res.json(error)
        }
        
    }



}

module.exports = UserGameController
