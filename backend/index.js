//1 Import express
const express = require('express');


const db = require('./services/mongodb')

// const collection = require('./services/mongodb');

//2 import cors
const cors= require('cors');


//import logic
const logic=require('./services/logic')

//3 Create a server application using express 
const app = express();

app.use(express.json());


app.use(express.urlencoded({extended:true}))

//4 use cors
app.use(cors())

// {
//     origin:'http://localhost:3000'
// }




//Login
app.get("/",(req,res)=>{

})

app.post("/",async(req,res)=>{
    const{name,email,password}=req.body

    try{

   const check=await db.collection.findOne({email:email})

   if(check){
    res.json("exist")
   }
   else{
    res.json("notexist")
   }

    }
    catch(e){
        res.json("notexist")

    }
})


//Register 


app.post("/register",async(req,res)=>{
    const{name,email,password,mobile}=req.body;

    const data={
        name:name,
        email:email,
        password:password,
        mobile:mobile,    

    }

    try{

   const check=await db.collection.findOne({email:email})

   if(check){
    res.json("exist")
   }
   else{
    res.json("notexist")
    await db.collection.insertMany([data])
   }

    }
    catch(e){
        res.json("notexist")

    }
})




//get all recipes from mongo db
app.get('/getRecipes' ,(req,res)=>{
    logic.allRecipes().then((response)=>{
        res.status(response.statusCode).json(response)
    })
})











//add Recipe
app.post('/addRecipe',(req,res)=>{
    logic.addRecipes(req.body.id,req.body.name,req.body.description,req.body.ingredients,req.body.instructions,req.body.image,req.body.prep_time,req.body.cook_time,req.body.total_time,req.body.video)
    .then((response)=>{
        res.status(response.statusCode).json(response)
    })
})


//delete a partricular Recipe
app.delete('/deleteRecipe/:id',(req,res)=>{
    logic.deleteEmployees(req.params.id).then((response)=>{
        res.status(response.statusCode).json(response)
    })
})


//get a particukar recipe
app.get('/getRecipes/:id',(req,res)=>{
    logic.getAnRecipe(req.params.id).then((response)=>{
        res.status(response.statusCode).json(response)
    })
})


//update an employee details
app.post('/updateAnRecipe/:id',(req,res)=>{
    logic.updateAnRecipe(req.params.id,req.body.id,req.body.name,req.body.description,req.body.ingredients,req.body.instructions,req.body.image,req.body.prep_time,req.body.cook_time,req.body.total_time,req.body.video).then((response)=>{
        res.status(response.statusCode).json(response)
    })
})

app.listen(8000,()=>{
    console.log('port connected');
})