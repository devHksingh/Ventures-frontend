import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { saveAs } from "file-saver";
import {
  LineChart,
  Line,
  XAxis,    
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

// Dummy analytics data (remove when using backend)
const dummyStats = [
  { date: "2025-05-01", users: 120, bids: 40, funding: 10000 },
  { date: "2025-05-02", users: 140, bids: 50, funding: 12000 },
  { date: "2025-05-03", users: 180, bids: 60, funding: 18000 },
  { date: "2025-05-04", users: 200, bids: 80, funding: 25000 },
  { date: "2025-05-05", users: 220, bids: 90, funding: 30000 },
];

function exportToCSV(data: any[], filename = "analytics.csv") {
  const header = Object.keys(data[0]).join(",");
  const rows = data.map((row) => Object.values(row).join(","));
  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  saveAs(blob, filename);
}

export default function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({
    from: "2025-05-01",
    to: "2025-05-05",
  });

  // --- Backend Integration Example ---
  // const [stats, setStats] = useState<any[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   setLoading(true);
  //   setError(null);
  //   // Example: Fetch from Firestore or REST API
  //   fetch(`/api/analytics?from=${dateRange.from}&to=${dateRange.to}`)
  //     .then(res => res.json())
  //     .then(data => setStats(data))
  //     .catch(err => setError("Failed to load analytics"))
  //     .finally(() => setLoading(false));
  // }, [dateRange]);

  // const filteredStats = stats;
  // --- End Backend Integration Example ---

  // For now, use dummy data:
  const filteredStats = dummyStats.filter(
    (row) => row.date >= dateRange.from && row.date <= dateRange.to
  );

  // Card color classes for variety
  const cardColors = [
    "from-blue-500 to-blue-400 text-white",
    "from-green-500 to-green-400 text-white",
    "from-orange-500 to-orange-400 text-white",
    "from-pink-500 to-pink-400 text-white"
  ];

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight flex items-center gap-2">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M3 17v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2M16 6l-4-4-4 4M12 2v14" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Analytics Dashboard
        </h1>
        <div className="flex gap-2 items-center">
          {/* Date Range Picker */}
          <input
            type="date"
            value={dateRange.from}
            max={dateRange.to}
            onChange={(e) => setDateRange((r) => ({ ...r, from: e.target.value }))}
            className="border rounded px-2 py-1 focus:ring-2 focus:ring-blue-400"
          />
          <span className="mx-1 font-semibold text-blue-500">to</span>
          <input
            type="date"
            value={dateRange.to}
            min={dateRange.from}
            onChange={(e) => setDateRange((r) => ({ ...r, to: e.target.value }))}
            className="border rounded px-2 py-1 focus:ring-2 focus:ring-blue-400"
          />
          <Button
            variant="outline"
            onClick={() => exportToCSV(filteredStats)}
            className="ml-2 border-blue-500 text-blue-700 hover:bg-blue-50"
          >
            Download CSV
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className={`bg-gradient-to-br ${cardColors[0]} shadow-lg`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-200 animate-pulse"></span>
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-extrabold drop-shadow">
              {filteredStats.reduce((sum, row) => sum + row.users, 0)}
            </span>
          </CardContent>
        </Card>
        <Card className={`bg-gradient-to-br ${cardColors[2]} shadow-lg`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-orange-200 animate-pulse"></span>
              Total Bids
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-extrabold drop-shadow">
              {filteredStats.reduce((sum, row) => sum + row.bids, 0)}
            </span>
          </CardContent>
        </Card>
        <Card className={`bg-gradient-to-br ${cardColors[3]} shadow-lg`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-pink-200 animate-pulse"></span>
              Total Funding
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-extrabold drop-shadow">
              ${filteredStats.reduce((sum, row) => sum + row.funding, 0).toLocaleString()}
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="users">
        <TabsList className="bg-white shadow rounded mb-4">
          <TabsTrigger value="users" className="text-blue-700">User Growth</TabsTrigger>
          <TabsTrigger value="bids" className="text-orange-700">Bids</TabsTrigger>
          <TabsTrigger value="funding" className="text-pink-700">Funding</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <Card className="shadow-lg border-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-700">Daily Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={filteredStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
                  <XAxis dataKey="date" stroke="#2563eb" />
                  <YAxis stroke="#2563eb" />
                  <RechartsTooltip contentStyle={{ background: "#eff6ff", borderColor: "#2563eb" }} />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={3} dot={{ r: 6, fill: "#2563eb" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bids">
          <Card className="shadow-lg border-orange-100">
            <CardHeader>
              <CardTitle className="text-orange-700">Bids</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={filteredStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffedd5" />
                  <XAxis dataKey="date" stroke="#f59e42" />
                  <YAxis stroke="#f59e42" />
                  <RechartsTooltip contentStyle={{ background: "#fff7ed", borderColor: "#f59e42" }} />
                  <Legend />
                  <Bar dataKey="bids" fill="#f59e42" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="funding">
          <Card className="shadow-lg border-pink-100">
            <CardHeader>
              <CardTitle className="text-pink-700">Funding</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={filteredStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" />
                  <XAxis dataKey="date" stroke="#f43f5e" />
                  <YAxis stroke="#f43f5e" />
                  <RechartsTooltip contentStyle={{ background: "#fdf2f8", borderColor: "#f43f5e" }} />
                  <Legend />
                  <Line type="monotone" dataKey="funding" stroke="#f43f5e" strokeWidth={3} dot={{ r: 6, fill: "#f43f5e" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}