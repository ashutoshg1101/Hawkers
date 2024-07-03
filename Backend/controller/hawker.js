const hawkerModel = require('../models/hawker');

async function handleCreateUser(req,res){
    const {shopName,mobile,email,password,openingTime,closingTime,address,latCoordinate,lngCoordinate} = req.body;
    
    try{

        const myUser = new hawkerModel({
            shopName,mobile,email,password,openingTime,closingTime,address,latCoordinate,lngCoordinate
        })

        const myRes =  await myUser.save();
        console.log(myRes);
        res.json('msg: created');
    }
    catch(e)
    {
        console.log("Error : handleCreateUser"+e);
    }
}

async function handleUserLogin(req,res){
    const {email , password} = req.body;
    try{

        const user = await hawkerModel.findOne({email});
        if(user)
        {
            if(password == user.password)
            {
                res.json({flag: true})
            }
            else
            {
                res.json({flag: false})
            }
        }
        else
        {
            res.json({flag: false});
        }
    }
    catch(e)
    {
        console.log("Error : handleUserLogin"+e);
    }
}

async function handleHawkerDetails(req,res)
{
    const {email} = req.body;
    try{

        const user = await hawkerModel.findOne({email});
        if(user)
        {
            res.json(user);
        }
    }
    catch(e)
    {
        console.log("Error : handleHawkerDetails"+e);
    }
}

async function handleHawkerDetailsById(req,res)
{
    const {createdBy} = req.body;
    try{

        const user = await hawkerModel.findById(createdBy);
        if(user)
        {
            res.json(user);
        }
    }
    catch(e)
    {
        console.log("Error : handleHawkerDetails"+e);
    }
}

module.exports = {handleCreateUser,handleUserLogin,handleHawkerDetails,handleHawkerDetailsById}