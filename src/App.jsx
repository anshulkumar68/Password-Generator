import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState(false);

  // using callback for Memoization and optimization
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "@#$-*&%";

    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  // using useref
  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // using useeffect for executing the function each time with any change of dependency
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3 text-xl">PASSWORD GENERATOR</h1>
      {/* password input field and button*/}
      <div className="flex shadow rounded-lg mb-4 text-black font-semibold">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 rounded-l-lg"
          placeholder="Password"
          ref={passwordRef}
          readOnly
        />
        <button
          className="outline-none bg-blue-500 hover:bg-blue-700 hover:text-lg text-white px-3 py-0.5 shrink-0 rounded-r-lg"
          onClick={copyPasswordToClipboard}
        >
          COPY
        </button>
      </div>
      {/* Length slider, Number checkbox Special checkbox */}
      <div className="flex justify-evenly text-sm gap-x-2">
        <div className="flex items-center gap-x-1 ">
          <input
            type="range"
            min="6"
            max="16"
            value={length}
            className="cursor-pointer"
            onChange={(e) => {setLength(e.target.value)}}
          />
          <label className="px-2">Length: {length} </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
