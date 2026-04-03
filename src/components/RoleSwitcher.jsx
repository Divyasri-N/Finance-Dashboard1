import { useStore } from "../store/useStore";

function RoleSwitcher() {
  const role = useStore((state) => state.role);
  const setRole = useStore((state) => state.setRole);

  return (
    <div className="mb-4">
      <label className="mr-2 font-semibold">Role:</label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
}

export default RoleSwitcher;