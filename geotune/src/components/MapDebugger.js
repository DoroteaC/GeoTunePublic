import { React, useState, useEffect } from 'react';
import { Polygon, useMapEvents } from 'react-leaflet';
import { latLngToCell, cellToBoundary, cellToParent, polygonToCells } from "h3-js";
import { useDispatch, useSelector } from "react-redux";
import locationData from './../data/Records.json';
import MIDISounds from 'midi-sounds-react';

function MapDebugger() {
    const [polygonsToShow, setPolygonsToShow] = useState([]);
    const [visitedRegions, setVisitedRegions] = useState([]);
    const [midiNoteIndexes, setMidiNoteIndexes] = useState({});
    const [locations, setLocations] = useState([]);
    const [midiSounds, setMidiSounds] = useState(null);

    const MINUTE_MS = 100;

    const midiNotes = useSelector((state) => state.midiNotes.midiNotes);
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    var noteCounter = 0;

    useEffect(() => {
        const savedReducedLocations = localStorage.getItem("reducedLocations");
        if (!savedReducedLocations) {
            let reducedLocations = locationData.locations.reduce((locations, location) => {
                if (locations.length > 1) {
                    let lat = location.latitudeE7 / 1e7;
                    let long = location.longitudeE7 / 1e7;
                    const targetCell = latLngToCell(lat, long, 9);

                    let prevLat = locations[locations.length - 1].latitudeE7 / 1e7;
                    let prevLong = locations[locations.length - 1].longitudeE7 / 1e7;
                    const prevCell = latLngToCell(prevLat, prevLong, 9);

                    if (targetCell != prevCell) {
                        return [...locations, location];
                    }
                    return [...locations];
                }
                else {
                    return [...locations, location];
                }
            }, []);
            localStorage.setItem("reducedLocations", JSON.stringify(reducedLocations));
            setLocations(reducedLocations);
        }
        else {
            setLocations(JSON.parse(savedReducedLocations));
        }
        const interval = setInterval(() => {
            if(isLoggedIn){
                onTimer(noteCounter);
                noteCounter++;
            }
        }, MINUTE_MS);
        return () => {
            clearInterval(interval);
        };
    }, [midiNotes, isLoggedIn]);

    function onTimer(noteCounter) {
        if (midiNotes && midiNotes.length > 0 && midiSounds) {
            if (locations && locations.length > 0) {
                let lat = locations[noteCounter].latitudeE7 / 1e7;
                let long = locations[noteCounter].longitudeE7 / 1e7;
                const targetCell = latLngToCell(lat, long, 9);
                const region = cellToParent(targetCell, 5);
                const regionPolygon = cellToBoundary(region);
                if (!visitedRegions.includes(region)) {
                    const cellsInsideParent = polygonToCells(regionPolygon, 9);
                    const newMidiNoteIndexes = { ...midiNoteIndexes }
                    for (let i = 0; i < cellsInsideParent.length; i++) {
                        const cellInsideParent = cellsInsideParent[i];
                        const noteIndex = i % midiNotes.length;
                        const midiNote = midiNotes[noteIndex];
                        newMidiNoteIndexes[cellInsideParent] = midiNote;
                    }
                    const targetNote = newMidiNoteIndexes[targetCell];
                    console.log(targetNote);
                    if (targetNote) {
                        midiSounds.playChordNow(3, [targetNote], 2.5);
                    }
                    setMidiNoteIndexes(newMidiNoteIndexes);
                    setVisitedRegions([...visitedRegions, region]);
                }
                else {
                    let noteIndexes = { ...midiNoteIndexes };
                    const targetNote = noteIndexes[targetCell];
                    console.log(targetNote);
                    if (targetNote) {
                        midiSounds.playChordNow(3, [targetNote], 2.5);
                    }
                }
                const targetPolygon = cellToBoundary(targetCell);
                setPolygonsToShow([targetPolygon]);
            }
        }
    }

    useMapEvents({
        mousemove(e) {
            // if (midiNotes && midiNotes.length > 0) {
            //     const targetCell = latLngToCell(e.latlng.lat, e.latlng.lng, 9);
            //     const region = cellToParent(targetCell, 5);
            //     const regionPolygon = cellToBoundary(region);
            //     if (!visitedRegions.includes(region)) {
            //         const cellsInsideParent = polygonToCells(regionPolygon, 9);
            //         const newMidiNoteIndexes = { ...midiNoteIndexes }
            //         for (let i = 0; i < cellsInsideParent.length; i++) {
            //             const cellInsideParent = cellsInsideParent[i];
            //             const noteIndex = i % midiNotes.length;
            //             const midiNote = midiNotes[noteIndex];
            //             newMidiNoteIndexes[cellInsideParent] = midiNote;
            //         }
            //         const targetNote = newMidiNoteIndexes[targetCell];
            //         console.log(targetNote);
            //         setMidiNoteIndexes(newMidiNoteIndexes);
            //         setVisitedRegions([...visitedRegions, region]);
            //     }
            //     else {
            //         let noteIndexes = { ...midiNoteIndexes };
            //         const targetNote = noteIndexes[targetCell];
            //         console.log(targetNote);
            //     }
            //     const targetPolygon = cellToBoundary(targetCell);
            //     setPolygonsToShow([regionPolygon, targetPolygon]);

            //     // console.log("Midi note: ", midiNoteIndexes[targetCell].midiNote);
            // }
        },
    });

    return <div>
        <Polygon positions={polygonsToShow} />
        <MIDISounds ref={(ref) => (setMidiSounds(ref))} appElementName="root" instruments={[3]} />
    </div>;
}

export default MapDebugger;