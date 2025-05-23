// Define import statements here
import { Chip, Card, Box } from "@mui/material";
import cardDummyImage from "../../assets/dummy_card/cardDummyImage.png"
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


//setup some dummy data for card
const cardDummyData = {
    image : cardDummyImage,
    follows : '100+ follows',
    title : 'New English Songs'
}

// define card component here
// use Chip from MUI for the follow detail
export default function AlbumCard({data}){

    // to handle no data scenario
    if (!data){
        return false
    }

    return (
        <>
            <Card sx={{ 
            // minWidth: 159,
            // width : "100%",
            borderRadius : "10px" }}>
            <CardMedia
                sx={{ height: 100 }}
                image={data.image}
                title={data.title}
            />
            <CardActions>
                <Chip label={`${data.follows} follows`} sx={{
                    backgroundColor : '#121212',
                    color : '#ffffff',            
                }} />
            </CardActions>
            </Card>
            <Typography sx={{color : "#ffffff", textAlign : "left"}} >{data.title}</Typography>
        </>
        
    
  );
}