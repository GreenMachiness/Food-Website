import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import "./styles.css";

const flyMeToTheTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const SimilarRecipesSidebar = ({ selectedRecipe, data }) => {
  if (!selectedRecipe) {
    return null;
  }

  const selectedIngredients = selectedRecipe.recipe.ingredientLines; // get the ingredients of the selected recipe

  const similarRecipes = data.filter((recipe) => {
    //create new array with .filter
    const commonIngredients = recipe.recipe.ingredientLines.some(
      (
        ingredient //looks for ingredients at the ingredientlines that are similar,
      ) => selectedIngredients.includes(ingredient) //if true it would add to the list of similar Recipes
    );
    return (
      commonIngredients && recipe.recipe.label !== selectedRecipe.recipe.label //added not equal operator so that it wont render the recipe in we're in
    );
  });

  return (
    <div className="similar-recipes-sidebar">
      <h3>Similar Recipes</h3>
      <div className="similar-recipes-container">
        {similarRecipes.map((recipe) => (
          <Link
            to={`/recipedetails/${recipe.recipe.label}`} //link to that recipe detail
            key={recipe.recipe.label}
            style={{ textDecoration: "none" }}
            onClick={flyMeToTheTop} //RocketMan
          >
            <Card
              title={recipe.recipe.label}
              image={recipe.recipe.image}
              calories={recipe.recipe.calories}
              servingCount={recipe.recipe.yield} //heart of the cards
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarRecipesSidebar;
