import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <div className="bg-[#f5f5f9]">
      <Outlet />;
    </div>
  );
}
