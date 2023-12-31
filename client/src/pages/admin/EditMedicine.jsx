// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditMedicine() {
  const [description, setDescription] = useState();
  const [ingredients, setIngredients] = useState();
  const [price, setPrice] = useState();

  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = `http://localhost:9000/medicine/${id}`;
    axios
      .put(apiUrl, {
        description,
        ingredients,
        price,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-itelms-center vh-100 bg-light">
      <SidebarPharmacist />
      <div className="card m-3 col-12" style={{ width: "80%" }}>
        <div className="card-header">
          <h2>Edit Medicine</h2>
        </div>
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
                className="form-control rounded-0"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditMedicine;
