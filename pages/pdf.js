
import React, {useState} from "react";
import { PDFDownloadLink} from "@react-pdf/renderer";
import PDFFile from './PDFFile'
const App = () => {
  const [update, setUpdate] = useState('')

  const a = (event) => {
    setUpdate(event.target.value)
  }

  return (
    <div className="App">
        <PDFDownloadLink document={(<PDFFile update={update} />)} fileName="s">
          <button>w</button>
          
        </PDFDownloadLink>
        <input className="bg-b bg-black" onChange={a}></input>
        
      <PDFFile update={update} />
      <div class="relative h-96 w-96">
    <div class="card bg-green-400 shadow-md inline-block w-96 h-96 rounded-3xl absolute bottom-0 transform -rotate-12"></div>
    <div class="card bg-indigo-400 shadow-lg inline-block w-96 h-96 rounded-3xl absolute bottom-0 transform -rotate-6"></div>
    <div class="card bg-pink-500 shadow-lg inline-block w-96 h-96 rounded-3xl absolute bottom-0 transform rotate-6"></div>
    <div class="card bg-white transition shadow-xl w-96 h-96 rounded-3xl absolute bottom-0 z-10 grid place-items-center">
      <div class="card bg-white shadow-inner h-full w-full rounded-2xl overflow-hidden relative">
        <h1 class="shadow-md text-xl font-thin text-center text-gray-600 uppercase p-3">Nonsense card</h1>
        <button class="card bg-blue-400 hover:bg-blue-500 focus:outline-none transition text-white w-full h-1/6 absolute bottom-0 ">Learn more</button>
      </div>
    </div>
  </div>
    </div>
  );
};

export default App;
