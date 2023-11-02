import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';


function Bookmarks(props) {
  const { data, error } = props; //passs propssss
  const [bookmarkedLabels, setBookmarkedLabels] = useState([]);//state hooksss

  const fetchBookmarks = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];//get bookmarks from local storage
    setBookmarkedLabels(bookmarks);//set them as bookmarks
  };

  useEffect(() => {
    fetchBookmarks();//render the bookmarked labels
  }, []);

  const clearBookmarks = () => {
    localStorage.removeItem("bookmarks");//remove bookmarks function, cuz why not
    setBookmarkedLabels([]);//turns the local storage empty and lonely
  };

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      {bookmarkedLabels.length > 0 && <h2>Bookmarked Labels 😋</h2>}
      {bookmarkedLabels.length === 0 ? (
        <h2>No Bookmarks Found. 😔  </h2>

      ) : (
        <ul>
          {bookmarkedLabels.map((label, index) => (
            <li key={index}>{label}</li>
          ))}
        </ul>
      )}
            <Button variant="contained" color= 'secondary' startIcon={<DeleteIcon />} onClick={clearBookmarks}>
              Clear Bookmarks
              </Button>

    </div>
  );
}

export default Bookmarks;
