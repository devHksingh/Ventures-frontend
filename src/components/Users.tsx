import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { useNavigate } from "react-router-dom";
import { RoleDropdown } from "./admin/RoleDropdown";
import { PermissionMatrixModal } from "./admin/PermissionMatrixModal";
import { BulkActionsBar } from "./admin/BulkActionsBar";
import { Checkbox } from '@/components/ui/checkbox';
import { UserCircle2 } from 'lucide-react';

// Example startup data for founders (add videoUrl, team, problemSolution)
const founders = [
	{
		id: 1,
		name: 'Alex Rodriguez',
		startups: [
			{
				name: 'TechFlow',
				description: 'A platform for seamless workflow automation.',
				videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
				team: ['Alex Rodriguez', 'Jane Doe'],
				problemSolution:
					'Manual workflows are slow. TechFlow automates them, saving time and reducing errors.',
				ask: '$250,000 for 10% equity',
			},
			{
				name: 'CodePilot',
				description: 'AI-powered code review tool.',
				videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
				team: ['Alex Rodriguez', 'Sam Lee'],
				problemSolution:
					'Code reviews are tedious. CodePilot uses AI to automate and improve code quality.',
				ask: '$150,000 for 8% equity',
			},
			{
				name: 'firststart',
				description: 'AI-powered kitchen groceries tool.',
				videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
				team: ['Alex Rodriguez'],
				problemSolution:
					'Grocery management is hard. firststart uses AI to track and suggest groceries.',
				ask: '$100,000 for 12% equity',
			},
		],
		email: 'alex@techflow.com',
		registrationDate: '2024-01-10',
		status: 'active',
	},
	{
		id: 2,
		name: 'Sarah Chen',
		startups: [
			{
				name: 'AI Innovations',
				description: 'Cutting-edge AI solutions for businesses.',
				videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
				team: ['Sarah Chen', 'Priya Patel'],
				problemSolution:
					'Businesses struggle to adopt AI. AI Innovations provides easy integration and support.',
				ask: '$300,000 for 15% equity',
			},
		],
		email: 'sarah@aiinnovations.com',
		registrationDate: '2024-01-08',
		status: 'active',
	},
	{
		id: 3,
		name: 'Michael Thompson',
		startups: [
			{
				name: 'GreenTech',
				description: 'Eco-friendly technology for a sustainable future.',
				videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
				team: ['Michael Thompson'],
				problemSolution:
					'Sustainability is expensive. GreenTech makes eco-friendly solutions affordable.',
				ask: '$200,000 for 10% equity',
			},
			{
				name: 'Solarize',
				description: 'Affordable solar solutions for homes.',
				videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
				team: ['Michael Thompson', 'Liam Smith'],
				problemSolution:
					'Solar is costly. Solarize offers affordable, easy-to-install solar panels.',
				ask: '$400,000 for 20% equity',
			},
		],
		email: 'michael@greentech.com',
		registrationDate: '2024-01-05',
		status: 'pending',
	},
];

// Example: Add dummy funded startups and total investment for each investor
const investors = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@email.com',
    investmentsMade: 5,
    joinDate: '2023-12-15',
    status: 'active',
    fundedStartups: ['TechFlow', 'GreenTech', 'Solarize'],
    totalInvested: 500000,
  },
  {
    id: 2,
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    investmentsMade: 12,
    joinDate: '2023-11-20',
    status: 'active',
    fundedStartups: ['AI Innovations', 'CodePilot'],
    totalInvested: 1200000,
  },
  {
    id: 3,
    name: 'Robert Wilson',
    email: 'robert.wilson@email.com',
    investmentsMade: 3,
    joinDate: '2024-01-02',
    status: 'active',
    fundedStartups: ['firststart'],
    totalInvested: 300000,
  },
];

