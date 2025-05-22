import { createTheme } from '@mui/material/styles';

// create main theme 
// needs update once other elements are placed
const theme = createTheme({
    palette : {
        primary : {
            main : "#34C94B",
        },
        
    },
    typography : {
        fontFamily : "Poppins"
    },
    
})

export default theme;