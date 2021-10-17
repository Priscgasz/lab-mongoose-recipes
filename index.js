const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
const myAwesomeRecipe = { 
  "title": "Brownie",
"level": "Amateur Chef",
"ingredients": [
      'chocolat',
      'oeufs',
      'lait',
      'sucre',
      'farine'
],
"cuisine": "International",
"dishType": "dessert",
"duration": 90,
"creator": "Chef Priscilla"
}
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {

    Recipe.create(myAwesomeRecipe)
    .then(myCreation => {
      console.log(myCreation.title)
  
      Recipe.insertMany(data)
      .then(allMyRecipes => {
        allMyRecipes.forEach(recipe => console.log(recipe.title))
        Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new:true})
        .then(() => {
          console.log('Successfuly updated')
          Recipe.deleteOne({title:'Carrot Cake'})
          .then(() => {
            console.log('Successfuly deleted something')
          })
          .catch(e => console.error(e))
        })
        .catch(e => console.error(e))
      })
    .catch(e => console.error(e))
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  





