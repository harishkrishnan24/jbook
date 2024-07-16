import { persistMiddleware } from "./middlewares/persist-middleware";
import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers";
import { thunk } from "redux-thunk";

export const store = createStore(
  reducers,
  {},
  applyMiddleware(persistMiddleware, thunk)
);
