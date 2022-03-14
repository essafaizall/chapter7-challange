const { User_game_biodata } = require('../models')

class userBiodataController {

    static async viewAll(req, res){
        try {
            User_game_biodata.findAll({
                order: [['id', 'ASC']]
            })
            res.render("user-biodata", {data})
        } catch (error) {
            res.json(error)
        }
    }

    static async getAddForm(req, res){
        try {
            res.render('user-biodata/add')
        } catch (error) {
            res.json(error)
        }
    }

    static async postAddForm(req, res){
        try{
            let newBiodata = {
                full_name: req.body.full_name,
                email: req.body.email,
                gender: req.body.gender,
                birthday: req.body.birthday,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            const data = User_game_biodata.create(newBiodata)
            res.status(201).json(data)
        } catch (error) {
            res.json(error)
          }
    }

    static async getEditForm(req, res){
        try {
            const id = req.params.id
            await User_game_biodata.findByPk(id)
            res.render('user-biodata/edit', { data })
        } catch (error) {
            res.json(error)
        }
    }

    static async updateBiodata(req, res){
        try {
            const id = req.params.id
            let updateBiodata = {
            full_name: req.body.full_name,
            email: req.body.email,
            gender: req.body.gender,
            birthday: req.body.birthday,
            createdAt: new Date(),
            updatedAt: new Date()
        }
            const updateData = await User_game_biodata.update(updateBiodata, {
            where: {
                id: id
                }
            })
            res.status(201).json(updateData)
        } catch (error) {
            res.json(error)
        }
    }

    static async deleteBiodata(req, res){
        try {
            const id = req.params.id
            await User_game_biodata.destroy({
            where:{
                id:id
            }
        })
        } catch (error) {
            res.json(error)
        }
    }

}
module.exports = userBiodataController