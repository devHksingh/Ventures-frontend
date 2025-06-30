import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ChevronDownIcon, FilterIcon, CalendarIcon, UserIcon } from "lucide-react";

// Dummy data
const flaggedItems = {
  videos: [
    {
      id: "v1",
      title: "Pitch: TechFlow",
      user: { name: "Alex Rodriguez", email: "alex@techflow.com", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
      url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      flaggedReason: "Inappropriate content",
      history: ["Approved: 2024-01-10", "Flagged: 2024-02-01"],
      infractions: 2,
      flagCount: 3,
      date: "2024-02-01",
    },
  ],
  messages: [
    {
      id: "m1",
      content: "Spam message detected",
      user: { name: "Sarah Chen", email: "sarah@aiinnovations.com", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
      flaggedReason: "Spam",
      history: ["Flagged: 2024-02-02"],
      infractions: 0,
      flagCount: 1,
      date: "2024-02-02",
    },
  ],
  descriptions: [
    {
      id: "d1",
      title: "GreenTech Project",
      user: { name: "Michael Thompson", email: "michael@greentech.com", avatar: "https://randomuser.me/api/portraits/men/65.jpg" },
      content: "Eco-friendly technology for a sustainable future.",
      flaggedReason: "Plagiarism",
      history: ["Flagged: 2024-02-03"],
      infractions: 4,
      flagCount: 2,
      date: "2024-02-03",
    },
  ],
};

const reportReasons = ["All", "Spam", "Inappropriate", "Plagiarism"];

export function ModerationQueue() {
  const [activeTab, setActiveTab] = useState("videos");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewModalItem, setViewModalItem] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [bulkAction, setBulkAction] = useState("");
  const [showRepeat, setShowRepeat] = useState(false);
  const [reasonFilter, setReasonFilter] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Filtering logic
  const filterItems = (items: any[]) =>
    items.filter((item) => {
      const matchesSearch =
        search === "" ||
        (item.title && item.title.toLowerCase().includes(search.toLowerCase())) ||
        (item.content && item.content.toLowerCase().includes(search.toLowerCase())) ||
        item.user.name.toLowerCase().includes(search.toLowerCase()) ||
        item.user.email.toLowerCase().includes(search.toLowerCase());
      const matchesReason =
        reasonFilter === "All" || item.flaggedReason === reasonFilter;
      const matchesRepeat = !showRepeat || item.infractions > 1;
      const matchesDateFrom = !dateFrom || item.date >= dateFrom;
      const matchesDateTo = !dateTo || item.date <= dateTo;
      return matchesSearch && matchesReason && matchesRepeat && matchesDateFrom && matchesDateTo;
    });

  const handleAction = (action: string, item: any) => {
    alert(`${action} for ${item.title || item.content}`);
  };

  // Bulk actions (for demonstration)
  const handleBulkAction = () => {
    if (!bulkAction) return;
    alert(`Bulk action: ${bulkAction} on filtered items`);
  };

  // Responsive: sidebar collapses below md
  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      {/* Header */}
      <div className="w-full bg-white shadow-sm px-4 py-4 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-2">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
  <rect x="8" y="8" width="32" height="6" rx="2" fill="#a3a3a3" fill-opacity="0.2"/>
  <rect x="8" y="18" width="32" height="6" rx="2" fill="#a3a3a3" fill-opacity="0.4"/>
  <rect x="8" y="28" width="32" height="6" rx="2" fill="#a3a3a3" fill-opacity="0.7"/>
  <rect x="8" y="38" width="32" height="6" rx="2" fill="#a3a3a3"/>
  <path d="M40 24l6 0M44 20l4 4-4 4" stroke="#737373" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Approval Queue</h1>
        </div>
        <div className="flex-1 flex gap-2">
          <Input
            placeholder="Search flagged content or users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="max-w-xs"
          />
          <Select value={bulkAction} onValueChange={setBulkAction}>
            <SelectTrigger className="w-36">
              {bulkAction ? bulkAction : "Bulk Actions"}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Approve">Approve</SelectItem>
              <SelectItem value="Reject">Reject</SelectItem>
              <SelectItem value="Ban">Ban</SelectItem>
            </SelectContent>
          </Select>
          <Button
            size="sm"
            className="ml-2"
            variant="outline"
            disabled={!bulkAction}
            onClick={handleBulkAction}
          >
            Apply
          </Button>
        </div>
      </div>
      {/* Layout */}
      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-6 px-2 py-6">
        {/* Collapsible Sidebar */}
        <aside className="w-full md:w-64 bg-white border rounded-xl p-5 shadow h-fit mb-4 md:mb-0 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <FilterIcon className="w-4 h-4 text-neutral-400" />
            <span className="font-semibold text-neutral-700">Filters</span>
          </div>
          {/* Repeat Offenders Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-700">Show repeat offenders</span>
            <Switch checked={showRepeat} onCheckedChange={setShowRepeat} />
          </div>
          {/* Report Reason Dropdown */}
          <div>
            <span className="block text-sm text-neutral-700 mb-1">Report Reason</span>
            <Select value={reasonFilter} onValueChange={setReasonFilter}>
              <SelectTrigger className="w-full">
                {/* <ChevronDownIcon className="w-4 h-4 mr-1" /> */}
                {reasonFilter}
              </SelectTrigger>
              <SelectContent>
                {reportReasons.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Quick Filters */}
          <div>
            <span className="block text-sm text-neutral-700 mb-1">Quick Filters</span>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={showRepeat ? "default" : "outline"}
                onClick={() => setShowRepeat((v) => !v)}
              >
                Repeat Offenders
              </Button>
              <Button
                size="sm"
                variant={reasonFilter === "Spam" ? "default" : "outline"}
                onClick={() => setReasonFilter("Spam")}
              >
                Spam
              </Button>
              <Button
                size="sm"
                variant={reasonFilter === "Inappropriate" ? "default" : "outline"}
                onClick={() => setReasonFilter("Inappropriate")}
              >
                Inappropriate
              </Button>
              <Button
                size="sm"
                variant={reasonFilter === "Plagiarism" ? "default" : "outline"}
                onClick={() => setReasonFilter("Plagiarism")}
              >
                Plagiarism
              </Button>
              <Button
                size="sm"
                variant={reasonFilter === "All" ? "default" : "outline"}
                onClick={() => setReasonFilter("All")}
              >
                All
              </Button>
            </div>
          </div>
          {/* Reset Filters */}
          <Button
            size="sm"
            variant="ghost"
            className="mt-2 text-neutral-500"
            onClick={() => {
              setShowRepeat(false);
              setReasonFilter("All");
              setDateFrom("");
              setDateTo("");
            }}
          >
            Reset Filters
          </Button>
        </aside>
        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <TabsTrigger value="videos" className="text-neutral-700 data-[state=active]:bg-neutral-200 data-[state=active]:font-bold">Video Pitches</TabsTrigger>
              <TabsTrigger value="messages" className="text-neutral-700 data-[state=active]:bg-neutral-200 data-[state=active]:font-bold">Messages</TabsTrigger>
              <TabsTrigger value="descriptions" className="text-neutral-700 data-[state=active]:bg-neutral-200 data-[state=active]:font-bold">Project Descriptions</TabsTrigger>
            </TabsList>
            <TabsContent value="videos">
              <div className="flex overflow-x-auto gap-4 pb-2">
                {filterItems(flaggedItems.videos).map((item) => (
                  <Card key={item.id} className="min-w-[320px] max-w-md flex-1 bg-white shadow border rounded-xl transition hover:shadow-md flex flex-col">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-neutral-800">
                        <span className="inline-block w-2 h-2 rounded-full bg-neutral-300 animate-pulse"></span>
                        {item.title}
                        <Badge variant="destructive">{item.flaggedReason}</Badge>
                        <span className="ml-auto text-xs text-neutral-400">Flags: {item.flagCount}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent
                      className="flex flex-col gap-3 cursor-pointer hover:bg-blue-50/50 transition"
                      onMouseEnter={() => setSelectedItem(item)}
                      tabIndex={0}
                      role="button"
                      aria-label="Show context"
                    >
                      <video src={item.url} controls className="w-full rounded border mb-1" />
                      <div className="flex items-center gap-2">
                        <img src={item.user.avatar} alt={item.user.name} className="w-8 h-8 rounded-full border" />
                        <div>
                          <div className="text-sm font-medium">{item.user.name}</div>
                          <div className="text-xs text-neutral-500">{item.user.email}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Button size="sm" onClick={e => { e.stopPropagation(); setViewModalItem(item); setSelectedItem(item); }}>
                          View Details
                        </Button>
                        <Button size="sm" className="bg-neutral-800 text-white hover:bg-neutral-900" onClick={e => { e.stopPropagation(); handleAction("Approve", item); }}>
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" onClick={e => { e.stopPropagation(); handleAction("Reject", item); }}>
                          Reject
                        </Button>
                        <Button size="sm" variant="outline" onClick={e => { e.stopPropagation(); handleAction("Request Resubmission", item); }}>
                          Request Resubmission
                        </Button>
                        <Button size="sm" variant="ghost" onClick={e => { e.stopPropagation(); handleAction("Ban User", item); }}>
                          Ban User
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="messages">
              <div className="flex overflow-x-auto gap-4 pb-2">
                {filterItems(flaggedItems.messages).map((item) => (
                  <Card key={item.id} className="min-w-[320px] max-w-md flex-1 bg-white shadow border rounded-xl transition hover:shadow-md flex flex-col">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-neutral-800">
                        <span className="inline-block w-2 h-2 rounded-full bg-neutral-300 animate-pulse"></span>
                        {item.content}
                        <Badge variant="destructive">{item.flaggedReason}</Badge>
                        <span className="ml-auto text-xs text-neutral-400">Flags: {item.flagCount}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent
                      className="flex flex-col gap-3 cursor-pointer hover:bg-blue-50/50 transition"
                      onMouseEnter={() => setSelectedItem(item)}
                      tabIndex={0}
                      role="button"
                      aria-label="Show context"
                    >
                      <div className="flex items-center gap-2">
                        <img src={item.user.avatar} alt={item.user.name} className="w-8 h-8 rounded-full border" />
                        <div>
                          <div className="text-sm font-medium">{item.user.name}</div>
                          <div className="text-xs text-neutral-500">{item.user.email}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Button size="sm" onClick={e => { e.stopPropagation(); setViewModalItem(item); setSelectedItem(item); }}>
                          View Details
                        </Button>
                        <Button size="sm" className="bg-neutral-800 text-white hover:bg-neutral-900" onClick={e => { e.stopPropagation(); handleAction("Approve", item); }}>
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" onClick={e => { e.stopPropagation(); handleAction("Reject", item); }}>
                          Reject
                        </Button>
                        <Button size="sm" variant="outline" onClick={e => { e.stopPropagation(); handleAction("Request Resubmission", item); }}>
                          Request Resubmission
                        </Button>
                        <Button size="sm" variant="ghost" onClick={e => { e.stopPropagation(); handleAction("Ban User", item); }}>
                          Ban User
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="descriptions">
              <div className="flex overflow-x-auto gap-4 pb-2">
                {filterItems(flaggedItems.descriptions).map((item) => (
                  <Card key={item.id} className="min-w-[320px] max-w-md flex-1 bg-white shadow border rounded-xl transition hover:shadow-md flex flex-col">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-neutral-800">
                        <span className="inline-block w-2 h-2 rounded-full bg-neutral-300 animate-pulse"></span>
                        {item.title}
                        <Badge variant="destructive">{item.flaggedReason}</Badge>
                        <span className="ml-auto text-xs text-neutral-400">Flags: {item.flagCount}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent
                      className="flex flex-col gap-3 cursor-pointer hover:bg-blue-50/50 transition"
                      onMouseEnter={() => setSelectedItem(item)}
                      tabIndex={0}
                      role="button"
                      aria-label="Show context"
                    >
                      <div className="flex items-center gap-2">
                        <img src={item.user.avatar} alt={item.user.name} className="w-8 h-8 rounded-full border" />
                        <div>
                          <div className="text-sm font-medium">{item.user.name}</div>
                          <div className="text-xs text-neutral-500">{item.user.email}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Button size="sm" onClick={e => { e.stopPropagation(); setViewModalItem(item); setSelectedItem(item); }}>
                          View Details
                        </Button>
                        <Button size="sm" className="bg-neutral-800 text-white hover:bg-neutral-900" onClick={e => { e.stopPropagation(); handleAction("Approve", item); }}>
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" onClick={e => { e.stopPropagation(); handleAction("Reject", item); }}>
                          Reject
                        </Button>
                        <Button size="sm" variant="outline" onClick={e => { e.stopPropagation(); handleAction("Request Resubmission", item); }}>
                          Request Resubmission
                        </Button>
                        <Button size="sm" variant="ghost" onClick={e => { e.stopPropagation(); handleAction("Ban User", item); }}>
                          Ban User
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
        {/* Sidebar */}
        <aside className="w-full md:w-80 bg-white border rounded-xl p-5 shadow h-fit mt-0">
          <h3 className="font-semibold text-base mb-2 text-neutral-700">Context</h3>
          {selectedItem ? (
            <>
              <div className="mb-2 flex items-center gap-2">
                <img src={selectedItem.user.avatar} alt={selectedItem.user.name} className="w-10 h-10 rounded-full border" />
                <div>
                  <span className="font-medium">{selectedItem.user.name}</span>
                  <div className="text-xs text-neutral-500">{selectedItem.user.email}</div>
                </div>
              </div>
              <div className="mb-2">
                <span className="font-medium">History:</span>
                <ul className="list-disc ml-5 text-sm">
                  {selectedItem.history?.map((h: string, i: number) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-medium">Infractions:</span> {selectedItem.infractions}
              </div>
            </>
          ) : (
            <span className="text-neutral-400">Select an item to view context.</span>
          )}
        </aside>
      </div>
      {/* View Modal */}
      <Dialog
        open={!!viewModalItem}
        onOpenChange={(open) => {
          if (!open) setViewModalItem(null);
        }}
      >
        <DialogContent className="max-w-lg w-full">
          <DialogHeader>
            <DialogTitle>Content Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {viewModalItem?.url && (
              <video src={viewModalItem.url} controls className="w-full rounded" />
            )}
            {viewModalItem?.content && (
              <div className="p-2 bg-neutral-50 rounded">{viewModalItem.content}</div>
            )}
            {viewModalItem?.title && (
              <div className="font-semibold">{viewModalItem.title}</div>
            )}
            {viewModalItem?.user && (
              <div className="flex items-center gap-3 mt-2">
                <img src={viewModalItem.user.avatar} alt={viewModalItem.user.name} className="w-10 h-10 rounded-full border" />
                <div>
                  <div className="font-medium">{viewModalItem.user.name}</div>
                  <div className="text-xs text-neutral-500">{viewModalItem.user.email}</div>
                </div>
              </div>
            )}
            <div>
              <span className="font-medium">History:</span>
              <ul className="list-disc ml-5 text-sm">
                {viewModalItem?.history?.map((h: string, i: number) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-medium">Infractions:</span> {viewModalItem?.infractions}
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" className="bg-neutral-800 text-white hover:bg-neutral-900" onClick={() => handleAction("Approve", viewModalItem)}>
                Approve
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleAction("Reject", viewModalItem)}>
                Reject
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ModerationQueue;