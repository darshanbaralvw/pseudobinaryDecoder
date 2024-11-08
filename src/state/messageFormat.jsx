import {create} from "zustand";

const MessageFormatStore = create((set) => ({
    messageFormat: "pb_positive",
    setMessageFormat: (option) => set({messageFormat: option}),
}));


export default MessageFormatStore;