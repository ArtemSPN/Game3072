import  express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import PlayerModel from "./models/Player.js";


mongoose.connect('mongodb+srv://admin:admin123@cluster0.kmnj16k.mongodb.net/?retryWrites=true&w=majority') 
.then(() =>{console.log("DB ok")})
.catch((err) => console.log("DB error", err))

const app = express();

app.use(express.json());
app.use(cors());

app.post('/reg',  async (req, res) => {
    try{
        console.log(req.body)
        const doc = new PlayerModel({
            username: req.body.username,
            password: req.body.password,
            avatar: req.body.avatar,
            gameCount: 0,
            bestScore: 0,
        });

        const user = await doc.save();
        return res.json(user)
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "не удалось создать пользователя"
        })
    }
});


app.post('/login',  async (req, res) => {
   try{
        const user = await PlayerModel.findOne({
            username: req.body.username,
        });

        const isValid = user.password == req.body.password;
        if(!isValid){
            return res.status(404).json({
                message: "неверный логин или пароль"
            })
        }

        return res.json({
            user
        })

   } catch(err){
        console.log(err);
        res.status(500).json({
            message: "не удалось найти пользователя"
        })
   }
});

app.get('/plusGame/:id',  async (req, res) => {
    try{
        const user = await PlayerModel.findOne({
            _id: req.params.id,
        });
        user.gameCount++;
        user.save()

        return res.json({
            message: "данные обновлены"
        })
    } catch(err){
 
    }
 });
       
 app.post('/updateBestScore',  async (req, res) => {
    try{
        const user = await PlayerModel.findOne({
            _id: req.body.id
        });

        if(user.bestScore < req.body.score){
            user.bestScore = req.body.score;
            user.save()
            return res.json({
                message: "данные обновлены"
            })
        }

        return res.json({
            message: "изменений не произошло"
        })


    } catch(err){
 
    }
 });


app.listen(4444, (err) => {
   if(err) {
       return console.log(err)
   }

   console.log("Server OK!");
});