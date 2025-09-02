import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className = '',
  separator = '>'
}) => {
  return (
    <nav className={`flex items-center text-sm text-gray-600 space-x-2 mb-4 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {item.href ? (
            <Link
              to={item.href}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className={`${item.isCurrent ? 'font-semibold text-gray-800' : 'text-gray-600'} truncate max-w-xs`}>
              {item.label}
            </span>
          )}
          
          {index < items.length - 1 && (
            <span className="mx-2">{separator}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;