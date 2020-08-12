const Subscription = require('../models/subscribers');

exports.saveSubscribe = async (req, res, next) =>{
    const subModel = new Subscription(req.body);
    try{
        const result = await subModel.save();
        console.log(result);
        res.status(200).json({data: "subscription saved."});
    }catch(err){
        console.error(`Error occurred while saving subscription. Err: ${err}`);
        next(err);
    }
};