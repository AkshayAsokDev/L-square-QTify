import { Box } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { useState } from "react";
import Hero from "../Hero/Hero";

function Home() { 

    //declare state variables here 
    const [searchData, setSearchData] = useState("");

    // return the view of Home
    return <div>
        <Box>
            <Navbar searchData={searchData}/>
        </Box>
        <Hero />
    </div>

}

export default Home;