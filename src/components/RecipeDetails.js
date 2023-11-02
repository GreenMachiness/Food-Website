import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchAppBar from "./SearchAppBar";
import ShareIcon from "@mui/icons-material/Share";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import SimilarRecipesSidebar from "./RecipeSidebar";
import ViewedRecipe from "./ViewedRecipe";


function RecipeDetails(props) {
  const { data } = props;
  const { label } = useParams();

  console.log("data:", data);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(data);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);//use statesssss

  useEffect(() => {
    setFilteredRecipes(data);
  }, [data]);

  useEffect(() => {
    // Check if the current recipe is bookmarked when the component loads
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];//checks if it is in localstorage on bookmarks
    setIsBookmarked(bookmarks.includes(label));//if the label has the same name, .includes 
  }, [label]);

  useEffect(() => {
    addViewedRecipe(label);
  }, [label]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = data.filter((recipe) =>
      recipe.recipe.label.toLowerCase().includes(query.toLowerCase())// added searchquery function on recipedetails but would not re-render
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
  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    if (!isBookmarked) {//true or false
  
      bookmarks.push(label);//if true .push into the localstorage
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));//makes stored label into string in localstorage in bookmark
    } else {
      const index = bookmarks.indexOf(label);// if false, 
      if (index > -1) {// the label is found in localstorage
        bookmarks.splice(index, 1);//button will remove the label instead from local storage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));//mremoves the label from localstorage
      }
    }

    setIsBookmarked(!isBookmarked);//state hooooooks
  };
  const addViewedRecipe = (label) => {//need function to log my viewedrecipe in localstorage
    const viewedRecipes = JSON.parse(localStorage.getItem("viewedRecipes")) || [];//gets the viewedrecipes in localstorage and turns it into an object, OR an empty array if its not there 
    if (!viewedRecipes.includes(label)) {
      viewedRecipes.push(label);//if the label of the recipedetails does not have it on the viewedrecipe local storage, then it will push it in through
      localStorage.setItem("viewedRecipes", JSON.stringify(viewedRecipes));// then back into string to go back into localstorage
    }
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
        <Button variant="contained" size="small">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
            }}
          >
            <ShareIcon sx={{ fontSize: 20 }} />
            <span style={{ fontSize: 15 }}>Share</span>
          </div>
        </Button>
      </div>
      <br></br>
      <Button
        variant="contained"
        color={isBookmarked ? "secondary" : "primary"}
        onClick={handleBookmark}//depending on state, this would change the button from bookmark and remove from bookmarks
      >
        {isBookmarked ? "Remove from Bookmarks" : "Bookmark"}
      </Button>
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
