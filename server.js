const express = require('express')
const app = express()
const port = 3002
const router = require('./routes')


app.use(express.json()) //parsing bentukan json
app.use(express.urlencoded({ extended: true })) //parsing req.body dari postman form x-wwww-urlencoded

//setting view engine untuk ejs
app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static(__dirname + '/public'));

app.use(router)

// app.get('/login', (req, res) => {
//     res.render('login')
// })

app.get('/cekdanricek', async (req, res) => {
    const user = await User_game.findAll({
        include: [{
          model: User_game_biodata
        }]
      })
      res.send(user)
})

app.listen(port, (req, res) => {
    console.log(`Sedang menjalankan di port ${port}`)
})