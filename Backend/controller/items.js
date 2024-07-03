const itemsModel = require('../models/items');

async function handleCreateItem(req,res){
    const {dishId,title,price,image,content,openingTime,closingTime,latCoordinate,lngCoordinate,createdBy} = req.body;
    
    try{

        const newItem = new itemsModel({
            dishId,title,price,image,content,openingTime,closingTime,latCoordinate,lngCoordinate,createdBy
        })

        const myRes =  await newItem.save();
        res.json('msg: created');
    }
    catch(e)
    {
        console.log("Error : handleCreateItem "+e);
    }
}

async function handleUpdateItem(req,res){
    const {dishId,title,price,image,content,openingTime,closingTime,latCoordinate,lngCoordinate,createdBy} = req.body;
    
    try{

        const myRes =  await itemsModel.findOneAndUpdate({dishId: dishId , createdBy: createdBy},{ $set: { title: title, price: price, image: image, content: content } });
        res.json('msg: updated');
    }
    catch(e)
    {
        console.log("Error : handleUpdateItem"+e);
    }
}

async function handleDeleteItem(req,res){
    const {dishId,createdBy} = req.body;
    
    try{
        const myRes =  await itemsModel.deleteOne({dishId: dishId , createdBy: createdBy});
        res.json('msg: deleted');
    }
    catch(e)
    {
        console.log("Error : handleDeleteItem"+e);
    }
}

async function getItemByHawker(req, res) {
    try {
        const {createdBy} = req.body;

        const items = await itemsModel.find({createdBy: createdBy});

        if (!items) {
            console.log('items not found');
            return res.status(404).json({ error: 'items not found' });
        }

        return res.status(200).json(items);
    } catch (error) {
        console.error('Error retrieving shop:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function getItem(req, res) {
    try {

        const items = await itemsModel.find();

        if (!items) {
            console.log('items not found');
            return res.status(404).json({ error: 'items not found' });
        }

        return res.status(200).json(items);
    } catch (error) {
        console.error('Error retrieving shop:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { getItemByHawker , getItem , handleCreateItem , handleUpdateItem ,handleDeleteItem};
