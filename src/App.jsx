import MainOptions from "./components/mainOption.jsx";
import MessageFormat from "./components/messageFormat.jsx";
import "./index.css";
import MainOptionStore from "./state/mainOption.jsx";
import MessageFormatStore from "./state/messageFormat.jsx";
import { useState, useEffect } from "react";
import {
  decode_pseudobinary,
  decode_pseudobinary_b,
  decode_signed_pseudobinary,
} from "./utils/decodeFuncs.js";

function App() {
  let mainOptionStore = MainOptionStore();
  let messageFormatStore = MessageFormatStore();
  useEffect(() => decode(), []);

  useEffect(() => {
    const setFormData = () => {
      switch (mainOptionStore.mainOption) {
        case "sutron_voltage":
          setStart(messageLength - 1);
          setWidth(1);
          setEnd(messageLength);
          setDivider(1);
          setMultiplier(0.234);
          setAdder(10.6);
          break;
        case "da_voltage":
          setStart(messageLength - 1);
          setWidth(1);
          setEnd(messageLength);
          setDivider(1);
          setMultiplier(0.3124);
          setAdder(0.311);
      }
    };
    setFormData();
  }, [mainOptionStore.mainOption]);

  let defaultMessage = "`BST@Ff@Ffj";
  const [message, setMessage] = useState(defaultMessage);
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

  let defaultStartIndex = 4;
  const [start, setStart] = useState(defaultStartIndex);
  const handleStartChange = (e) => {
    let startIndex = Number(e.target.value);
    setStart(startIndex);
    setEnd(width + startIndex);
  };

  let defaultWidth = 3;
  const [width, setWidth] = useState(defaultWidth);
  const [end, setEnd] = useState(defaultStartIndex + defaultWidth);
  const handleWidthChange = (e) => {
    let widthValue = Number(e.target.value);
    setWidth(widthValue);
    setEnd(widthValue + start);
  };

  let defaultDivider = 100;
  const [divider, setDivider] = useState(defaultDivider);
  const handleDividerChange = (e) => {
    let dividerValue = Number(e.target.value);
    if (dividerValue === 0) {
      e.target.setCustomValidity("Divider cannot be zero");
    } else {
      e.target.setCustomValidity("");
    }
    setDivider(dividerValue);
  };

  let defaultMultiplier = 1;
  const [multiplier, setMultiplier] = useState(defaultMultiplier);

  let defaultAdder = 0;
  const [adder, setAdder] = useState(defaultAdder);

  let defaultNDigits = 2;
  const [nDigits, setNDigits] = useState(defaultNDigits);

  let defaultSubMessage = defaultMessage.slice(start, end);
  const [subMessage, setSubMessage] = useState(defaultSubMessage);

  const [messageLength, setMessageLength] = useState(message.length);

  const [decodedData, setDecodedData] = useState(null);
  const [processedValue, setProcessedValue] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      decode();
    } else {
      e.target.reportValidity();
    }
  };

  const decode = () => {
    let newSubMessage = message.slice(start, end);
    setSubMessage(newSubMessage);

    let decodedValue;
    switch (messageFormatStore.messageFormat) {
      case "pb_positive":
        decodedValue = decode_pseudobinary(newSubMessage);
        break;
      case "pb_signed":
        decodedValue = decode_signed_pseudobinary(newSubMessage);
        break;
      case "pb_b":
        decodedValue = decode_pseudobinary_b(newSubMessage);
    }
    let processedData = processData(decodedValue);
    setDecodedData(decodedValue);
    setProcessedValue(processedData);
  };

  const processData = (decodedValue) => {
    let processedValue = (decodedValue * multiplier) / divider + adder;
    return processedValue.toFixed(nDigits);
  };

  return (
    <>
      <h1>Pseudo-binary Decoder</h1>
      <p>
        Leave <code>Start</code> and <code>End</code> empty to decode the whole
        message. The index begins at <code>0</code>.
      </p>

      <hr />

      <form onSubmit={handleSubmit} name="msg_data">
        <div>
          <div className="flex flex-col w-sm-input">
            <label htmlFor="e_msg">Encoded Message</label>
            <input
              type="text"
              id="e_msg"
              value={message}
              onChange={handleMessageChange}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="flex mb-1 justify-between">
          <div className="flex flex-col w-1/3 mr-2">
            <label htmlFor="msg_width">Message Width</label>
            <input
              type="number"
              id="msg_width"
              value={width}
              onChange={handleWidthChange}
              min={1}
              max={Math.min(3, messageLength - start)}
            />
          </div>
          <div className="flex flex-col w-1/3 mx-2">
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

          <div className="flex flex-col w-1/3 ml-2">
            <label htmlFor="msg_end">End Index</label>
            <input
              className="border-gray-600 text-gray-400"
              type="text"
              value={end}
              id="msg_end"
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
        <hr className={"border-gray-600"} />
        <div className={"flex items-center"}>
          <MainOptions />
          <MessageFormat />
        </div>
        <button className={"my-3 w-full"} type="submit">
          Decode
        </button>
      </form>

      <section id="results" className={"bg-gray-700 p-2 rounded"}>
        <h2>Results</h2>
        <p>
          Raw Encoded Message: <code>{subMessage}</code>
        </p>
        <p>
          Decoded Data: <code>{decodedData}</code>
        </p>
        <p>
          Processed Data: <code>{processedValue}</code>
        </p>
      </section>
    </>
  );
}

export default App;
