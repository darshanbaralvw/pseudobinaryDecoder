import MainOptions from "./components/mainOption.jsx";
import MessageFormat from "./components/messageFormat.jsx";
import "./index.css";
import MainOptionStore from "./state/mainOption.jsx";
import MessageFormatStore from "./state/messageFormat.jsx";
import {useState} from "react";


function App() {
    let mainOptionStore = MainOptionStore();
    let messageFormatStore = MessageFormatStore();
    const [message, setMessage] = useState("`BST@Ff@Ffj ");
    const [start, setStart] = useState(4);
    const [end, setEnd] = useState(7);
    const [messageLength, setMessageLength] = useState(12);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
        setMessageLength(e.target.value.length);
    };

    return (<>
            <h1>Pseudo-binary Decoder</h1>
            <p>Leave <code>Start</code> and <code>End</code> empty to decode the whole message. The index begins
                at <code>0</code>.
            </p>
            <hr/>
            <MainOptions/>
            <MessageFormat/>
            <p>{mainOptionStore.mainOption} {messageFormatStore.messageFormat} {messageLength}</p>
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
                    <div className="flex flex-col w-1/2 mr-2">
                        <label htmlFor="msg_start">Start</label>
                        <input
                            type="number"
                            id="msg_start"
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                            min="0"
                            max={messageLength - 2}
                        />
                    </div>
                    <div className="flex flex-col w-1/2 ml-2">
                        <label htmlFor="msg_end">End</label>
                        <input
                            type="number"
                            value={end}
                            onChange={(e) => setEnd(e.target.value)}
                            min={Math.max(1, Number(start) + 1)}
                            max={messageLength - 1}
                            id="msg_end"
                        />
                    </div>
                </div>

                <div className="flex mb-1 justify-between">
                    <div className="flex flex-col w-1/2 mr-2">
                        <label htmlFor="div">Divider</label>
                        <input type="number" defaultValue="100" step="any" id="div"/>
                    </div>
                    <div className="flex flex-col w-1/2 ml-2">
                        <label htmlFor="mul">Multiplier</label>
                        <input type="number" id="mul" defaultValue="1" step="any"/>
                    </div>
                </div>

                <div className="flex mb-1 justify-between">
                    <div className="flex flex-col w-1/2 mr-2">
                        <label htmlFor="add">Adder</label>
                        <input type="number" defaultValue="0" step="any" id="add"/>
                    </div>
                    <div className="flex flex-col w-1/2 ml-2">
                        <label htmlFor="ndig">Digits</label>
                        <input type="number" defaultValue="2" id="ndig" min="0"/>
                    </div>
                </div>
                <button>Decode</button>
            </form>
        </>
    );
}

export default App;
