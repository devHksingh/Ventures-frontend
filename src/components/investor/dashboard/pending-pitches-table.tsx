import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHeadCell, 
  TableCell,
  TablePagination
} from '../ui/table';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface PendingPitch {
  id: string;
  ideaName: string;
  category: string;
  pitchDate: string;
  amountInvested: number;
  status: 'pending' | 'approved' | 'rejected';
}

interface PendingPitchesTableProps {
  pitches: PendingPitch[];
  isLoading?: boolean;
}

export default function PendingPitchesTable({ 
  pitches = [], 
  isLoading = false 
}: PendingPitchesTableProps) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  
  const displayPitches = pitches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const totalPages = Math.ceil(pitches.length / itemsPerPage);

  const handleViewDetails = (id: string) => {
    console.log(`View details for pitch ${id}`);
    // Implement view details functionality
  };

  const renderStatus = (status: string) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          statusStyles[status as keyof typeof statusStyles]
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="grid grid-cols-5 gap-4">
                  <div className="h-4 bg-gray-200 rounded col-span-1"></div>
                  <div className="h-4 bg-gray-200 rounded col-span-1"></div>
                  <div className="h-4 bg-gray-200 rounded col-span-1"></div>
                  <div className="h-4 bg-gray-200 rounded col-span-1"></div>
                  <div className="h-4 bg-gray-200 rounded col-span-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (pitches.length === 0) {
    return (
      <Card className="overflow-hidden">
        <div className="p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No pending pitches</h3>
          <p className="mt-1 text-sm text-gray-500">
            You don&apos;t have any pending pitch decisions at the moment.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-medium text-gray-900">Pending Pitch Decisions</h2>
        <p className="mt-1 text-sm text-gray-500">
          Review and manage your pending investment pitch decisions.
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableHeadCell>Idea Name</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>Pitch Date</TableHeadCell>
            <TableHeadCell>Amount Invested</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableHeader>
          
          <TableBody>
            {displayPitches.map((pitch) => (
              <TableRow key={pitch.id}>
                <TableCell className="font-medium text-gray-900">
                  {pitch.ideaName}
                </TableCell>
                <TableCell>{pitch.category}</TableCell>
                <TableCell>{pitch.pitchDate}</TableCell>
                <TableCell>${pitch.amountInvested.toLocaleString()}</TableCell>
                <TableCell>{renderStatus(pitch.status)}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(pitch.id)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </Card>
  );
}
