import React, { useEffect, useState } from "react"
import "./index.css"

export default function TypingApp(){
  const [currentInput, setCurrentInput] = useState("");

  function handleInput(event:React.ChangeEvent<HTMLInputElement, HTMLInputElement>){
    setCurrentInput(event.target.value);
  }

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setCurrentInput("");
    }, 3000);

    return ()=>clearTimeout(timer);
  },[currentInput]);
  return(
    <div>
      <InputArea currentInput={currentInput} handleInput={handleInput}/>
    </div>
  );
}

type InputAreaPropr = {
  currentInput:string;
  handleInput:(event:React.ChangeEvent<HTMLInputElement, HTMLInputElement>)=>void;
}
function InputArea({currentInput, handleInput}:InputAreaPropr){
  const isLong = currentInput.length >= 10;
  return(
    <div>
      <input
        type="text" onChange={(event)=>handleInput(event)} value={currentInput}
        className="border"
      />
      <p>{currentInput.length}文字 {isLong && <span className="text-red-600">文字数が長いです</span>}</p>
    </div>
  );
}