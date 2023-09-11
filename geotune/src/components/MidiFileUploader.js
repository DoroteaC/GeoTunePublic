import React, { useState } from 'react';
import { Midi } from '@tonejs/midi'
import { useDispatch, useSelector } from "react-redux";
import { midiNotesActions } from "./Redux";

function MidiFileUploader() {
    const dispatch = useDispatch();
    const [notes, setNotes] = useState([]);

    function handleFileUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const midiData = new Midi(data)
            console.log(midiData);
            const notes = [];
            for(let i = 0; i < midiData.tracks[0].notes.length; i++){
                notes.push(midiData.tracks[0].notes[i].midi);
            }
            setNotes(notes);
            dispatch(midiNotesActions.addMidiNotes(notes));
        };
        reader.readAsArrayBuffer(file);
    }

    return (
        <div>
            <span>Upload MIDI file</span>
            <input type="file" title="Upload MIDI" onChange={handleFileUpload} />
        </div>
    );
}
export default MidiFileUploader;