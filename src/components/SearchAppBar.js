import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import Drawer from "@mui/material/Drawer";
import Checkbox from "@mui/material/Checkbox";
import { ListItemText } from "@mui/material";
import List from "@mui/material";
import ListItem from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar({ onSearch, data }) {// pass props
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [checked, setChecked] = React.useState(true);//use state hooks
    console.log('healthlabel: ', data)
  const handleChange = (event) => {//checkbox handlechange
    setChecked(event.target.checked);
  };

  const openDrawer = () => {//drawer open
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {//drawer close
    setIsDrawerOpen(false);
  };

  const handleSearch = () => {//searchbar searchquery
    onSearch(searchQuery);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={openDrawer}//drawer button
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={isDrawerOpen} onClose={closeDrawer}>
            <div>
              <Checkbox checked={checked} onChange={handleChange} />
              <Typography variant="body1">Item </Typography>
              <Checkbox checked={checked} onChange={handleChange} />
              <Typography variant="body1">Item </Typography>
              
            </div>
          </Drawer>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link to={".."}>
              <IconButton>
                <HomeIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </Link>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}//input ingredient/recipe
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}//after input it re-renders the recipe.js to only recipes that was inputted on search bar
              onKeyPress={(e) => {
                if (e.key === "Enter") {//anyone not over 80 will most likely press
                  handleSearch();
                }
              }}
            />
          </Search>
          </Toolbar>
      </AppBar>
    </Box>
  );
}
