import logo from './logo.svg';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import React, { useState, useEffect } from "react"
import Recipe from './components/Recipe';




const theme = createTheme( {
  palette: {
    mode: 'light',
    primary: {
      main: '#011c1e',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
})


function App() {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  console.log("data: ", data)
  console.log("error: ", error)

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
        console.log("output of fetch: ", body)
        setData(body);
      })
      .catch((error) => {
        setError(error.message)
      });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth={'xl'}>
      <Recipe data={data} error={error} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
