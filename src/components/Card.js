import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Details from './RecipeDetails';

export default function MediaCard(props) {
    const {title, image, calories, servingCount} = props
  return (
            <Link to={`/recipedetails/${title}`} style={{ textDecoration: 'none' }}> 
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 300 }}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h4" color="text">
        {title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
        Calories: {calories}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
        Serves: {servingCount}
        </Typography>



      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>

             <Button size="small">Learn More</Button>

          
      </CardActions> */}
    </Card>
    </Link>
  );
}