export function Users() {
	const [selectedFounder, setSelectedFounder] = useState<null | typeof founders[0]>(null);
	const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
	const [showPermissionModal, setShowPermissionModal] = useState(false);
	const [permissionUserId, setPermissionUserId] = useState<string | null>(null);
	const [selectedFounderIds, setSelectedFounderIds] = useState<number[]>([]);
	const [selectedInvestor, setSelectedInvestor] = useState<typeof investors[0] | null>(null);
	const navigate = useNavigate();

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'active':
				return 'bg-green-100 text-green-800';
			case 'pending':
				return 'bg-yellow-100 text-yellow-800';
			case 'inactive':
				return 'bg-gray-100 text-gray-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	// Dummy user data for illustration
	const users = [
		{ id: "1", name: "Alice", email: "alice@email.com", role: "User", status: "Active" },
		// ...more users...
	];

	// Handler for bulk selection
	const handleSelectUser = (userId: string, checked: boolean) => {
		setSelectedUsers(checked
			? [...selectedUsers, userId]
			: selectedUsers.filter(id => id !== userId)
		);
	};

	// Handler for permission modal
	const openPermissionModal = (userId: string) => {
		setPermissionUserId(userId);
		setShowPermissionModal(true);
	};

	// Bulk selection handlers
	const handleSelectFounder = (id: number, checked: boolean) => {
		setSelectedFounderIds(checked
			? [...selectedFounderIds, id]
			: selectedFounderIds.filter(fid => fid !== id)
		);
	};

	const handleSelectAllFounders = (checked: boolean) => {
		setSelectedFounderIds(checked ? founders.map(f => f.id) : []);
	};

	// Dummy role/permission handlers
	const handleRoleChange = (userId: number, newRole: string) => {
		// TODO: Update role in Firestore
		console.log(`Set role for founder ${userId} to ${newRole}`);
	};

	return (
		<div className="space-y-10 p-6 bg-gradient-to-br from-indigo-50 via-white to-blue-50 min-h-screen">
		 <div className="flex items-center gap-3 mb-2">
        <UserCircle2 className="w-10 h-10 text-indigo-500" />
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Users Dashboard</h1>
      </div>
			<Tabs defaultValue="founders" className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="founders">Founders</TabsTrigger>
					<TabsTrigger value="investors">Investors</TabsTrigger>
				</TabsList>

				<TabsContent value="founders" className="mt-6">
					<Card>
						<CardHeader>
							<div className="flex justify-between items-center">
								<CardTitle>Founders</CardTitle>
								<Badge variant="secondary">{founders.length} Total</Badge>
							</div>
						</CardHeader>
						<CardContent>
							{/* Bulk Actions Bar */}
							<BulkActionsBar
                selectedUserIds={selectedFounderIds.map(String)}
                onApprove={() => alert('Bulk approve')}
                onSuspend={() => alert('Bulk suspend')}
                onDelete={() => alert('Bulk delete')}
              />
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead>
										<tr className="border-b border-gray-200">
											<th>
												<Checkbox
													checked={selectedFounderIds.length === founders.length}
													onCheckedChange={handleSelectAllFounders}
												/>
											</th>
											<th className="text-left py-3 px-4 font-medium text-gray-500">Name</th>
											<th className="text-left py-3 px-4 font-medium text-gray-500">
												Total Startups
											</th>
											<th className="text-left py-3 px-4 font-medium text-gray-500">Email</th>
											<th className="text-left py-3 px-4 font-medium text-gray-500">
												Registration Date
											</th>
											<th className="text-left py-3 px-4 font-medium text-gray-500">Role</th>
											<th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
											<th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
										</tr>
									</thead>
									<tbody>
										{founders.map((founder) => (
											<tr
												key={founder.id}
												className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
											>
												<td>
													<Checkbox
														checked={selectedFounderIds.includes(founder.id)}
														onCheckedChange={checked => handleSelectFounder(founder.id, Boolean(checked))}
													/>
												</td>
												<td className="py-3 px-4 font-medium">{founder.name}</td>
												<td className="py-3 px-4">{founder.startups.length}</td>
												<td className="py-3 px-4 text-gray-600">{founder.email}</td>
												<td className="py-3 px-4 text-gray-500">{founder.registrationDate}</td>
												<td className="py-3 px-4">
													<RoleDropdown
                            userId={String(founder.id)}
                            currentRole="User"
                            onChange={role => handleRoleChange(founder.id, role)}
                          />
												</td>
												<td className="py-3 px-4">
													<Badge className={getStatusColor(founder.status)}>
														{founder.status}
													</Badge>
												</td>
												<td className="py-3 px-4 flex gap-2 flex-wrap">
													<Button
														variant="outline"
														size="sm"
														onClick={() => setSelectedFounder(founder)}
													>
														View Details
													</Button>
													<Button
														variant="secondary"
														size="sm"
														onClick={() => {
															setPermissionUserId(String(founder.id));
															setShowPermissionModal(true);
														}}
													>
														Permissions
													</Button>
													<Button
														variant="ghost"
														size="sm"
														onClick={() => navigate(`/impersonate/${founder.id}`)}
													>
														Login as User
													</Button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="investors" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Investors</CardTitle>
                <Badge variant="secondary">{investors.length} Total</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* Bulk Actions Bar for Investors */}
              <BulkActionsBar
                selectedUserIds={selectedUsers}
                onApprove={() => alert('Bulk approve')}
                onSuspend={() => alert('Bulk suspend')}
                onDelete={() => alert('Bulk delete')}
              />
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th>
                        <Checkbox
                          checked={selectedUsers.length === investors.length}
                          onCheckedChange={checked =>
                            setSelectedUsers(checked ? investors.map(i => String(i.id)) : [])
                          }
                        />
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">
                        Investments Made
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">
                        Total Invested
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Join Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investors.map((investor) => (
                      <tr
                        key={investor.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td>
                          <Checkbox
                            checked={selectedUsers.includes(String(investor.id))}
							onCheckedChange={checked =>
							  setSelectedUsers(
								checked
								  ? [...selectedUsers, String(investor.id)]
								  : selectedUsers.filter(id => id !== String(investor.id))
							  )
							}
                          />
                        </td>
                        <td className="py-3 px-4 font-medium">{investor.name}</td>
                        <td className="py-3 px-4 text-gray-600">{investor.email}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{investor.investmentsMade}</Badge>
                        </td>
                        <td className="py-3 px-4 font-semibold text-blue-700">
                          ${investor.totalInvested.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-gray-500">{investor.joinDate}</td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(investor.status)}>
                            {investor.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 flex gap-2 flex-wrap">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedInvestor(investor)}
                          >
                            View Details
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/impersonate/${investor.id}`)}
                          >
                            Login as User
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
			</Tabs>

			{/* Founder Details Modal */}
			<Dialog open={!!selectedFounder} onOpenChange={() => setSelectedFounder(null)}>
				<DialogContent
					className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-100 p-4 md:p-6 shadow-2xl transition-all duration-300 ease-in-out animate-fadeIn w-full max-w-2xl max-h-[85vh] overflow-y-auto"
					style={{ overscrollBehavior: 'contain' }}
				>
					<DialogHeader>
						<DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
							<svg
								className="w-6 h-6 text-blue-500"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M13 16h-1v-4h-1m1-4h.01M12 20.5C6.201 20.5 1 15.299 1 9.5S6.201-1.5 12-1.5 23 4.701 23 10.5 17.799 20.5 12 20.5z"
								/>
							</svg>
							{selectedFounder ? `${selectedFounder.name}'s Startups` : ''}
						</DialogTitle>
						<DialogDescription className="text-gray-500 mt-2 text-base">
							Explore each startup's pitch, team, and vision.
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-6">
						{selectedFounder && selectedFounder.startups.length > 0 ? (
							selectedFounder.startups.map((startup, idx) => (
								<Card
									key={idx}
									className="p-0 border-none shadow-none bg-gradient-to-tr from-blue-50 via-white to-gray-50 rounded-xl"
								>
									<CardHeader className="pb-3 flex flex-row items-center gap-4">
										<div className="flex items-center gap-2">
											<svg
												className="w-5 h-5 text-indigo-500"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M12 4v16m8-8H4"
												/>
											</svg>
											<strong className="text-base text-gray-900">{startup.name}</strong>
										</div>
										<span className="ml-auto text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
											{startup.team?.length || 1} Team Member
											{startup.team && startup.team.length > 1 ? 's' : ''}
										</span>
									</CardHeader>
									<CardContent className="space-y-4">
										{/* Video & Tabs Section */}
										<div className="flex flex-col md:flex-row gap-4">
											<div className="flex-1 min-w-[160px] max-w-full">
												{startup.videoUrl ? (
													<div className="rounded-lg overflow-hidden shadow border border-gray-200 bg-black flex items-center justify-center">
														<video
															src={startup.videoUrl}
															controls
															className="w-full h-40 md:h-44 object-cover bg-black"
															poster="https://source.unsplash.com/600x300/?startup,technology"
															style={{ maxHeight: 180 }}
														>
															Your browser does not support the video tag.
														</video>
													</div>
												) : (
													<div className="flex items-center justify-center h-40 md:h-44 bg-gray-100 rounded-lg text-gray-400 italic">
														No intro video available.
													</div>
												)}
											</div>
											{/* Tabs Section */}
											<div className="flex-1 min-w-[160px] max-w-full">
												<Tabs defaultValue="overview" className="w-full">
													<TabsList className="mb-4 w-full grid grid-cols-4 gap-2 bg-gray-100 rounded-lg p-2">
                            <TabsTrigger value="overview" className="text-sm py-2">Overview</TabsTrigger>
                            <TabsTrigger value="team" className="text-sm py-2">Team</TabsTrigger>
                            <TabsTrigger value="problem" className="text-sm py-2">Pitch</TabsTrigger>
                            <TabsTrigger value="ask" className="text-sm py-2">Ask</TabsTrigger>
                          </TabsList>
													<TabsContent value="overview">
														<div className="text-gray-700 text-sm break-words">
															{startup.description}
														</div>
													</TabsContent>
													<TabsContent value="team">
														<ul className="list-disc pl-5 text-gray-700 text-sm">
															{startup.team && startup.team.length > 0 ? (
																startup.team.map((member, i) => <li key={i}>{member}</li>)
															) : (
																<li className="italic text-gray-400">No team info.</li>
															)}
														</ul>
													</TabsContent>
													<TabsContent value="problem">
														<div className="text-gray-700 text-sm break-words">
															{startup.problemSolution || (
																<span className="italic text-gray-400">
																	No problem-solution info.
																</span>
															)}
														</div>
													</TabsContent>
													<TabsContent value="ask">
														<div className="flex flex-col items-start gap-1">
															<span className="font-semibold text-blue-700 text-sm">Ask:</span>
															<span className="text-gray-800 text-base">
																{startup.ask && typeof startup.ask === 'string' && startup.ask.trim() !== ''
																	? startup.ask
																	: <span className="italic text-gray-400">No ask specified.</span>
																}
															</span>
														</div>
													</TabsContent>
												</Tabs>
											</div>
										</div>
									</CardContent>
								</Card>
							))
						) : (
							<span className="italic text-gray-400">No startups found.</span>
						)}
					</div>
					<div className="mt-6 text-sm text-gray-800 bg-gray-50 rounded-lg p-3 flex items-center gap-2">
						<svg
							className="w-4 h-4 text-gray-400"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							viewBox="0 0 24 24"
						>
							<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2 2" />
						</svg>
						<strong>Founder:</strong> {selectedFounder?.name}
					</div>
					<DialogClose asChild>
						<Button
							variant="secondary"
							className="mt-8 w-full rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold shadow text-base"
						>
							Close
						</Button>
					</DialogClose>
				</DialogContent>
			</Dialog>

			{/* Permissions Modal */}
			{showPermissionModal && permissionUserId && (
        <PermissionMatrixModal
          userId={permissionUserId}
          onClose={() => setShowPermissionModal(false)}
        />
      )}

			{/* Investor Details Dialog */}
			<Dialog open={!!selectedInvestor} onOpenChange={() => setSelectedInvestor(null)}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>
              {selectedInvestor ? `${selectedInvestor.name}'s Investments` : ''}
            </DialogTitle>
          </DialogHeader>
          {selectedInvestor && (
            <div className="space-y-4">
              <div>
                <span className="font-semibold">Total Invested:</span>{" "}
                <span className="text-blue-700 font-bold">${selectedInvestor.totalInvested.toLocaleString()}</span>
              </div>
              <div>
                <span className="font-semibold">Number of Startups Funded:</span>{" "}
                <span className="text-blue-700 font-bold">{selectedInvestor.fundedStartups.length}</span>
              </div>
              <div>
                <span className="font-semibold">Funded Startups:</span>
                <ul className="list-disc ml-6 mt-1 text-gray-700">
                  {selectedInvestor.fundedStartups.map((startup, idx) => (
                    <li key={idx}>{startup}</li>
                  ))}
                </ul>
              </div>
              <DialogClose asChild>
                <Button variant="secondary" className="mt-4 w-full">
                  Close
                </Button>
              </DialogClose>
            </div>
          )}
        </DialogContent>
      </Dialog>
		</div>
	);
};
