import { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import "../../App.css";
import ResponsiveAppBar from "../../components/TopBarPharm";
import { useNavigate } from "react-router-dom";

function ChangePassPharm() {
  const navigate = useNavigate();

  {
    const [password, setPass] = useState();
    const [password1, setPass1] = useState();
    const change = useRef(null);
    const change2 = useRef(null);

    const handleHome = () => {
      navigate("/HomePagePharm");
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(password + " " + password1);
      if (
        password !== password1 ||
        password === password.toLowerCase() ||
        password.length < 8
      ) {
        change.current.style.display = "block";
        change2.current.style.display = "none";
      } else {
        change.current.style.display = "none";

        //  console.log(email);
        const token = JSON.parse(sessionStorage.getItem("token"));
        console.log(token);
        axios
          .post(
            " http://localhost:9000/admin/chanePass",
            {
              password: password,
            },
            {
              headers: {
                Authorization: `Barer ${token}`,
              },
            }
          )
          .then((result) => {
            if (result.status === 200) {
              change2.current.style.display = "block";
            }
          })
          .catch((err) => console.log(err));
      }
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
          <div style={{ display: "inline-flex" }}>
            <div
              className="card m-3 col-12"
              style={{
                width: "80%",
                borderRadius: "20px",
                left: "8%",
                display: "flex",
              }}
            >
              <h2>Change My Password</h2>

              <div ref={change2} style={{ display: "none" }}>
                <div
                  style={{ height: "50px" }}
                  class="alert alert-primary d-flex align-items-center"
                  role="alert"
                >
                  <svg
                    class="bi flex-shrink-0 me-2"
                    role="img"
                    aria-label="Info:"
                  >
                    <use xlink: href="#info-fill" />
                  </svg>
                  <div>New Password is successfully saved!</div>
                </div>
              </div>

              <div ref={change} style={{ display: "none" }}>
                <div
                  style={{ height: "50px" }}
                  class="alert alert-danger d-flex align-items-center"
                  role="alert"
                >
                  <svg
                    class="bi flex-shrink-0 me-2"
                    role="img"
                    aria-label="Danger:"
                  >
                    <use xlink: href="#exclamation-triangle-fill" />
                  </svg>
                  <div>Password not match or incorrect format</div>
                </div>
              </div>
              <form>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Password
                  </label>
                  <input
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Confirm Password
                  </label>
                  <input
                    onChange={(e) => setPass1(e.target.value)}
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                  />
                  <div class="form-text">Must be as the upper password.</div>
                </div>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  class="btn btn-primary"
                >
                  Submit
                </button>
              </form>
            </div>
            <button className="btn btn-primary rounded-2"
              style={{
                position: 'fixed',
                bottom: '5%',
                right: '5%',
                width: '5%',
                height: '40px',
              }}

              onClick={handleHome}
            >
              Back
            </button>
          </div>
        </AppBar>
      </div>
    );
  }
}

export default ChangePassPharm;
