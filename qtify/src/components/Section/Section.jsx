import { Box, Grid, Stack, Typography, Button } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import AlbumCard from "../Card/Card";
import Carousel from "../Carousel/Carousel";


// Creating the album section based on api data 
// required parameters : url
// renders the album onto the page
// const url = "https://qtify-backend-labs.crio.do/albums/top"
function Section({sectionName, url, isSong=false}) {

    // create state variable to 
    // 1. track state of showAll and render showAll/Collapse accordingly
    // 2. maintain api data 
    const [showAll, setShowAll] = useState(false);
    const albumList = useRef([]);
    const [visibleItems, setVisibleItems] = useState([]);
    const itemsPerRow = useRef(8);
    const albumRow = useRef([]);


    // useEffect to fetch the apidata
    useEffect(() => {
        const fetchData = async () => {
            
            try{
                const response = await axios.get(url);
                albumList.current = response.data;

                albumRow.current = response.data.slice(0, itemsPerRow.current);
                setVisibleItems(albumList.current);
                
            } catch(e) {
                if (e.response) {
                    console.log("e.response.message");
                }
            }
            
        }
        fetchData();
    }, []);

    // useEffect to update the visible items based on showAll boolean change
    // useEffect(() => {
        
    //     // console.log("showAll : ", showAll);
    //     // console.log("albumList : ", albumList.current);

    //     // if showAll is false, set visible items to only the count of itemsPerRow
    //     if (!showAll){
    //         setVisibleItems(albumRow.current);
    //     }
    //     else {
    //         // if showAll is true, set visible items to all the items
    //         setVisibleItems(albumList.current);
    //     }

    //     // console.log("visibleItems >>", visibleItems);
        


    // }, [showAll]);




    // render section using AlbumCard and Grid
    return (<Box sx={{ 
        backgroundColor : '#121212',
        padding : '5px 15px 5px 15px',
        position : "relative"
        }}>
        <Stack direction="row" justifyContent="space-between">
            <Typography 
                variant="h6"
                sx={{ color : '#ffffff'}}
            >{sectionName}</Typography>

            {showAll ? (<Button 
            onClick={() => {
                setShowAll(false);
            }}
            sx={{ color : '#34C94B', textTransform : 'none'}} >Collapse</Button>) 
            : (<Button 
                onClick={() => {
                setShowAll(true);
                }}
                sx={{ color : '#34C94B', textTransform : 'none'}}>Show all</Button>)}
            {/* <Button sx={{ color : '#34C94B', textTransform : 'none'}}>Show all</Button> */}
            
        </Stack>
        
        {/* Show swiper view when state var showAll===false */}
        {showAll || (
            <Carousel items={visibleItems} />
        )}

        {/* Show all view when var showAll===true */}
        {showAll && (<Grid container spacing={2}>
            {/* Write a map function over the albumList to create the grids */}
            {(visibleItems.length > 0) && ((visibleItems.map((album) => {
                // console.log("album >>", album);
                return <Grid 
                    size={{md:1.5}} 
                    padding="6px 0px 6px 0px"
                    key={album.id}
                >
                    <AlbumCard data={album} />
                </Grid>
            }))) }
            {}
        </Grid>)}
        

    </Box>)
}

export default Section;