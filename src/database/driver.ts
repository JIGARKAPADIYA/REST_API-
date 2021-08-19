import { MongoClient } from "mongodb";
const uri =
  "mongodb+srv://node:pass%401234@cluster0.fsyo3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function run() {
    try {
      await client.connect().then(()=>{console.log("DB connected")});
      const database = client.db('Demo');
      const users = database.collection('users');
      //const users = await database.createCollection('users')
      users.insertOne({
          title:"Hello all"
      })
     }
    catch{
        console.dir
    }
  }
  const database = client.db('Demo');
  const users = database.collection('users');
  async function open(){
    await client.connect().then(()=>{console.log("DB connected opened")})
    .catch(()=>{console.log("Error occured while connecting")});
  }
  async function close()
  {
    await client.close().then(()=>{console.log("Connection closed successfully")}).catch((err)=>{
        console.log("Error occured in closing connection"+err);
    }) 
  }
  run()
  export  {
      database,users,open,
      run,close
  }