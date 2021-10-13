import { createStore } from "redux";
import settings_reducer from "./settings/settingReducer";
// TODO: Use combine store to also use message_reducer
const store = createStore(settings_reducer);

export default store;