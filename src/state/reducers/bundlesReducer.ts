import { produce } from "immer";
import { Action } from "../actions";
import { ActionType } from "../action-types";

interface BundlesState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

const initialState: BundlesState = {};

const reducer = produce(
  (state: BundlesState = initialState, action: Action): BundlesState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        state[action.payload.cellId] = {
          loading: true,
          code: "",
          err: "",
        };
        return state;
      case ActionType.BUNDLE_COMPLETE:
        const { cellId, bundle } = action.payload;
        state[cellId] = {
          loading: false,
          code: bundle.code,
          err: bundle.err,
        };
        return state;
      default:
        return state;
    }
  },
  initialState
);

export default reducer;
