import logo from './logo.svg';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import React, { useState, useEffect } from "react"
import Recipe from './components/Recipe';
import { Routes, Route } from "react-router-dom"
import RecipeDetails from './components/RecipeDetails';




const theme = createTheme( {
  palette: {
    mode: 'light',
    primary: {
      main: '#6acc00',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
})


function App() {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  // console.log("data.hits: ", data.hits)
  // console.log("error: ", error)

  //** Component Logic
  useEffect(() => {
    fetch('https://api.edamam.com/api/recipes/v2')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to Fetch")
        }
        return response.json();
      })
      .then((body) => {
        console.log("output of fetch: ", body.hits)
        setData(body.hits);
      })
      .catch((error) => {
        setError(error.message)
      });
  }, []);
  return (
   
    <ThemeProvider theme={theme}>

      <CssBaseline />

    
      <Container maxWidth={'xl'}>
      <Routes> 
      <Route path="/" element={<Recipe data={data} error={error} />}/>
      <Route path="/recipedetails/:label" element={<RecipeDetails data={data} />} />


      </Routes>
      </Container>

    </ThemeProvider>

  );
}

export default App;
