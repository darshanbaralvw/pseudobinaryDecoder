import MainOptionStore from "../state/mainOption.jsx";

function ToolbarBasicExample() {
  const store = MainOptionStore();

  const updateStore = (e) => {
    store.setMainOption(e.target.value);
  };

  return (
    <div className={"flex flex-col mb-4 w-1/2 mr-2"}>
      <label htmlFor="main-option">Type of Message</label>
      <select name="main-option" id="main-option" onChange={updateStore}>
        <option value="custom">Custom</option>
        <option value="sutron_voltage">Sutron Voltage</option>
        <option value="da_voltage">DA Voltage</option>
      </select>
    </div>
  );
}

export default ToolbarBasicExample;
