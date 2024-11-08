import MainOptionStore from "../state/mainOption.jsx";


function ToolbarBasicExample() {
    const store = MainOptionStore();

    const createButton = (type, label, cls) => {
        let btnClass;
        if (store.mainOption === type) {
            btnClass = cls.concat(" ", "active");
        } else {
            btnClass = cls;
        }
        return (<button className={btnClass}
                        onClick={() => store.setMainOption(type)}>
            {label}
        </button>);
    };

    return (
        <div className={"flex mb-4"}>
            {createButton("custom", "Custom", "me-1 grow")}
            {createButton("sutron_voltage", "Sutron Voltage", "mx-1 grow")}
            {createButton("da_voltage", "DA Voltage", "ms-1 grow")}
        </div>
    );
}

export default ToolbarBasicExample;