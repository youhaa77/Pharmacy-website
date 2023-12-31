import "../App.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { config } from "../config/config";
import axios from "axios";


function PrescriptionCard(props) {

    const handleAddMedicine = () => {
    };

    return (
        <Card sx={{ marginLeft: "5%", width: '80%', borderRadius: '50px', marginTop: '5%' }}>

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Doctor Name:
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Status:
                </Typography>
                <br />
                <Typography variant="body2" color="text.secondary">
                    Date:
                </Typography>
                <br />
                <Typography variant="body2" color="text.secondary">
                    price: {props.price}
                </Typography>
                <br />
                <Typography variant="body2" color="text.secondary">
                    Medicine: {props.price}
                </Typography>
            </CardContent>
            <CardActions>

                <Button
                    style={{ marginLeft: "40%", backgroundColor: 'DarkGreen', color: 'white', borderRadius: '10px', height: '50px' }}
                    size="small"
                    onClick={handleAddMedicine}
                >
                    {" "}
                    Add Medicnine To Cart <AddCircleIcon />
                </Button>
            </CardActions>
        </Card>
    );
}


export default PrescriptionCard;
