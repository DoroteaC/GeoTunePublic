import { React, useState, useEffect } from "react";
import { latLngToCell, gridDisk } from "h3-js";
import { useDispatch, useSelector } from "react-redux";
import { locationsActions } from "../Redux";

function ReadJSON() {
    const dispatch = useDispatch();
    const newLocations= useSelector((state) => state.locations.locationsZagreb);
  const [selectedYear, setselectedYear] = useState([]);
  const [locationZagreb, setlocationZagreb] = useState([]);
  //     const [data, setData] = useState([]);
  //     const getData = () => {
  //         fetch('./Records.json', {
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'Accept': 'application/json'
  //           }
  //         })
  //         .then(response => response.json())
  //         .then(jsonData => setData(jsonData));
  //       }

  //       useEffect(() => {
  //         getData();
  //       }, []);

  //    const read = () => {data.locations.forEach((e)=>{
  //         console.log(e)
  //     })}
  const read = () => {
    
  };

  const showArray = () => {
    console.log(locationZagreb);
    console.log(newLocations);

  };
  const save = () => {
    dispatch(locationsActions.addLocation(locationZagreb));

  };
  return (
    <div>
      <button className='rounded-full  bg-sky-600 text-white px-3 p-1.5 drop-shadow-lg ease-in-out duration-300 hover:scale-110 hover:bg-sky-700' onClick={read}> Read</button>
      <button className='rounded-full  bg-sky-600 text-white px-3 p-1.5 drop-shadow-lg ease-in-out duration-300 hover:scale-110 hover:bg-sky-700' onClick={showArray}> Read array</button>
      <button className='rounded-full  bg-sky-600 text-white px-3 p-1.5 drop-shadow-lg ease-in-out duration-300 hover:scale-110 hover:bg-sky-700' onClick={save}> Save to dispatch</button>
    </div>
  );
}

export default ReadJSON;