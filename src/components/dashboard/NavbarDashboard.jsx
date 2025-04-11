/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import NavbarTabs from "../../../ui/NavbarTabs";
import AssignmentList from "./AssignmentList";
import { handleAssignments } from "../../app/AuthProvider";

export default function NavbarDashboard({ assignments = [], loading, error }) {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    if (assignments.length > 0) {
      dispatch(handleAssignments(assignments));
    }
  }, [JSON.stringify(assignments), dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (assignments.length === 0) return <div>No assignments found.</div>;

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <NavbarTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <AssignmentList assignments={assignments} activeTab={activeTab} />
    </div>
  );
}
