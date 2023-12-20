const db = require('./mongodb')


//get all redcepies from mongo db
const allRecipes = ()=>{
    return db.users.find()
    .then((result)=>{
        if(result){
            return{
                statusCode:200,
                recipe:result
            }
        }
        else{
            return{
                statusCode:404,
                message:"No Data Found"
            }
        }
    })
}


//add all Recipes details to mongodb
const addRecipes = (id,name,description,ingredients,instructions,image,prep_time,cook_time,total_time,video)=>{

    return db.users.findOne({id}).then((result)=>{
        if(result){
            return{
                statusCode:401,
                message:"Employee already exist"
            }
        }
        else{
     const newRecipe= new db.users({id,name,description,ingredients,instructions,image,prep_time,cook_time,total_time,video})
     newRecipe.save()//to save new Recipe details in mongodb in the database
     return{
        statusCode:200,
        message:"Recipe Added Succesfully"
     }

        }
      
    })
}



//delete a particular recipe
const deleteEmployees=(id)=>{
    return db.users.deleteOne({id}).then((result)=>{
        if(result){
            return {
                statusCode:200,
                message:"Recipe deleted Successfully"
            }
        }
      else{
        return{
            statusCode:404,
            message:"Recipe not Found"
        }
      }
    })
}

//get an particular employee details

const getAnRecipe=(id)=>{
return db.users.findOne({id}).then((result)=>{
    if(result){
        return{
            statusCode:200,
            recipe:result
        }
    }
})
}


//update An Recipe
const updateAnRecipe=(Recid,id,name,description,ingredients,instructions,image,prep_time,cook_time,total_time,video)=>{
 return db.users.findOne({id:Recid}).then((result)=>{
    if(result){
        
           result.id=id;
           result.name=name;
           result.description=description;
           result.ingredients=ingredients;
           result.instructions=instructions;
           result.image=image;
           result.prep_time=prep_time;
           result.cook_time=cook_time;
           result.total_time=total_time;
           result.video=video;
           result.save(); //to update in mongo db
           return{
            statusCode:200,
            message:"Recipe details has been updated successfully"
           }

        
    }
    else{
        return{
            statusCode:404,
            message:"Invalid Operation"

        }
    }
 })
}


module.exports={
    allRecipes,
    addRecipes,
    deleteEmployees,
    getAnRecipe,
    updateAnRecipe
}