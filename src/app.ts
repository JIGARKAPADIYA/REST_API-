import express from 'express';
import router from './routes' ;
import cors from 'cors';
const app = express()

const allowedOrigins = ['http://localhost:4000','*'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options))
app.use(express.json())
app.use('/',router)

app.use('*',(req,res)=>{
    res.status(404).send("You have eneterd incorrect URL")
})
app.listen(4000,()=>{console.log("You are listening on port 4000")})