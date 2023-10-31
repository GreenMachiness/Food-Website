import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "./Card";
import Grid from "@mui/material/Grid";
import SearchAppBar from "./SearchAppBar";


function Recipe(props) {
  const { data, error } = props;

  const [searchQuery, setSearchQuery] = useState(""); // set state for search query and filtered recipes
  const [filteredRecipes, setFilteredRecipes] = useState(data);

  useEffect(() => {
    setFilteredRecipes(data); // starts filtered recipes with data
  }, [data]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = data.filter((recipe) =>
      recipe.recipe.label.toLowerCase().includes(query.toLowerCase()) ||
      recipe.recipe.ingredientLines.some((ingredient) =>
        ingredient.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredRecipes(filtered);
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
      </Backdrop>
    );
  }

  return (
    <div>
      <SearchAppBar onSearch={handleSearch} recipes={data} />
      <br></br>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
        rowSpacing={4}
        columnSpacing={1}
      >
        {filteredRecipes.map((recipe, index) => (
          <Grid item xs={12} sm={9} md={6} lg={3} xl={1} key={index}>
            <Card
              title={recipe.recipe.label}
              image={recipe.recipe.image}
              calories={recipe.recipe.calories}
              servingCount={recipe.recipe.yield}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Recipe;
