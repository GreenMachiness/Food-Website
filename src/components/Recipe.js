import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "./Card";
import Grid from "@mui/material/Grid";
import SearchAppBar from "./SearchAppBar";
import Sidebar from "./Sidebar";

function Recipe(props) {
  const { data, error } = props;//props

  const [searchQuery, setSearchQuery] = useState("");//searchquery for search bar
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [noAllergens, setNoAllergens] = useState(false);//usestate for no allergens

  useEffect(() => {
    setNoAllergens(false); // if no allergen checkboxes are checked, will only rely on the searchquery on app bar
  }, [selectedFilters]);

  const handleSearch = (query) => {//handles search event
    setSearchQuery(query);
  };

  const handleFilterChange = (filters) => {//handles filtered recipes with checkboxes
    setSelectedFilters(filters);
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
      </Backdrop>//this is useless
    );
  }

  
  const filteredRecipes = data.filter((recipe) => {
    const searchMatch =
      recipe.recipe.label.toLowerCase().includes(searchQuery.toLowerCase()) ||//search by recipe name
      recipe.recipe.ingredientLines.some((ingredient) =>//OR search by ingredient
        ingredient.toLowerCase().includes(searchQuery.toLowerCase())//inputs will become lowercase in searchquery
      );

    const filtersMatch =
      noAllergens || // default to no allergens with no checkbox checked
      (selectedFilters.length === 0//if there are no checkboxes checked, it will result in true
        ? true
        : selectedFilters.every((filter) =>//if there are checkboxes being checked, it would check if the recipes are satisfying the health labels and search querys
            recipe.recipe.healthLabels.includes(filter)
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
            onFilterChange={handleFilterChange} //handlefiltter change from sidebnar component
            healthLabels={Array.from(new Set(data.map((item) => item.recipe.healthLabels).flat()))}//got the health label/allergens from data, make it into one array with.flat, Set removes duplicated healthlabels from the array. array.from makes it an array again(copied from stackoverflow, dont hate me)
            noAllergens={noAllergens}//default state/no checkboxes are checked
            setNoAllergens={setNoAllergens}//set state to default
          />
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
            {filteredRecipes.map((recipe, index) => (
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
