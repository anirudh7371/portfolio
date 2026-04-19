"use client";

import { signOut } from "next-auth/react";

export function AdminSignOutButton() {
  return (
    <button
      type="button"
      className="admin-button admin-button-ghost"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
    >
      Sign Out
    </button>
  );
}
