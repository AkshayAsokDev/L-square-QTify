import { Box } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { useState } from "react";
import Hero from "../Hero/Hero";
import AlbumCard from "../Card/Card";
import Section from "../Section/Section";

function Home() { 

    //declare state variables here 
    const [searchData, setSearchData] = useState("");

    // return the view of Home
    return <div>
        {/* Navbar and Hero section */}
        <Box>
            <Navbar searchData={searchData}/>
            <Hero />
        </Box>

        {/* Album Card displays
            1. Render initial card using dummy data
         */}
        <Box>
            <AlbumCard />
            <Section sectionName="Top Albums" url="https://qtify-backend-labs.crio.do/albums/top" />
            <Section sectionName="New Albums" url="https://qtify-backend-labs.crio.do/albums/new" />
        </Box>
            
        
    </div>

}

export default Home;