import {create} from "zustand";

const MainOptionStore = create((set) => ({
    mainOption: "custom",
    setMainOption: (option) => set({mainOption: option}),
}));


export default MainOptionStore;