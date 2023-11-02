import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchAppBar from "./SearchAppBar";
import ShareIcon from "@mui/icons-material/Share";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import SimilarRecipesSidebar from "./RecipeSidebar"; 


function RecipeDetails(props) {
  const { data } = props;
  const { label } = useParams();
  console.log("data:", data);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(data);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setFilteredRecipes(data);
  }, [data]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = data.filter((recipe) =>
      recipe.recipe.label.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  const selectedRecipe = data.find((recipe) => recipe.recipe.label === label);

  if (!selectedRecipe) {
    return <div>Recipe not found</div>;
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div>
      <SearchAppBar onSearch={handleSearch} recipes={data} />
      <br></br>
      <br></br>
      <h1>{label}</h1>
      <p>
        <h2>Calories:</h2> <h3>{selectedRecipe.recipe.calories} kcal</h3>
      </p>
      <p>
        <h2>Servings:</h2> <h3>{selectedRecipe.recipe.yield}</h3>
      </p>
      <p>
        <img
          src={selectedRecipe.recipe.image}
          alt={selectedRecipe.recipe.label}
        />
      </p>
            <div
        onClick={() => {
          const tempInput = document.createElement("input"); //makes an input through this code
          tempInput.value = selectedRecipe.recipe.url; //makes the URL the value of tempinput
          document.body.appendChild(tempInput); //makes tempInout a child
          tempInput.select(); //selecting the value of tempInput
          document.execCommand("copy"); //executes command of copying to clipboard
          document.body.removeChild(tempInput); //remove the URL after its done copying it to clipboard
          setSnackbarOpen(true); //snackbar MUI component to have notification of it being copied to clipboard for the user
        }}
        style={{ cursor: "pointer" }}
      >
        <Button variant="contained" size="small" >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
            }}
          >
            <ShareIcon sx={{ fontSize: 20 }} />
            <span style={{ fontSize: 14 }}>Share</span>
          </div>
        </Button>
      </div>
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
        {selectedRecipe.recipe.ingredientLines.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Recipe URL copied to clipboard!
        </MuiAlert>
      </Snackbar>
      <SimilarRecipesSidebar selectedRecipe={selectedRecipe} data={data} />

    </div>
  );
}

export default RecipeDetails;
