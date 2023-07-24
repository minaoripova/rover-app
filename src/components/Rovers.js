import { Card, CardActions, CardContent, CardMedia, Container, Grid, Typography, Button } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const roverImages = {
  curiosity: "https://mars.nasa.gov/system/feature_items/images/6037_msl_banner.jpg",
  opportunity: "https://upload.wikimedia.org/wikipedia/commons/d/d8/NASA_Mars_Rover.jpg",
  spirit: "https://solarsystem.nasa.gov/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdVk2IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ad10ef645eac447b914b6167d85f46c03a0d8daf/rover2-1.jpg",
  perseverance: "https://mars.nasa.gov/layout/mars2020/images/PIA23764-RoverNamePlateonMars-web.jpg",
};

export function Rovers() {
  const navigate = useNavigate();
  const [rovers, setRovers] = useState([]);
  const [apiError, setApiError] = useState();

  useEffect(() => {
    axios
      .get(`https://api.nasa.gov/mars-photos/api/v1/rovers`, {
        params: {
          api_key: "hcyEjVrAYx8f7lqgjTgJ65HL3wdQgPew7zaTabHD",
        },
      })
      .then((res) => {
        const roverPromises = res.data.rovers.map((rover) =>
          axios.get(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover.name}`, {
            params: {
              api_key: "hcyEjVrAYx8f7lqgjTgJ65HL3wdQgPew7zaTabHD",
            },
          })
        );

        Promise.all(roverPromises)
          .then((roverResponses) => {
            const updatedRovers = roverResponses.map((response, index) => ({
              ...res.data.rovers[index],
              image: roverImages[res.data.rovers[index].name.toLowerCase()], // Using hard-coded image URL
            }));
            setRovers(updatedRovers);
          })
          .catch((error) => {
            console.log(error.response.data.error);
            setApiError(error);
          });
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setApiError(error);
      });
  }, []);

  const handleViewRover = (roverName) => {
    navigate(`/rover/${roverName}`);
  };

  return (
    <>
      <Container sx={{ py: 8 }} maxWidth="md">
        <h2>Explore the rovers:</h2>
        <Grid container spacing={4}>
          {rovers.map((rover) => (
            <Grid item key={rover.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardMedia component="div" sx={{ pt: "56.25%" }} image={rover.image} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {rover.name}
                  </Typography>
                  <ul>
                    <li>Number of Cameras: {rover.cameras.length}</li>
                    <li>Launch Date: {rover.launch_date}</li>
                    <li>Landing Date: {rover.landing_date}</li>
                    <li>Total Photos: {rover.total_photos}</li>
                  </ul>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleViewRover(rover.name.toLowerCase())}>
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
