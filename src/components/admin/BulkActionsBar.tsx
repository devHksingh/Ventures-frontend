import { Button } from "../ui/button";

export function BulkActionsBar({
  selectedUserIds,
  onApprove,
  onSuspend,
  onDelete,
}: {
  selectedUserIds: string[];
  onApprove?: () => void;
  onSuspend?: () => void;
  onDelete?: () => void;
}) {
  if (selectedUserIds.length === 0) return null;
  return (
    <div className="flex gap-2 mb-2 bg-gray-100 p-2 rounded items-center">
      <span>{selectedUserIds.length} selected</span>
      <Button size="sm" onClick={onApprove}>Approve</Button>
      <Button size="sm" variant="destructive" onClick={onSuspend}>Suspend</Button>
      <Button size="sm" variant="outline" onClick={onDelete}>Delete</Button>
    </div>
  );
}