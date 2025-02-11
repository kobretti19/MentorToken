import { Outlet } from "react-router";
import Header from "../components/navigation/header/Header";
import Footer from "../components/navigation/footer/Footer";

export default function RootLayout() {
  return (
    <div className="font-manrope">
      <Header />
      <main className="lg:w-[95%] w-[95%] mx-auto ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
