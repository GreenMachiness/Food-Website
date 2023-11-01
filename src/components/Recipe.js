import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "./Card";
import Grid from "@mui/material/Grid";
import SearchAppBar from "./SearchAppBar";
import Sidebar from "./Sidebar";
import { Button } from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";

function Recipe(props) {
  const { data, error } = props;

  const [searchQuery, setSearchQuery] = useState(""); // state where searchquery is rendered
  const [selectedFilters, setSelectedFilters] = useState([]); //state when checkboxes of allergens are checked
  const [noAllergens, setNoAllergens] = useState(false); //default state with no checked boxes
  const [randomRecipes, setRandomRecipes] = useState([]); // State for storing random recipes

  useEffect(() => {
    setNoAllergens(false);
  }, [selectedFilters]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
  };

  const generateRandomRecipes = () => {
    // need function to generate my random list of recipes

    const shuffledData = [...data]; //gets a copy of the data from API

    const filteredData = shuffledData.filter((recipe) => {
      //If any allergen checkbox are checked, it will take into consideration and filters through the data

      return (
        selectedFilters.length === 0 || //if there is no allergens checkbox are checked, it will render the list of recipes, Default state
        selectedFilters.every(
          (
            filter // OR if there is any allergen checkbox checked, it will filter through if they have that healthlabel.
          ) => recipe.recipe.healthLabels.includes(filter)
        )
      );
    });

    for (let i = filteredData.length - 1; i > 0; i--) {
      //need to loopy the loop the data
      const r = Math.floor(Math.random() * (i + 1)); //math.floor rounds to whole number, math.random is gives a random number
      [filteredData[i], filteredData[r]] = [filteredData[r], filteredData[i]]; // i  and r has values of numbers where it shuffles into the list of recipes, making each recipe to have an equal chance of getting into the shuffledData(and not get salads all the time, copied from stackoverflow.)
    }

    const subsetSize = 10; // Define the number of recipes to generate
    const randomSubset = filteredData.slice(0, subsetSize); // Take the first subsetSize recipes from filteredData
    setRandomRecipes(randomSubset); // Set the state with the generated random recipes
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (data.length === 0) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop> //this is useless
    );
  }

  const filteredRecipes = data.filter((recipe) => {
    const searchMatch =
      recipe.recipe.label.toLowerCase().includes(searchQuery.toLowerCase()) || //search by recipe name
      recipe.recipe.ingredientLines.some(
        (
          ingredient //OR search by ingredient
        ) => ingredient.toLowerCase().includes(searchQuery.toLowerCase()) //inputs will become lowercase in searchquery
      );

    const filtersMatch =
      noAllergens || // default to no allergens with no checkbox checked
      (selectedFilters.length === 0
        ? true // if there are no checkboxes checked, it will result in true
        : selectedFilters.every((filter) =>
            recipe.recipe.healthLabels.includes(filter)//if there are checkboxes being checked, it would check if the recipes are satisfying the health labels and search querys
          ));

    return searchMatch && filtersMatch;//needs to match both searchquery and fiilters to get correct list of recipes
  });

  return (
    <div>
      <SearchAppBar onSearch={handleSearch} recipes={data} />
      <Grid container>
        <Grid item xs={12}>
          <br></br>
          <br></br>
          <br></br>
          <Sidebar
            onFilterChange={handleFilterChange}//handlefiltter change from sidebnar component
            healthLabels={Array.from(
              new Set(data.map((item) => item.recipe.healthLabels).flat()) //got the health label/allergens from data, make it into one array with.flat, Set removes duplicated healthlabels from the array. array.from makes it an array again(copied from stackoverflow, dont hate me)
            )}
            noAllergens={noAllergens}//default state/no checkboxes are checked
            setNoAllergens={setNoAllergens}//set state to default
          />
          <br></br>
          <Grid container justifyContent="center">
            <Button
              variant="contained"//button for generating random recipe
              onClick={generateRandomRecipes}
              color="primary"
            >
              Feeling Lucky? <FastfoodIcon sx={{ marginLeft: "10px" }} />
            </Button>
          </Grid>
          <br></br>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="flex-start"
            rowSpacing={4}
            columnSpacing={2}
          >
            {randomRecipes.length > 0
              ? randomRecipes.map((recipe, index) => (
                  <Grid item xs={6} sm={5} md={4} lg={3} xl={2} key={index}>
                    <Card
                      title={recipe.recipe.label}
                      image={recipe.recipe.image}
                      calories={recipe.recipe.calories}
                      servingCount={recipe.recipe.yield}
                    />
                  </Grid>
                ))
              : filteredRecipes.map((recipe, index) => (
                  <Grid item xs={6} sm={5} md={4} lg={3} xl={2} key={index}>
                    <Card
                      title={recipe.recipe.label}
                      image={recipe.recipe.image}
                      calories={recipe.recipe.calories}
                      servingCount={recipe.recipe.yield}
                    />
                  </Grid>
                ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Recipe;
