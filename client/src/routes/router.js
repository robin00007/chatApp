import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Home from "./home";
import Login from "./login";
export default function RouterProvider() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
      </Routes>
    </BrowserRouter>
  );
}
