import MessageFormatStore from "../state/messageFormat.jsx";


function ToolbarBasicExample() {
    const store = MessageFormatStore();

    const createButton = (format, label, cls) => {
        let btnClass;
        if (store.messageFormat === format) {
            btnClass = cls.concat(" ", "active");
        } else {
            btnClass = cls;
        }
        return (<button className={btnClass}
                        onClick={() => store.setMessageFormat(format)}>
            {label}
        </button>);
    };

    return (
        <div className={"flex mb-4"}>
            {createButton("pb_positive", "Pseudo-binary (non-negative)", "me-1 grow")}
            {createButton("pb_signed", "Pseudo-binary (signed)", "mx-1 grow")}
            {createButton("pb_b", "Pseudo-binary B", "ms-1 grow")}
        </div>
    );
}

export default ToolbarBasicExample;