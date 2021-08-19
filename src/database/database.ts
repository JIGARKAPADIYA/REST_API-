import {connect,Schema,model, Date} from 'mongoose';
interface Usertask{
    name:string,
    task:string,
    startdate:Date,
    enddate:Date
}
const Usertaskschema = new Schema<Usertask>({
    name:{
        type:String,
        required:true
    },
    task:{
        type:String,
        required:true,
    },
    startdate:{
        type:Schema.Types.Date,
        required:true
    },
    enddate:{
        type:Schema.Types.Date,
        required:true
    }
},{strict:false})
const UsertaskModel = model<Usertask>('User',Usertaskschema);
async function start(){
    await connect('mongodb://localhost:27017/Demo',{ useNewUrlParser: true , useUnifiedTopology: true }).then(()=>{console.log("You are connected to DB")}).catch((err)=>{console.log("Error caught"+err)});
    const firstdoc = new UsertaskModel({
        name:"Jigar Kapadiya",
        task:"Join meeting",
        startdate:"2021-08-18",
        enddate:"2021-08-18"
    })
    await firstdoc.save();
}
async function adduser(body:Usertask){
    const newtask = new UsertaskModel({
        name:body.name,
        task:body.task,
        startdate:body.startdate,
        enddate:body.enddate
    })
    let value;
    value = await newtask.save((err,res)=>{
        if(err) return "Error";
        else return "User Inserted"
    })
    console.log(value)
}
export class DataBase{
    public model:typeof UsertaskModel;
    constructor(){
        this.model = UsertaskModel;
        start()   
    }
}