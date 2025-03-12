import { useState } from "react";
import { useDispatch } from "react-redux";

import useFetchAssignments from "../../hooks/useFetchAssignments";
import NavbarTabs from "../../../ui/NavbarTabs";
import AssignmentList from "./AssignmentList";
import { handleAssignments } from "../../app/AuthProvider";

export default function NavbarDashboard() {
  const { assignments, loading, error } = useFetchAssignments();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("All");

  dispatch(handleAssignments(assignments));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col gap-y-4">
      {/* Navbar Tabs Component */}
      <NavbarTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Assignment List Component */}
      <AssignmentList assignments={assignments} activeTab={activeTab} />
    </div>
  );
}
