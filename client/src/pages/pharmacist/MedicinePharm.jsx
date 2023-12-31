import AppBar from "@mui/material/AppBar";
import "../../App.css";
import Stack from "@mui/material/Stack";
import ResponsiveAppBar from "../../components/TopBarPharm";
import FilterList from "../../components/FilterList";
import MedicineCard from "../../components/MedicineCard";
import Pagination from "@mui/material/Pagination";
import img1 from "../../pictures/med1.jpeg";
import img2 from "../../pictures/mor.png";
import img3 from "../../pictures/asp.jpg";
import BottomBar from "../../components/BottomBar";

const name = [
  "Panadol",
  "Morphine",
  "Aspirin",
  "Insulin",
  "Concerta",
  "Tramadol",
];
const info =
  "Paracetamol is a non-opioid analgesic and antipyretic agent used to treat fever and mild to moderate pain.";
const ingred = ["abc", "efg", "dbudhuh"];
const use = ["Dont Know", "Ay haga", "Wla Haga"];

function listMedicinepharm() {
  return (
    <div style={{ marginRight: "-5%", marginLeft: "-5%" }}>
      <AppBar
        style={{
          height: "100%",
          backgroundColor: "#F0F0F0",
          overflowY: "auto",
        }}
      >
        <ResponsiveAppBar />

        <FilterList />
        <div
          style={{
            backgroundColor: "",
            marginLeft: "25%",
            marginTop: "-62%",
            flexWrap: "nowrap",
          }}
        >
          <MedicineCard
            name={name[0]}
            image={img1}
            info={info}
            ingred={ingred[0]}
            use={use[0]}
          />
          <MedicineCard
            name={name[1]}
            image={img2}
            info={info}
            ingred={ingred[1]}
            use={use[1]}
          />
          <MedicineCard
            name={name[2]}
            image={img3}
            info={info}
            ingred={ingred[2]}
            use={use[2]}
          />
        </div>

        <Stack
          spacing={2}
          style={{ marginLeft: "50%", marginTop: "2%", marginBottom: "-2%" }}
        >
          <Pagination
            count={10}
            color="primary"
            size="large"
            style={{ color: "blue" }}
          />
        </Stack>
        <BottomBar />
      </AppBar>
    </div>
  );
}
export default listMedicinepharm;
