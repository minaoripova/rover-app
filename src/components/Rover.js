import { Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export function Rover(props){
    const {roverName, maxSol} = useParams();
    const [photos, setPhotos] = useState([]);
    const today = new Date();
    useEffect(() => {
        axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos`, {
            params: {
                "api_key": 'hcyEjVrAYx8f7lqgjTgJ65HL3wdQgPew7zaTabHD',
                "earth_date": `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
            }
        })
      .then(res => {
        setPhotos(() => res.data.photos)
      });
    },[roverName])

    return (
        <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>

          {photos.length && photos.map((photo) => (
            <Grid item key={photo.id} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
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
          ))}

          {!photos.length &&  <h2>{roverName} have not made any photos for today</h2>}
        </Grid>
      </Container>
    )
}