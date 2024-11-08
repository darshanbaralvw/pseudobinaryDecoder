import MainOptions from "./components/mainOption.jsx";
import MessageFormat from "./components/messageFormat.jsx";
import "./index.css";
import MainOptionStore from "./state/mainOption.jsx";
import MessageFormatStore from "./state/messageFormat.jsx";
import { useState } from "react";
import {
  decode_pseudobinary,
  decode_pseudobinary_b,
  decode_signed_pseudobinary,
} from "./utils/decodeFuncs.js";

function App() {
  let defaultMessage = "`BST@Ff@Ffj";
  let mainOptionStore = MainOptionStore();
  let messageFormatStore = MessageFormatStore();
  const [message, setMessage] = useState(defaultMessage);
  const [start, setStart] = useState(4);
  const [width, setWidth] = useState(3);
  const [end, setEnd] = useState(7);
  const [divider, setDivider] = useState(100);
  const [multiplier, setMultiplier] = useState(1);
  const [adder, setAdder] = useState(0);
  const [nDigits, setNDigits] = useState(2);
  const [messageLength, setMessageLength] = useState(message.length);

  const handleSubmit = (e) => {
    e.preventDefault();
    let subMessage = message.slice(start, end);
    console.log(subMessage);
    let decodedValue;
    switch (messageFormatStore.messageFormat) {
      case "pb_positive":
        decodedValue = decode_pseudobinary(subMessage);
        break;
      case "pb_signed":
        decodedValue = decode_signed_pseudobinary(subMessage);
        break;
      case "pb_b":
        decodedValue = decode_pseudobinary_b(subMessage);
    }
    console.log(decodedValue);
    console.log(processData(decodedValue));
  };

  const processData = (decodedValue) => {
    let processedValue = (decodedValue * multiplier) / divider + adder;
    return processedValue.toFixed(nDigits);
  };

  const handleMessageChange = (e) => {
    let newMessage = e.target.value.trim();
    if (newMessage === "") {
      e.target.setCustomValidity("Message cannot be empty");
    } else {
      e.target.setCustomValidity("");
    }
    setMessage(newMessage);
    setMessageLength(newMessage.length);
  };

  const handleStartChange = (e) => {
    let startIndex = Number(e.target.value);
    setStart(startIndex);
    setEnd(width + startIndex);
  };

  const handleWidthChange = (e) => {
    let widthValue = Number(e.target.value);
    setWidth(widthValue);
    setEnd(widthValue + start);
  };

  const handleDividerChange = (e) => {
    let dividerValue = Number(e.target.value);
    console.log(dividerValue);
    if (dividerValue === 0) {
      e.target.setCustomValidity("Divider cannot be zero");
    } else {
      e.target.setCustomValidity("");
    }
    setDivider(dividerValue);
  };

  return (
    <>
      <h1>Pseudo-binary Decoder</h1>
      <p>
        Leave <code>Start</code> and <code>End</code> empty to decode the whole
        message. The index begins at <code>0</code>.
      </p>
      <hr />
      <div className={"flex"}>
        <MainOptions />
        <MessageFormat />
      </div>
      <p>
        {mainOptionStore.mainOption} {messageFormatStore.messageFormat}{" "}
        {messageLength}
      </p>
      <form name="msg_data">
        <div>
          <div className="flex flex-col w-sm-input">
            <label htmlFor="e_msg">Encoded Message</label>
            <input
              type="text"
              id="e_msg"
              value={message}
              onChange={handleMessageChange}
            />
          </div>
        </div>

        <div className="flex mb-1 justify-between">
          <div className="flex flex-col w-1/3 mr-2">
            <label htmlFor="msg_start">Start Index</label>
            <input
              type="number"
              id="msg_start"
              value={start}
              onChange={handleStartChange}
              min="0"
              max={messageLength - width}
            />
          </div>
          <div className="flex flex-col w-1/3 mx-2">
            <label htmlFor="msg_width">Message Width</label>
            <input
              type="number"
              id="msg_width"
              value={width}
              onChange={handleWidthChange}
              min="1"
              max={"3"}
            />
          </div>
          <div className="flex flex-col w-1/3 ml-2">
            <label htmlFor="msg_end">End Index</label>
            <input
              className="border-gray-600 text-gray-400"
              type="text"
              value={end}
              id=" msg_end"
              disabled
            />
          </div>
        </div>

        <div className=" flex mb-1 justify-between">
          <div className=" flex flex-col w-1/2 mr-2">
            <label htmlFor="div">Divider</label>
            <input
              type="number"
              value={divider}
              step="any"
              id="div"
              onChange={handleDividerChange}
            />
          </div>

          <div className="flex flex-col w-1/2 ml-2">
            <label htmlFor="mul">Multiplier</label>
            <input
              type="number"
              id="mul"
              value={multiplier}
              step="any"
              onChange={(e) => setMultiplier(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="flex mb-1 justify-between">
          <div className="flex flex-col w-1/2 mr-2">
            <label htmlFor="add">Adder</label>
            <input
              type="number"
              value={adder}
              step="any"
              id="add"
              onChange={(e) => setAdder(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col w-1/2 ml-2">
            <label htmlFor="ndig">Digits</label>
            <input
              type="number"
              value={nDigits}
              id="ndig"
              min="0"
              onChange={(e) => setNDigits(Number(e.target.value))}
            />
          </div>
        </div>
        <button onClick={handleSubmit}>Decode</button>
      </form>
    </>
  );
}

export default App;
