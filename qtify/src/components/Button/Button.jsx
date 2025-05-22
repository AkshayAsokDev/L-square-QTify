import { Button } from "@mui/material";
import styles from "../Button/Button.module.css"

const CreateButton = ({text, styleName}) => {

    return <Button sx={{
        backgroundColor : '#121212',
        color : '#34C94B'
    }} >{text}</Button>
}

export default CreateButton;