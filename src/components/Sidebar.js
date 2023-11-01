import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Paper from "@mui/material/Paper";

function Sidebar({ healthLabels, onFilterChange }) {
  //pass props from app.js
  const [selectedFilters, setSelectedFilters] = useState([]); //state hooks

  const handleFilterChange = (label) => {
    if (selectedFilters.includes(label)) {
      setSelectedFilters(
        (prevFilters) => prevFilters.filter((filter) => filter !== label) //function that will make state change depending on checkbox
      );
    } else 
    {
      setSelectedFilters((prevFilters) => [...prevFilters, label]); //  if unchecking a box it will crash app.
    }
  };

  useEffect(() => {
    onFilterChange(selectedFilters);
  }, [selectedFilters, onFilterChange]); //useeffect will change the rendering on recipe.js

  return (
    
    <Paper sx={{ padding: 2 }}>
      <FormGroup>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {healthLabels.map(
            (
              label // .map through health labels and get each label
            ) => (
              <FormControlLabel
                key={label}
                control={
                  <Checkbox
                    checked={selectedFilters.includes(label)} // this will render the labels with checkboxes
                    onChange={() => handleFilterChange(label)}
                  />
                }
                label={label}
              />
            )
          )}
        </div>
      </FormGroup>
    </Paper> //material UI is great
  );
}

export default Sidebar;
