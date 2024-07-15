import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import CellList from "./components/cell-list";
import { store } from "./state";

const App = () => {
  return (
    <Provider store={store}>
      <CellList />
    </Provider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);
