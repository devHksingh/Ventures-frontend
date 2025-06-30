import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DownloadIcon, Trash2Icon, AlertTriangleIcon, FileTextIcon, EyeIcon, UserIcon, Search } from "lucide-react";

// Dummy data for demonstration
const dummyUsers = [
  { id: 1, name: "Alex Rodriguez", email: "alex@techflow.com", requested: false },
  { id: 2, name: "Sarah Chen", email: "sarah@aiinnovations.com", requested: true },
];
const dummyDocs = [
  { id: 1, name: "Privacy Policy.pdf", expires: "2025-06-01", status: "valid" },
  { id: 2, name: "Data Processing Addendum.pdf", expires: "2024-05-01", status: "expired" },
];
const dummyAccessLogs = [
  { id: 1, user: "Admin1", action: "Viewed user data", date: "2025-05-30 10:00" },
  { id: 2, user: "Admin2", action: "Exported user data", date: "2025-05-29 14:22" },
];

export default function ComplianceCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalUser, setModalUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"gdpr" | "expiry" | "logs">("gdpr");

  // Filter users based on search query
  const filteredUsers = dummyUsers.filter(
    user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Simulate export/delete actions
  const handleExport = (user: any) => {
    setModalUser({ ...user, action: "export" });
  };
  const handleDelete = (user: any) => {
    setModalUser({ ...user, action: "delete" });
  };

  return (
    <div className="space-y-10 p-6 bg-gradient-to-br from-blue-50 via-white to-fuchsia-50 min-h-screen">
      <div className="flex items-center gap-3 mb-2">
        <FileTextIcon className="w-10 h-10 text-blue-500" />
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Compliance Center</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={activeTab === "gdpr" ? "default" : "outline"}
          className={activeTab === "gdpr" ? "bg-blue-600 text-white" : ""}
          onClick={() => setActiveTab("gdpr")}
        >
          <UserIcon className="w-4 h-4 mr-1" /> User Data Export/Delete
        </Button>
        <Button
          variant={activeTab === "expiry" ? "default" : "outline"}
          className={activeTab === "expiry" ? "bg-fuchsia-600 text-white" : ""}
          onClick={() => setActiveTab("expiry")}
        >
          <AlertTriangleIcon className="w-4 h-4 mr-1" /> Document Expiry Alerts
        </Button>
        <Button
          variant={activeTab === "logs" ? "default" : "outline"}
          className={activeTab === "logs" ? "bg-green-600 text-white" : ""}
          onClick={() => setActiveTab("logs")}
        >
          <EyeIcon className="w-4 h-4 mr-1" /> Access Logs
        </Button>
      </div>

      {/* User Data Export/Delete */}
      {activeTab === "gdpr" && (
        <Card className="shadow-lg border-0 bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <UserIcon className="w-5 h-5" />
              User Data Export/Delete
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Search Bar */}
            <div className="flex items-center gap-2 max-w-md mb-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 rounded-xl border-2 border-blue-100 focus:border-blue-400 shadow-sm bg-white/80"
                />
              </div>
            </div>
            {/* User List */}
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="bg-neutral-50 border rounded-lg p-3 flex justify-between items-center">
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-neutral-700">{user.email}</div>
                    {user.requested && (
                      <Badge variant="destructive" className="mt-1">Pending Request</Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleExport(user)}>
                      <DownloadIcon className="w-4 h-4 mr-1" /> Export Data
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(user)}>
                      <Trash2Icon className="w-4 h-4 mr-1" /> Delete Data
                    </Button>
                  </div>
                </Card>
              ))}
              {filteredUsers.length === 0 && (
                <div className="text-center text-gray-400 py-6">No users found.</div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Document Expiry Alerts */}
      {activeTab === "expiry" && (
        <Card className="shadow-lg border-0 bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-fuchsia-700">
              <AlertTriangleIcon className="w-5 h-5" />
              Document Expiry Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dummyDocs.map((doc) => (
                <Card key={doc.id} className="bg-neutral-50 border rounded-lg p-3 flex justify-between items-center">
                  <div>
                    <div className="font-medium">{doc.name}</div>
                    <div className="text-xs text-neutral-500">Expires: {doc.expires}</div>
                  </div>
                  <div>
                    {doc.status === "expired" ? (
                      <Badge variant="destructive">Expired</Badge>
                    ) : (
                      <Badge variant="outline">Valid</Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Access Logs */}
      {activeTab === "logs" && (
        <Card className="shadow-lg border-0 bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <EyeIcon className="w-5 h-5" />
              Access Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dummyAccessLogs.map((log) => (
                <Card key={log.id} className="bg-neutral-50 border rounded-lg p-3 flex justify-between items-center">
                  <div>
                    <div className="font-medium">{log.user}</div>
                    <div className="text-sm text-neutral-700">{log.action}</div>
                  </div>
                  <div className="text-xs text-neutral-400">{log.date}</div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal for export/delete confirmation */}
      <Dialog open={!!modalUser} onOpenChange={() => setModalUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {modalUser?.action === "export" ? "Export User Data" : "Delete User Data"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <div>
              <span className="font-semibold">{modalUser?.name}</span>
              <div className="text-xs text-neutral-500">{modalUser?.email}</div>
            </div>
            {modalUser?.action === "export" ? (
              <div>
                <p>Are you sure you want to export this user's data?</p>
                <Button className="mt-2 w-full" onClick={() => setModalUser(null)}>
                  Confirm Export
                </Button>
              </div>
            ) : modalUser?.action === "delete" ? (
              <div>
                <p className="text-red-600">This action is irreversible. Delete all user data?</p>
                <Button variant="destructive" className="mt-2 w-full" onClick={() => setModalUser(null)}>
                  Confirm Delete
                </Button>
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// --- Backend API (example, not functional, for reference) ---
// POST   /api/compliance/export-user      // Export user data (GDPR/CCPA)
// DELETE /api/compliance/delete-user      // Delete user data (GDPR/CCPA)
// GET    /api/compliance/expiry-alerts    // Get expiring compliance docs
// GET    /api/compliance/access-logs      // Get access logs for sensitive data
// All endpoints should be authenticated and restricted to admin roles.