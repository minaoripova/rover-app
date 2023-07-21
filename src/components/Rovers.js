import { Card, CardActions, CardContent, CardMedia, Container, Grid, Typography, Button} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Rovers() {
    const navigate = useNavigate();
    // make api call here to get information about each rover (number of sol etc)
    const [rovers, setRovers] = useState([]);
    const [selectedRover, setSelectedRover] = useState(null);
    const [dateOfPhotos, setDateOfPhotos] = useState(null);
    const [apiError, setApiError] = useState();
  
    useEffect(() => {
      axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers`, {
          params: {
              "api_key": 'hcyEjVrAYx8f7lqgjTgJ65HL3wdQgPew7zaTabHD'
          }
      })
    .then(res => {
      setRovers(() => res.data.rovers)
    })
    .catch(error => {
      console.log(error.response.data.error);
      setApiError(error);
   });;
  },[])

  console.log('rovers', rovers)

  const handleViewRover = (roverName) => {
    navigate(`/rover/${roverName}`)
  }

  return (
    <>
       <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {rovers.map((rover) => (
              <Grid item key={rover.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {rover.name}
                    </Typography>
                    <ul>
                      <li>Number of cameras: {rover.cameras.length}</li>
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleViewRover(rover.name.toLowerCase())}>View</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
    </>
  );
}
