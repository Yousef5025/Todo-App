import { Link } from '@inertiajs/react';

export default function Pagination({ meta, links }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6 mt-5">
      {/* Pagination content */}
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">

        <div>
          <nav className="relative z-0 inline-flex  rounded-md shadow-sm -space-x-px">
            {links.map((link, index) => (
              <Link
                preserveScroll
                key={index}
                href={link.url || '#'}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${link.active
                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
