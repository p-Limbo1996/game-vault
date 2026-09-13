import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import HudFrame from "./HudFrame";

export default function VaultLayout() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="min-h-screen bg-void text-foreground relative vignette">
      <HudFrame />
      <Sidebar expanded={expanded} setExpanded={setExpanded} />
      <main
        className="relative transition-all duration-500 pt-8"
        style={{ marginLeft: expanded ? "240px" : "76px" }}
      >
        <Outlet />
      </main>
    </div>
  );
}