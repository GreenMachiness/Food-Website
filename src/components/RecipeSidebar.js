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

  // Get the ingredients of the selected recipe
  const selectedIngredients = selectedRecipe.recipe.ingredientLines;

 
  const similarRecipes = data.filter((recipe) => {//filter recipes if they have one or more ingredients 
    const commonIngredients = recipe.recipe.ingredientLines.some((ingredient) =>
      selectedIngredients.includes(ingredient)
    );
    return (
      commonIngredients && recipe.recipe.label !== selectedRecipe.recipe.label
    );
  });

  return (
    <div className="similar-recipes-sidebar">
      <h3>Similar Recipes</h3>
      <div className="similar-recipes-container">
        {similarRecipes.map((recipe) => (
          <Link
            to={`/recipedetails/${recipe.recipe.label}`}
            key={recipe.recipe.label}
            style={{ textDecoration: "none" }}
            onClick={flyMeToTheTop} 

          >
            <Card
              title={recipe.recipe.label}
              image={recipe.recipe.image}
              calories={recipe.recipe.calories}
              servingCount={recipe.recipe.yield}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarRecipesSidebar;
