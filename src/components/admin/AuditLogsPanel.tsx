import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTitle } from "@headlessui/react";
import { FileText, Search, UserCircle2, Info } from "lucide-react";
import { saveAs } from "file-saver";

// Dummy audit log data
const dummyLogs = [
    {
        id: 1,
        action: "User Approved",
        admin: "Alice",
        target: "Sarah Chen",
        date: "2025-05-01 10:23",
        details: "Approved founder registration.",
    },
    {
        id: 2,
        action: "User Banned",
        admin: "Bob",
        target: "Michael Thompson",
        date: "2025-05-02 14:10",
        details: "Banned for repeated violations.",
    },
    {
        id: 3,
        action: "Edited Profile",
        admin: "Alice",
        target: "Alex Rodriguez",
        date: "2025-05-03 09:45",
        details: "Updated email address.",
    },
];

const actionTypes = [
    "All",
    ...Array.from(new Set(dummyLogs.map((log) => log.action))),
];

const admins = [
    "All",
    ...Array.from(new Set(dummyLogs.map((log) => log.admin))),
];

function exportToCSV(data: any[], filename = "audit-logs.csv") {
    if (!data.length) return;
    const header = Object.keys(data[0]).join(",");
    const rows = data.map((row) => Object.values(row).join(","));
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    saveAs(blob, filename);
}

export default function AuditLogsPanel() {
    const [search, setSearch] = useState("");
    const [actionFilter, setActionFilter] = useState("All");
    const [adminFilter, setAdminFilter] = useState("All");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [selectedLog, setSelectedLog] = useState<any | null>(null);

    // Filter logic
    const filteredLogs = dummyLogs.filter((log) => {
        const matchesSearch =
            search === "" ||
            log.action.toLowerCase().includes(search.toLowerCase()) ||
            log.admin.toLowerCase().includes(search.toLowerCase()) ||
            log.target.toLowerCase().includes(search.toLowerCase()) ||
            log.details.toLowerCase().includes(search.toLowerCase());
        const matchesAction =
            actionFilter === "All" || log.action === actionFilter;
        const matchesAdmin = adminFilter === "All" || log.admin === adminFilter;
        const matchesDateFrom = !dateFrom || log.date.slice(0, 10) >= dateFrom;
        const matchesDateTo = !dateTo || log.date.slice(0, 10) <= dateTo;
        return (
            matchesSearch && matchesAction && matchesAdmin && matchesDateFrom && matchesDateTo
        );
    });

    return (
        <div className="space-y-10 p-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
            <div className="flex items-center gap-3 mb-2">
                <FileText className="w-10 h-10 text-blue-500" />
                <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">Audit Logs</h1>
            </div>

            {/* Summary Badges */}
            <div className="flex gap-4">
                <Badge variant="secondary" className="text-lg px-3 py-1">
                    {filteredLogs.length} Logs Shown
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 text-lg px-3 py-1">
                    {dummyLogs.length} Total Logs
                </Badge>
            </div>

            <Card className="shadow-lg border-0 bg-white/90">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                        <Info className="w-5 h-5" />
                        Recent Admin Actions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-4 mb-4">
                        <div className="relative">
                            <Input
                                placeholder="Search logs..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-56 pl-10"
                            />
                            <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                        </div>
                        <select
                            className="border rounded px-2 py-1"
                            value={actionFilter}
                            onChange={(e) => setActionFilter(e.target.value)}
                        >
                            {actionTypes.map((type) => (
                                <option key={type}>{type}</option>
                            ))}
                        </select>
                        <select
                            className="border rounded px-2 py-1"
                            value={adminFilter}
                            onChange={(e) => setAdminFilter(e.target.value)}
                        >
                            {admins.map((admin) => (
                                <option key={admin}>{admin}</option>
                            ))}
                        </select>
                        <input
                            type="date"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            className="border rounded px-2 py-1"
                        />
                        <span className="mx-1">to</span>
                        <input
                            type="date"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                            className="border rounded px-2 py-1"
                        />
                        <Button
                            variant="outline"
                            onClick={() => exportToCSV(filteredLogs)}
                            className="ml-auto"
                        >
                            Export CSV
                        </Button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-separate border-spacing-0">
                            <thead>
                                <tr className="bg-blue-50">
                                    <th className="p-2 border-r border-blue-100">Date</th>
                                    <th className="border-r border-blue-100">Action</th>
                                    <th className="border-r border-blue-100">Admin</th>
                                    <th className="border-r border-blue-100">Target</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLogs.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-4 text-gray-400">
                                            No logs found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredLogs.map((log, idx) => (
                                        <React.Fragment key={log.id}>
                                            <tr className="border-t">
                                                <td className="p-2 border-r border-blue-50">{log.date}</td>
                                                <td className="border-r border-blue-50">{log.action}</td>
                                                <td className="border-r border-blue-50">{log.admin}</td>
                                                <td className="border-r border-blue-50">{log.target}</td>
                                                <td>{log.details}</td>
                                            </tr>
                                            {/* Line separator except after last row */}
                                            {idx < filteredLogs.length - 1 && (
                                                <tr>
                                                    <td colSpan={5}>
                                                        <div className="border-b border-blue-100" />
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Log Details Modal */}
            <Dialog open={!!selectedLog} onClose={() => setSelectedLog(null)}>
                <div className="flex items-center justify-center min-h-screen px-4">
                    <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full z-10 p-6 relative">
                        <DialogTitle className="text-lg font-bold mb-4">Log Details</DialogTitle>
                        {selectedLog && (
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <UserCircle2 className="w-8 h-8 text-blue-400" />
                                    <div>
                                        <p className="font-semibold text-lg">{selectedLog.admin}</p>
                                        <p className="text-xs text-neutral-500">{selectedLog.action}</p>
                                        <p className="text-xs text-neutral-400">ID: {selectedLog.id}</p>
                                    </div>
                                </div>
                                <div>
                                    <span className="font-semibold">Target:</span>{" "}
                                    <span>{selectedLog.target}</span>
                                </div>
                                <div>
                                    <span className="font-semibold">Date:</span>{" "}
                                    <span>{selectedLog.date}</span>
                                </div>
                                <div>
                                    <span className="font-semibold">Details:</span>{" "}
                                    <span>{selectedLog.details}</span>
                                </div>
                                <Button className="w-full mt-4" variant="outline" onClick={() => setSelectedLog(null)}>
                                    Close
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </Dialog>
        </div>
    );
}