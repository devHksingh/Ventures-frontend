import { useState } from "react";
import { Button } from "../ui/button";

const ROLES = ["User", "Moderator", "Reviewer", "Finance Admin"];

export function RoleDropdown({ userId, currentRole, onChange }: {
  userId: string;
  currentRole: string;
  onChange?: (role: string) => void;
}) {
  const [role, setRole] = useState(currentRole);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
    onChange?.(e.target.value);
    // TODO: Call Firebase update if needed
  };

  return (
    <select
      className="border rounded px-2 py-1 text-sm"
      value={role}
      onChange={handleChange}
    >
      {ROLES.map(r => (
        <option key={r} value={r}>{r}</option>
      ))}
    </select>
  );
}