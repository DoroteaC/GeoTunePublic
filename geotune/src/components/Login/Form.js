import { React, useState } from "react";
import ReadJSON from "../JSON/readJson";
import MidiFileUploader from "../MidiFileUploader";
import { loginActions } from "./../Redux";
import { useDispatch } from "react-redux";
function Form(onLogin) {
  const dispatch = useDispatch();
  const submitForm = (e) => {
    dispatch(loginActions.setLoggedIn(true));
    onLogin.onLogin(e);
    e.preventDefault();
  };

  return (
    <div className="bg-white p-3 w-1/3 rounded-lg h-1/3 flex items-center justify-center flex-col gap-5">
      {/* Please upload your document to proceed. */}
      <form
        className="flex flex-col"
        action="/upload"
        method="post"
        enctype="multipart/form-data"
      >
        {/* <input type="file" name="file" accept=".json"></input>
        <input className="primary" type="submit" value="Upload"></input> */}
        <MidiFileUploader/>
      </form>
      {/* <ReadJSON></ReadJSON> */}
      <button className='rounded-full  bg-sky-600 text-white px-3 p-1.5 drop-shadow-lg ease-in-out duration-300 hover:scale-110 hover:bg-sky-700' onClick={submitForm}>Start</button>
    </div>
  );
}

export default Form;
