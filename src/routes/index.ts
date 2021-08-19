import express from 'express';
import { ObjectId } from 'mongodb';
import {DataBase} from '../database/database';
import { users,open,close } from '../database/driver';

const router = express.Router();

router.get('/',async(req,res)=>{
    await open()
    let usertasks = await users.find().toArray();
    res.send(usertasks)
    await close()
})

router.get('/:id',async(req,res)=>{
    await open()
    try{
        let alltasks = await users.find({_id:new ObjectId(req.params.id)}).toArray();
        console.log(alltasks)
        if(alltasks.length == 0)
    {
        res.status(404).send("No such tasks exist")
    }
    else res.status(200).send(alltasks)
    }
    catch{
        res.status(404).send("Invalid ID")
    }
    await close()
})


router.post('/',async (req,res)=>{
    await open()
    const newtask = {
        name:req.body.name,
        task:req.body.task,
        startdate:req.body.startdate,
        enddate:req.body.enddate
    }
    await users.insertOne(newtask).then(()=>{
        res.status(200).send("New task Inserted");
    }).catch(()=>{res.status(500).send("Error")})
    await close()
})


router.put('/:id',async(req,res)=>{
    await open()
    try{
        {await users.findOneAndReplace({_id: new ObjectId(req.params.id)},{
            name:req.body.name,
            task:req.body.task,
            startdate:req.body.startdate,
            enddate:req.body.enddate
        }).then(()=>{
            res.status(200).send("Usertask updated successfully")
        }).catch((err)=>{res.status(500).send("Unable to update no catch")})}
    }
    catch(err){
        res.send("Unable to update")
    }
    await close()
})

router.patch('/:id',async(req,res)=>{
    await open()
    await users.findOneAndUpdate({_id: new ObjectId(req.params.id)},{$set:{
            name:req.body.name,
            task:req.body.task,
            startdate:req.body.startdate,
            enddate:req.body.enddate
    }}).then(()=>{
        res.status(200).send("Usertask updated successfully")
    }).catch((err)=>{res.status(500).send("Unable to update")})
    await close()
})
router.delete('/:id',async(req,res)=>{
    await open()
    await users.findOneAndDelete({_id: new ObjectId(req.params.id)}).then(()=>{
        res.status(200).send("Usertask deleted successfully")
    }).catch((err)=>{res.status(500).send("Unable to delete")})
    await close()
})
export = router