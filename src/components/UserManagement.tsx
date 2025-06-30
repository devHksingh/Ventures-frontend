import React, { useState } from "react";
import {
  Card, CardHeader, CardTitle, CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table, TableHeader, TableBody, TableRow, TableHead
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { UserPlus, ShieldCheck, KeyRound, Mail, UserCircle2, Search } from "lucide-react";

type Permission =
  | "Dashboard"
  | "Startup Verification"
  | "Payments"
  | "Users"
  | "Notes"
  | "Approval Queue"
  | "Audit Logs"
  | "Media Moderation"
  | "Analytics"
  | "Compliance Center";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  permissions: Permission[];
};

const initialUsers: User[] = [
  {
    id: "USR-1001",
    name: "Alice",
    email: "alice@example.com",
    password: "password123",
    permissions: ["Dashboard", "Startup Verification"],
  },
  {
    id: "USR-1002",
    name: "Bob",
    email: "bob@example.com",
    password: "password456",
    permissions: ["Dashboard"],
  },
];

const allPermissions: Permission[] = [
  "Dashboard", "Startup Verification", "Payments", "Users", "Notes",
  "Approval Queue", "Audit Logs", "Analytics", "Compliance Center"
];

function generateUserId(existing: User[]) {
  const max = existing.reduce((acc, u) => {
    const n = parseInt(u.id.replace("USR-", ""), 10);
    return isNaN(n) ? acc : Math.max(acc, n);
  }, 1000);
  return `USR-${max + 1}`;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [showDetails, setShowDetails] = useState<User | null>(null);
  const [userToRemove, setUserToRemove] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // <-- Add search state

  const handleInputChange = (field: keyof typeof newUser, value: string) => {
    setNewUser({ ...newUser, [field]: value });
  };

  const addUser = () => {
    if (newUser.name && newUser.email && newUser.password) {
      const newId = generateUserId(users);
      const newEntry: User = {
        id: newId,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        permissions: [],
      };
      setUsers([...users, newEntry]);
      setNewUser({ name: "", email: "", password: "" });
      toast({ title: "User added", description: `${newEntry.name} has been added.` });
    }
  };

  // Updated removeUser to not show dialog, just remove
  const removeUser = (id: string) => {
    const removed = users.find(u => u.id === id);
    setUsers(users.filter(u => u.id !== id));
    if (showDetails?.id === id) setShowDetails(null);
    toast({ title: "User removed", description: `${removed?.name} was removed.` });
  };

  const togglePermission = (userId: string, permission: Permission) => {
    setUsers(users.map(user =>
      user.id === userId
        ? {
            ...user,
            permissions: user.permissions.includes(permission)
              ? user.permissions.filter(p => p !== permission)
              : [...user.permissions, permission]
          }
        : user
    ));
  };

  // Filter users based on search query
  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 p-6 bg-gradient-to-br from-blue-50 via-white to-fuchsia-50 min-h-screen">
      <div className="flex items-center gap-3 mb-2">
        <UserCircle2 className="w-10 h-10 text-blue-500" />
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">User Management</h1>
      </div>

      {/* Add User Form */}
      <Card className="shadow-lg border-0 bg-white/90">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <UserPlus className="w-5 h-5" />
            Add New User
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col md:flex-row gap-4 items-center"
            onSubmit={e => {
              e.preventDefault();
              addUser();
            }}
          >
            <div className="relative w-full max-w-xs">
              <UserCircle2 className="absolute left-2 top-2.5 w-4 h-4 text-blue-300" />
              <Input
                placeholder="Name"
                value={newUser.name}
                onChange={e => handleInputChange("name", e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="relative w-full max-w-xs">
              <Mail className="absolute left-2 top-2.5 w-4 h-4 text-blue-300" />
              <Input
                placeholder="Email"
                type="email"
                value={newUser.email}
                onChange={e => handleInputChange("email", e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="relative w-full max-w-xs">
              <KeyRound className="absolute left-2 top-2.5 w-4 h-4 text-blue-300" />
              <Input
                placeholder="Password"
                type="password"
                value={newUser.password}
                onChange={e => handleInputChange("password", e.target.value)}
                className="pl-8"
              />
            </div>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6"
              disabled={!newUser.name || !newUser.email || !newUser.password}
            >
              Add User
            </Button>
          </form>
        </CardContent>
      </Card>
      {/* Search Bar */}
      <div className="flex items-center gap-2 max-w-md mb-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search users by name, email, or ID..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 rounded-xl border-2 border-blue-100 focus:border-blue-400 shadow-sm bg-white/80"
          />
        </div>
      </div>
      {/* User Table */}
      <Card className="shadow-lg border-0 bg-white/90">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-fuchsia-700">
            <ShieldCheck className="w-5 h-5" />
            Existing Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow key={user.id} className="hover:bg-blue-50/40 transition">
                    <td className="font-mono text-xs">{user.id}</td>
                    <td className="font-medium">{user.name}</td>
                    <td className="text-xs text-gray-700">{user.email}</td>
                    <td className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowDetails(user)}
                        className="border-blue-200"
                      >
                        View
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setUserToRemove(user)}
                        className="border-red-200"
                      >
                        Remove
                      </Button>
                    </td>
                  </TableRow>
                ))}
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <td colSpan={4} className="text-center text-gray-400 py-6">
                      No users found.
                    </td>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Remove User Confirmation Dialog */}
      <Dialog open={!!userToRemove} onOpenChange={() => setUserToRemove(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Confirm User Removal
            </DialogTitle>
          </DialogHeader>
          {userToRemove && (
            <div className="space-y-4">
              <p>
                Are you sure you want to remove <span className="font-semibold">{userToRemove.name}</span>?
              </p>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="destructive"
                  onClick={() => {
                    removeUser(userToRemove.id);
                    setUserToRemove(null);
                  }}
                >
                  Yes, Remove
                </Button>
                <Button variant="outline" onClick={() => setUserToRemove(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* User Details Modal */}
      <Dialog open={!!showDetails} onOpenChange={() => setShowDetails(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <span className="flex items-center gap-2">
                <UserCircle2 className="w-5 h-5 text-blue-400" />
                User Details & Permissions
              </span>
            </DialogTitle>
          </DialogHeader>
          {showDetails && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <UserCircle2 className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="font-semibold text-lg">{showDetails.name}</p>
                  <p className="text-xs text-neutral-500">{showDetails.email}</p>
                  <p className="text-xs text-neutral-400">ID: {showDetails.id}</p>
                </div>
              </div>
              <div>
                <strong>Permissions:</strong>
                <div className="flex flex-wrap gap-2 mt-2">
                  {allPermissions.map((perm) => {
                    const hasPermission = showDetails.permissions.includes(perm);
                    return (
                      <Button
                        key={perm}
                        variant={hasPermission ? "default" : "outline"}
                        size="sm"
                        className={hasPermission ? "bg-blue-600 text-white" : ""}
                        onClick={() => {
                          togglePermission(showDetails.id, perm);
                          setShowDetails(prev =>
                            prev
                              ? {
                                  ...prev,
                                  permissions: hasPermission
                                    ? prev.permissions.filter(p => p !== perm)
                                    : [...prev.permissions, perm]
                                }
                              : null
                          );
                        }}
                      >
                        {hasPermission ? "✓ " : "+ "} {perm}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
