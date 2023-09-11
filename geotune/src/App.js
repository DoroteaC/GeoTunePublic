import { React, useState } from "react";
import Map from "./components/Map";
import Login from "./components/Login/LogIn";
import Header from "./components/Header";
import { latLngToCell, cellToBoundary } from "h3-js";
import "./App.css";

function App() {
  // const zagrebLocations= useSelector((state) => state.locations.locationsZagreb[0])
  // const latitude = zagrebLocations.latitudeE7 / 10000000;
  // const longitude= zagrebLocations.longitudeE7 / 10000000;
  // const zagrebLocations1= useSelector((state) => state.locations.locationsZagreb[1])
  //   const latitude1 = zagrebLocations1.latitudeE7 / 10000000;
  //   const longitude1= zagrebLocations1.longitudeE7 / 10000000;
  const latitude = 45.16;
  const longitude = 16.65;
  const [loggedIn, setloggedIn] = useState(false);
  const [polygons, setPolygons] = useState([]);

  const onLogin = (e) => {
    e.preventDefault();
    const h3Index = latLngToCell(latitude, longitude, 10);
    const hexBoundary = cellToBoundary(h3Index);
    const polygon = hexBoundary;
    setPolygons([...polygons, polygon]);
    setloggedIn(true);
  };

  

  return (
    <div>
      <Header></Header>
      {loggedIn ? null : <Login onLogin={onLogin}></Login>}
      <Map className="z-0 absolute"></Map>
    </div>
  );
}

export default App;
