import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";
import { produce } from "immer";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: { [key: string]: Cell };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      return state;
    case ActionType.DELETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter((cellId) => cellId !== action.payload);
      return state;
    case ActionType.INSERT_CELL_AFTER:
      const cell: Cell = {
        content: "",
        type: action.payload.type,
        id: randomId(),
      };

      state.data[cell.id] = cell;

      const foundIndex = state.order.findIndex(
        (cellId) => cellId === action.payload.id
      );
      if (foundIndex === -1) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(foundIndex + 1, 0, cell.id);
      }
      return state;
    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex(
        (cellId) => cellId === action.payload.id
      );
      const targetIndex = direction === "UP" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= state.order.length) {
        return state;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;

      return state;

    case ActionType.FETCH_CELLS:
      state.loading = true;
      state.error = null;
      return state;
    case ActionType.FETCH_CELLS_COMPLETE:
      state.loading = false;
      state.error = null;
      state.order = action.payload.map((cell) => cell.id);
      state.data = action.payload.reduce((acc, cell) => {
        acc[cell.id] = cell;
        return acc;
      }, {} as CellsState["data"]);
      return state;
    case ActionType.FETCH_CELLS_ERROR:
      state.loading = false;
      state.error = action.payload;
      return state;

    case ActionType.SAVE_CELLS_ERROR:
      state.error = action.payload;
      return state;
    default:
      return state;
  }
}, initialState);

const randomId = () => Math.random().toString(36).substring(2, 5);

export default reducer;
