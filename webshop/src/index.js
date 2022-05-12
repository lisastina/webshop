import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import ScrollToTop from "./components/ScrollToTop";
import CartContext from "./contexts/CartContext";
import AuthContextProvider from "./contexts/AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 2,
      cacheTime: 1000 * 60 * 60 * 4,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <CartContext>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </CartContext>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
