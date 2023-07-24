import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function Rover(props) {
  const { roverName, maxSol } = useParams();
  const [photos, setPhotos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    fetchPhotos(formatDate(selectedDate));
  }, [roverName, selectedDate]);

  const fetchPhotos = (date) => {
    axios
      .get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos`, {
        params: {
          "api_key": 'hcyEjVrAYx8f7lqgjTgJ65HL3wdQgPew7zaTabHD',
          "earth_date": date
        },
      })
      .then((res) => {
        setPhotos(res.data.photos);
      })
      .catch((error) => {
        console.error('Error fetching photos:', error);
        setPhotos([]);
      });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
<div className="date-picker-block">
  <h3>Select date:</h3>
<DatePicker selected={selectedDate} onChange={handleDateChange} className="date-picker" />
</div>
      <Grid container spacing={4}>
        {photos.length > 0 ? (
          photos.map((photo) => (
            <Grid item key={photo.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="div"
                  sx={{
                    pt: '56.25%',
                  }}
                  image={photo.img_src}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h7">
                    {photo.earth_date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <div className="banner">
          <h2 className="note">Rover "{roverName}" haven't made any photos on {formatDate(selectedDate)}.</h2>
          </div>
        )}
      </Grid>
    </Container>
  );
}
