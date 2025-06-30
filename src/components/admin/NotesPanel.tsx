import React, { useState } from "react";
import {
	Card,
	CardHeader,
	CardContent,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	UserIcon,
	BellIcon,
	TagIcon,
	MessageCircleIcon,
	CheckCircle2,
} from "lucide-react";

// Dummy data
const initialNotes = [
	{ id: 1, user: "Alex Rodriguez", content: "Flagged for suspicious activity.", date: "2025-05-01" },
	{ id: 2, user: "Sarah Chen", content: "Requested more docs.", date: "2025-05-02" },
];
const initialChats = [
	{ id: 1, sender: "Admin1", message: "Should we escalate Alex's case?", date: "2025-05-01 10:00" },
	{ id: 2, sender: "Admin2", message: "Yes, let's add to watchlist.", date: "2025-05-01 10:05" },
];
const initialReminders = [
	{ id: 1, user: "Michael Thompson", tag: "Watchlist", note: "Review next week", date: "2025-05-03" },
];

export default function NotesPanel() {
	const [activeTab, setActiveTab] = useState("notes");
	const [notes, setNotes] = useState(initialNotes);
	const [chats, setChats] = useState(initialChats);
	const [reminders, setReminders] = useState(initialReminders);

	const [noteInput, setNoteInput] = useState("");
	const [chatInput, setChatInput] = useState("");
	const [reminderInput, setReminderInput] = useState("");
	const [reminderUser, setReminderUser] = useState("");
	const [reminderTag, setReminderTag] = useState("Watchlist");

	const [modalItem, setModalItem] = useState<any>(null);
	const [successMessage, setSuccessMessage] = useState("");

	const handleSuccess = (msg: string) => {
		setSuccessMessage(msg);
		setTimeout(() => setSuccessMessage(""), 2000);
	};

	return (
		<div className="w-full max-w-4xl mx-auto py-10 px-4">
			<Card className="shadow-lg border border-neutral-200 bg-white/90">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-neutral-800 text-xl">
						<MessageCircleIcon className="w-5 h-5 text-blue-500" />
						Internal Admin Panel
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Tabs value={activeTab} onValueChange={setActiveTab}>
						<TabsList className="sticky top-0 z-10 flex justify-center mb-6 bg-neutral-50 rounded-lg border border-neutral-200 shadow-sm">
							<TabsTrigger value="notes" className="flex items-center gap-1">
								<UserIcon className="w-4 h-4" /> Notes
							</TabsTrigger>
							<TabsTrigger value="chat" className="flex items-center gap-1">
								<MessageCircleIcon className="w-4 h-4" /> Chat
							</TabsTrigger>
							<TabsTrigger value="reminders" className="flex items-center gap-1">
								<BellIcon className="w-4 h-4" /> Reminders
							</TabsTrigger>
						</TabsList>

						{/* Notes Tab */}
						<TabsContent value="notes">
							<div className="space-y-4">
								<h2 className="text-lg font-semibold text-neutral-700">Private Notes</h2>
								<div className="grid gap-4">
									{notes.map(note => (
										<Card key={note.id} className="bg-neutral-50 border p-3 flex justify-between items-start">
											<div>
												<div className="font-medium">{note.user}</div>
												<p className="text-sm text-neutral-700">{note.content}</p>
												<span className="text-xs text-neutral-400">{note.date}</span>
											</div>
											<Button size="sm" variant="outline" onClick={() => setModalItem(note)}>
												View
											</Button>
										</Card>
									))}
								</div>
								<form
									className="flex gap-2"
									onSubmit={(e) => {
										e.preventDefault();
										if (!noteInput.trim()) return;
										setNotes([...notes, {
											id: Date.now(),
											user: "You",
											content: noteInput,
											date: new Date().toISOString().slice(0, 10),
										}]);
										setNoteInput("");
										handleSuccess("Note added.");
									}}
								>
									<Textarea
										placeholder="Add a private note..."
										value={noteInput}
										onChange={(e) => setNoteInput(e.target.value)}
										className="flex-1"
									/>
									<Button type="submit" size="sm">Add</Button>
								</form>
							</div>
						</TabsContent>

						{/* Chat Tab */}
						<TabsContent value="chat">
							<div className="space-y-4">
								<h2 className="text-lg font-semibold text-neutral-700">Admin Chat</h2>
								<div className="max-h-64 overflow-y-auto space-y-3 pr-1">
									{chats.map(chat => (
										<div key={chat.id} className="flex items-start gap-2">
											<Badge variant="secondary">{chat.sender}</Badge>
											<div>
												<p className="text-sm">{chat.message}</p>
												<p className="text-xs text-neutral-400">{chat.date}</p>
											</div>
										</div>
									))}
								</div>
								<form
									className="flex gap-2"
									onSubmit={(e) => {
										e.preventDefault();
										if (!chatInput.trim()) return;
										setChats([...chats, {
											id: Date.now(),
											sender: "You",
											message: chatInput,
											date: new Date().toLocaleString(),
										}]);
										setChatInput("");
										handleSuccess("Message sent.");
									}}
								>
									<Input
										placeholder="Send a message..."
										value={chatInput}
										onChange={(e) => setChatInput(e.target.value)}
									/>
									<Button type="submit" size="sm">Send</Button>
								</form>
							</div>
						</TabsContent>

						{/* Reminders Tab */}
						<TabsContent value="reminders">
							<div className="space-y-4">
								<h2 className="text-lg font-semibold text-neutral-700">Reminders / Tags</h2>
								<div className="grid gap-4">
									{reminders.map(rem => (
										<Card key={rem.id} className="bg-neutral-50 border p-3 flex justify-between items-start">
											<div>
												<div className="font-medium">{rem.user}</div>
												<p className="text-sm text-neutral-700">{rem.note}</p>
												<div className="flex items-center gap-2 mt-1">
													<Badge variant="outline">
														<TagIcon className="w-3 h-3 mr-1" />
														{rem.tag}
													</Badge>
													<span className="text-xs text-neutral-400">{rem.date}</span>
												</div>
											</div>
											<Button size="sm" variant="outline" onClick={() => setModalItem(rem)}>
												View
											</Button>
										</Card>
									))}
								</div>
								<form
									className="space-y-2"
									onSubmit={(e) => {
										e.preventDefault();
										if (!reminderInput.trim() || !reminderUser.trim()) return;
										setReminders([...reminders, {
											id: Date.now(),
											user: reminderUser,
											tag: reminderTag,
											note: reminderInput,
											date: new Date().toISOString().slice(0, 10),
										}]);
										setReminderInput("");
										setReminderUser("");
										handleSuccess("Reminder added.");
									}}
								>
									<div className="flex gap-2">
										<Input
											placeholder="User or Startup"
											value={reminderUser}
											onChange={(e) => setReminderUser(e.target.value)}
										/>
										<select
											value={reminderTag}
											onChange={(e) => setReminderTag(e.target.value)}
											className="border rounded-md px-2 py-1 text-sm bg-white"
										>
											<option>Watchlist</option>
											<option>Follow Up</option>
											<option>Flagged</option>
											<option>Pending Docs</option>
										</select>
									</div>
									<Textarea
										placeholder="Reminder note..."
										value={reminderInput}
										onChange={(e) => setReminderInput(e.target.value)}
									/>
									<Button type="submit" size="sm">Add</Button>
								</form>
							</div>
						</TabsContent>
					</Tabs>

					{/* Success Message */}
					{successMessage && (
						<div className="flex items-center gap-2 mt-4 text-green-600 text-sm font-medium">
							<CheckCircle2 className="w-4 h-4" /> {successMessage}
						</div>
					)}
				</CardContent>
			</Card>

			{/* Modal */}
			<Dialog open={!!modalItem} onOpenChange={() => setModalItem(null)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Details</DialogTitle>
					</DialogHeader>
					<div className="space-y-2">
						{modalItem?.user && <div className="font-semibold">{modalItem.user}</div>}
						{modalItem?.content && <div>{modalItem.content}</div>}
						{modalItem?.note && <div>{modalItem.note}</div>}
						{modalItem?.tag && (
							<Badge variant="outline">
								<TagIcon className="w-3 h-3 mr-1" />
								{modalItem.tag}
							</Badge>
						)}
						{modalItem?.sender && <div className="font-semibold">{modalItem.sender}</div>}
						{modalItem?.message && <div>{modalItem.message}</div>}
						{modalItem?.date && <div className="text-xs text-neutral-400">{modalItem.date}</div>}
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
