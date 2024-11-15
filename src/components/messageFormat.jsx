import MessageFormatStore from "../state/messageFormat.jsx";

function ToolbarBasicExample() {
  const store = MessageFormatStore();

  const updateStore = (e) => {
    store.setMessageFormat(e.target.value);
  };

  return (
    <div className={"flex flex-col w-1/2 ml-2"}>
      <label htmlFor="message-format">Message Format</label>
      <select name="message-format" id="message-format" onChange={updateStore}>
        <option value="pb_positive">Non-negative</option>
        <option value="pb_signed">Signed</option>
        <option value="pb_b">Pseudo-binary B</option>
      </select>
    </div>
  );
}

export default ToolbarBasicExample;
