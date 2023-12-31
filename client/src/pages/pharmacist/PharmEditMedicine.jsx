// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AppBar } from "@mui/material";
import { Alert } from "@mui/material";
import ResponsiveAppBar from "../../components/TopBarPharm";
import { useNavigate } from "react-router-dom";
function PharmEditMedicine() {
  const [description, setDescription] = useState();
  const [ingredients, setIngredients] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const navigate = useNavigate();
  const { id } = useParams();
  const isFormValid = description && ingredients && ingredients && quantity ;
  const handleSubmit = (e) => {
    e.preventDefault();
    try{
    const apiUrl = `http://localhost:9000/medicine/${id}`;
    axios
      .put(apiUrl, {
        description,
        ingredients,
        price,
        quantity,
      })
      setShowAlert(true);
          setAlertSeverity("success");
          setAlertMessage("Medicine updated Successfully");
          setTimeout(() => {
            setShowAlert(false);
            setAlertMessage("");
          }, 9000);
        } catch (error) {
          setShowAlert(true);
          
        
          
                setTimeout(() => {
                  setShowAlert(false);
                  setAlertSeverity("");
                  setAlertMessage("");
                }, 9000);
              }
            
            };
          
  
  const handleHome = () => {
    navigate("/medicinesListPharmacist");
  };
  return (
    <div className="d-flex justify-content-center align-itelms-center vh-100 bg-light">
      <AppBar
        style={{
          height: "100%",
          backgroundColor: "#F0F0F0",
          overflowY: "auto",
        }}
      >
        <ResponsiveAppBar />

        <div className="card m-3 col-12" style={{ width: "95%" }}>
          <div className="card-header">
            <h2>Edit Medicine</h2>
          </div>
          {showAlert && (
         <Alert
         style={{
           marginTop: "2%",
           fontSize: "18px",
           backgroundColor:alertSeverity === "success" ? "RGB(50, 205, 50)" : "red",
           width: "70%",
           marginLeft: "15%",
           textAlign: "center",
         }}
         variant="filled"
         onClose={() => {
            setShowAlert(false);
            setAlertSeverity("");
            setAlertMessage("");
         }}
            dismissible
          >
         {alertMessage}
          </Alert>
        )}
          <div className="card-body">
            <form action="" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="details">
                  <strong>Details (Active ingredients)</strong>
                </label>
                <input
                  type="text"
                  placeholder="Enter details"
                  autoComplete="off"
                  name="details"
                  className="form-control rounded-0"
                  onChange={(e) => setIngredients(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description">
                  <strong>Description</strong>
                </label>
                <input
                  type="text"
                  placeholder="Enter description"
                  autoComplete="off"
                  name="description"
                  className="form-control rounded-0"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="price">
                  <strong>price</strong>
                </label>
                <input
                  type="number"
                  placeholder="Enter price"
                  autoComplete="off"
                  name="price"
                  min="0"
                  className="form-control rounded-0"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="quantity">
                  <strong>quantity</strong>
                </label>
                <input
                  type="number"
                  placeholder="Enter price"
                  autoComplete="off"
                  name="price"
                  className="form-control rounded-0"
                  min="0"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <button type="submit"  className="btn btn-primary rounded-2"     disabled={!isFormValid}>
            
                Update
              </button>
            </form>
            <button
            className="btn btn-primary rounded-2"
            style={{
              position: "fixed",
              bottom: "5%",
              right: "5%",
              width: "5%",
              height: "40px",
            }}
            onClick={handleHome}
          >
            Back
          </button>
          </div>
        </div>
      </AppBar>
    </div>
  );
}

export default PharmEditMedicine;
