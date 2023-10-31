import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function RecipeDetails(props) {
  const { data } = props;
  const { label } = useParams();
  console.log("data:", data);

  // Find the selected recipe based on the label
  const selectedRecipe = data.find((recipe) => recipe.recipe.label === label);

  if (!selectedRecipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div>
      <h1>Recipe Details for: {label}</h1>
      <p>
        <h2>Calories:</h2> {selectedRecipe.recipe.calories} kcal
      </p>
      <p>
        <h2>Servings:</h2> {selectedRecipe.recipe.yield}
      </p>
      <p>
        <img
          src={selectedRecipe.recipe.image}
          alt={selectedRecipe.recipe.label}
        />
      </p>
      <p>
        <h2>Allergens:</h2>
        <ul>
          {selectedRecipe.recipe.healthLabels.map((allergen, index) => (
            <li key={index}>{allergen}</li>
          ))}
        </ul>
      </p>
      <h2>Ingredients:</h2>
      <ul>
        {selectedRecipe.recipe.ingredientLines.map(
          // map through the ingredients array again
          (ingredient, index) => (
            <li key={index}>{ingredient}</li>
          )
        )}
      </ul>

      <p>
        <h2>
          <a
            href={selectedRecipe.recipe.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instructions
          </a>
        </h2>
      </p>

      <Link to={".."}>Back</Link>
    </div>
  );
}

export default RecipeDetails;
