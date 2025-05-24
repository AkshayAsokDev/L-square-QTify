import { Box, Grid, Stack, Typography, Button } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import Carousel from "../Carousel/Carousel";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from "axios";

// Custom Tab panel
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



// songs component
function SongFilter({songsURL, genreURL}) {

    // State variable for tab value
    const [value, setValue] = useState(0);
    // State variable for genre and song selection
    const [visibleItems, setVisibleItems] = useState([]);
    const songList = useRef([]);
    const genreList = useRef([]);
    const [selectedGenre, setSelectedGenre] = useState("All");
    const [tabList, setTabList] = useState([])

    // Tab handle change
    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log("handleChange event >>", event.target.textContent);

        setSelectedGenre(event.target.textContent);
    };


    // useEffect to fetch the songs and genre details
    useEffect(() => {
        const fetchData = async () => {

            try {

                // Get all songs and update into albumList.current and visibleItems
                let response = await axios.get(songsURL);
                // console.log("song response >> ", response.data);
                songList.current=response.data;
                setVisibleItems(response.data);

                // Get all genre detail and update into genreList.current
                response = await axios.get(genreURL);
                // console.log("genre response >> ", response.data.data);
                genreList.current = response.data.data;
                setTabList(response.data.data)

            } catch(e) {
                if (e.response) {
                    console.log("e.response.message");
                }
            }
        }

        fetchData();
    }, [])

    // handle change of items based on tab change
    useEffect(() => {

        // if genre is set to all, set visibleItems to songList.current
        if (selectedGenre === "All" && visibleItems !== songList.current){
            setVisibleItems(songList.current)
            return
        }

        // if genre is set to other genre, then 
        // lowercase the text and filter from the total songs a/c to the value of genre
        // set resultant array to visible items
        const filterSongs = (songs, matchGenre) => {

            // run filter function to songs to filter according to genre
            const res = songs.filter((song) => song.genre.label === matchGenre);
            console.log(`for genre ${matchGenre}: songs are >>`, res.length, res);

            return res
        };
        const data = filterSongs(songList.current, selectedGenre);
        setVisibleItems(data);


    }, [selectedGenre])

    return (
        <Box sx={{ 
        backgroundColor : '#121212',
        padding : '5px 15px 5px 15px',
        position : "relative"
        }}>
        
            <Typography 
                variant="h6"
                sx={{ color : '#ffffff', textAlign : "left"}}
            >Songs</Typography>

            {/* Set up Tabs */}
            <Box sx={{ width: '100%' }}>
                
                <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab sx={{color:"#ffff", '&.Mui-selected': { color: 'white' }}} label="All" {...a11yProps(0)} />
                        {tabList.length>0 && (tabList.map((genre, index) => {
                            let idx = index+1;
                            return <Tab key={genre.key} sx={{color:"#ffff", '&.Mui-selected': { color: 'white' }}} label={genre.label} {...a11yProps({idx})} />
                        }))}
                    </Tabs>
                </Box>
                
                <CustomTabPanel value={value} index={0}>
                    {visibleItems.length>0 && (<Carousel items={visibleItems}/>)}
                </CustomTabPanel>

                {tabList.length>0 && (tabList.map((genre, index) => {
                    let idx = index+1;
                    let key = `tab-${idx}`;
                    return (<CustomTabPanel key={key} value={value} index={idx}>
                    ({visibleItems.length>0 && (<Carousel items={visibleItems}/>)})
                </CustomTabPanel>)
                }))}
            </Box>

        </Box>
    )
}

export default SongFilter;