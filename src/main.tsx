import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { StyledEngineProvider } from "@mui/material/styles";
import { store } from "./app/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <StyledEngineProvider injectFirst>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
            ,
        </Provider>
        ,
    </StyledEngineProvider>,
    // </React.StrictMode>,
);
