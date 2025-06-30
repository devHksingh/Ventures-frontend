import React from 'react';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export function Table({ children, className = '' }: TableProps) {
  return (
    <div className="w-full overflow-auto">
      <table className={`min-w-full divide-y divide-slate-300 ${className}`}>
        {children}
      </table>
    </div>
  );
}

interface TableHeaderProps {
  children: React.ReactNode;
}

export function TableHeader({ children }: TableHeaderProps) {
  return (
    <thead className="bg-slate-100">
      <tr>
        {children}
      </tr>
    </thead>
  );
}

interface TableHeadCellProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
}

export function TableHeadCell({ 
  children, 
  className = '', 
  onClick,
  sortable = false,
  sortDirection = null 
}: TableHeadCellProps) {
  return (    <th
      scope="col"
      className={`px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider ${sortable ? 'cursor-pointer hover:bg-slate-200' : ''} ${className}`}
      onClick={sortable ? onClick : undefined}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {sortable && (
          <span className="ml-1">
            {sortDirection === 'asc' && '↑'}
            {sortDirection === 'desc' && '↓'}
            {sortDirection === null && '↕'}
          </span>
        )}
      </div>
    </th>
  );
}

interface TableBodyProps {
  children: React.ReactNode;
}

export function TableBody({ children }: TableBodyProps) {
  return <tbody className="bg-white divide-y divide-slate-300">{children}</tbody>;
}

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function TableRow({ children, className = '', onClick }: TableRowProps) {
  return (
    <tr 
      className={`${onClick ? 'cursor-pointer hover:bg-slate-100' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

export function TableCell({ children, className = '' }: TableCellProps) {
  return (
    <td className={`px-6 py-4 whitespace-nowrap text-sm text-black ${className}`}>
      {children}
    </td>
  );
}

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: TablePaginationProps) {  return (
    <div className={`flex items-center justify-between px-4 py-3 bg-white border-t border-slate-300 sm:px-6 ${className}`}>
      <div className="flex-1 flex justify-between items-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 border border-slate-400 text-sm font-medium rounded-md text-black bg-white hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <p className="text-sm text-black">
          Page <span className="font-medium">{currentPage}</span> of{' '}
          <span className="font-medium">{totalPages}</span>
        </p>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-4 py-2 border border-slate-400 text-sm font-medium rounded-md text-black bg-white hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
