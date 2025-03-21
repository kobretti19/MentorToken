import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RootLayout from "./pages/Root";
import LoginLayout from "./pages/LoginRoot";
import LoginHome from "./pages/LoginHome";
import SignUp from "./pages/SignUp";
import SignupLayout from "./pages/SignupRoot";
import RegisterStart from "./pages/RegisterStart";
import RegisterMen from "./pages/RegisterMen";
import DashboardLayout from "./pages/DashboardRoot";
import MentorDashboard from "./pages/LoggedIn/MentorDashboard";
import MyStats from "./pages/LoggedIn/mystats/MyStats";
import JobFeed from "./pages/LoggedIn/JobFeed";
import StartUpDashboard from "./pages/LoggedIn/StartUpDashboard";
import Mentors from "./pages/LoggedIn/Mentors";
import Profile from "./pages/LoggedIn/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  {
    path: "/login",
    element: <LoginLayout />,
    children: [{ path: "", element: <LoginHome /> }],
  },
  {
    path: "/signup",
    element: <SignupLayout />,
    children: [
      { path: "", element: <SignUp /> },
      { path: "registerstartup", element: <RegisterStart /> },
      { path: "registermentor", element: <RegisterMen /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: ":user", element: <Profile /> },
      { path: "mentor", element: <MentorDashboard /> },
      { path: "startup", element: <StartUpDashboard /> },
      { path: "mentors", element: <Mentors /> },
      { path: "mentors/:user", element: <Profile /> },
      { path: "mystats", element: <MyStats /> },
      { path: "jobfeed", element: <JobFeed /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
