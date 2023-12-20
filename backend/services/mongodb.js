const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/Cooking-Project')
.then(()=>{
    console.log('Mongoose connected successfully');
})
.catch(()=>{console.log('failed');})

const newSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        required:true,
    },


})


//create a model

const users=mongoose.model('users',{
    id:Number,
    name:String,
    description:String,
    ingredients:Array,
    instructions:Array,
    image:String,
    prep_time:String,
    cook_time:String,
    total_time:String,
    video:String
})

const collection=mongoose.model("collection",newSchema);


//export model
module.exports = {
    collection,
    users,

}