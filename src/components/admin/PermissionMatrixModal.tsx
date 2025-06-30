import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

const FIELDS = ["Email", "Phone", "Startup Info", "Payments"];
const PERMISSIONS = ["View", "Edit"];

export function PermissionMatrixModal({
  userId,
  onClose,
}: {
  userId: string;
  onClose: () => void;
}) {
  // Dummy state for permissions
  // In real app, fetch and update from Firestore
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Field Permissions</DialogTitle>
        <table className="w-full my-4 border">
          <thead>
            <tr>
              <th className="text-left">Field</th>
              {PERMISSIONS.map(p => (
                <th key={p}>{p}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FIELDS.map(field => (
              <tr key={field}>
                <td>{field}</td>
                {PERMISSIONS.map(p => (
                  <td key={p}>
                    <input type="checkbox" className="accent-blue-500" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}