import { createSlice, configureStore } from "@reduxjs/toolkit";

// export const zagrebInitial = {
//     latitude: 45.815399,
//     longitude: 15.966568,
//   };

const locationsInitial = {
  locationsZagreb: [],
}

const midiNotesInitial = {
  midiNotes: [],
}

const loginInitial = {
  isLoggedIn: false,
}

const locationsSlice = createSlice({
  name: "locations",
  initialState: locationsInitial,
  reducers: {
    addLocation(state, action) {
      state.locationsZagreb = action.payload;
    }
  },
});

const midiNotesSlice = createSlice({
  name: "midiNotes",
  initialState: midiNotesInitial,
  reducers: {
    addMidiNotes(state, action) {
      state.midiNotes = action.payload;
    }
  },
});

const loginSlice = createSlice({
  name: "login",
  initialState: loginInitial,
  reducers: {
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    }
  },
});

const store = configureStore({
  reducer: {
    locations: locationsSlice.reducer,
    midiNotes: midiNotesSlice.reducer,
    login: loginSlice.reducer
  },
});
export const locationsActions = locationsSlice.actions;
export const midiNotesActions = midiNotesSlice.actions;
export const loginActions = loginSlice.actions;

export default store;