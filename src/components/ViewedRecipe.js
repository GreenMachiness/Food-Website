import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

function ViewedRecipe() {
  const [viewedRecipes, setViewedRecipes] = useState([]);//sstate hooooksssss

  const fetchViewedRecipes = () => {
    const recipes = JSON.parse(localStorage.getItem("viewedRecipes")) || [];//get recipelabels from viewedrecipe on localstorage
    setViewedRecipes(recipes);//set it to recipes
  };

  useEffect(() => {
    fetchViewedRecipes();//callback functionn
  }, []);

  const clearViewedRecipes = () => {
    localStorage.removeItem("viewedRecipes");
    setViewedRecipes([]);//clear history if you feel bad about how much you ate
  };

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      {viewedRecipes.length > 0 && <h2>Viewed Recipes 😋</h2>}
      {viewedRecipes.length === 0 ? (
        <h2>No Viewed Recipes Found. 😔</h2>
      ) : (
        <ul>
          {viewedRecipes.map((recipe, index) => (
            <li key={index}>{recipe}</li>
          ))}
        </ul>
      )}
      <Button variant="contained" color='secondary' startIcon={<DeleteIcon />} onClick={clearViewedRecipes}>
        Clear History
      </Button>
    </div>
  );
}

export default ViewedRecipe;
