import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchAppBar from "./SearchAppBar";
import React, { useState, useEffect } from "react";

function RecipeDetails(props) {
  const { data } = props;
  const { label } = useParams();
  console.log("data:", data);
  const [searchQuery, setSearchQuery] = useState(""); // set state for search query and filtered recipes
  const [filteredRecipes, setFilteredRecipes] = useState(data);

  useEffect(() => {
    setFilteredRecipes(data); // starts filtered recipes with data
  }, [data]);

  const handleSearch = (query) => {
    // handle the searchquery
    setSearchQuery(query);
    const filtered = data.filter(
      (recipe) =>
        recipe.recipe.label.toLowerCase().includes(query.toLowerCase()) //make it where it can do querys even with capital letters
    );
    setFilteredRecipes(filtered);
  };

  const selectedRecipe = data.find((recipe) => recipe.recipe.label === label); // .find the selected recipe based on the label

  if (!selectedRecipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div>
      <SearchAppBar onSearch={handleSearch} recipes={data} />
      <br></br>
      <br></br>
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
    </div>
  );
}

export default RecipeDetails;
