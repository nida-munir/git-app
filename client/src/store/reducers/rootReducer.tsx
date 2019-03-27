import gists from "./gistReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  gists
});

export default rootReducer;
