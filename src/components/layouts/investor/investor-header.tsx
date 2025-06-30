import React from 'react';

interface InvestorHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function InvestorHeader({ title, subtitle, actions }: InvestorHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-lg text-gray-600">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center space-x-3">
          {actions}
        </div>
      )}
    </div>
  );
}
