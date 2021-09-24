import React, {useState} from "react"
import RecipeList from "./RecipeList";
import "../css/app.css"
import { v4 as uuidv4 } from 'uuid';
import RecipeEdit from "./RecipeEdit";

export const RecipeContext = React.createContext()

function App() {

  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const [recipes, setRecipes] = useState(sampleRecipes)
  
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id)
    
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: "",
      servings: 0,
      cookTime: "0:00",
      instructions: "",
      ingredients: [
        {
          id: uuidv4(),
          name: "ingredient",
          amount: "1 Tbs"
        },
  
        {
          id: uuidv4(),
          name: "ingredient",
          amount: "1 Tbs"
        }
      ]
    }
  
    setSelectedRecipeId(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }

  function handleRecipeDelete(id) {
    if(selectedRecipeId != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  return (

    <RecipeContext.Provider value= {recipeContextValue}>
        <RecipeList recipes={recipes}/>
        {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>}
    </RecipeContext.Provider>
  )

}

const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    servings: 3,
    cookTime: "1:45",
    instructions: "1. Put salt on Chicken\n2. Put chicken in oven\n3. Eat chicken",
    ingredients: [
      {
        id: 1,
        name: "chicken:",
        amount: "2 pounds"
      },

      {
        id: 2,
        name: "spice:",
        amount: "1 spoon"
      },
    ]
  },

  {
    id: 2,
    name: 'Plain Pork',
    servings: 5,
    cookTime: "0:45",
    instructions: "1. Put paprika on pork\n2. Put pork in oven\n3. Eat pwork",
    ingredients: [
      {
        name: "chicken:",
        amount: "2 pounds"
      },

      {
        name: "paprika:",
        amount: "2 spoons"
      },
    ]
  }
]

export default App;
