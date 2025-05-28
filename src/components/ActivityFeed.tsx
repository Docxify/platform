'use client';

interface Activity {
  doc: string;
  project: string;
  time: string;
  change: string;
  deployment: string;
  url: string;
}

interface ActivityFeedProps {
  items?: Activity[];
}

export default function ActivityFeed({ items = [] }: ActivityFeedProps) {
  return (
    <div className="container mx-auto p-4 lg:p-8 xl:max-w-7xl">
      <h2 className="text-md font-bold mb-5 text-black">Recent Activities</h2>

      {/* Table View for All Screen Sizes */}
      <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-zinc-200">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-zinc-700 sm:px-6 sm:py-3 sm:text-sm">
                Document
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-zinc-700 sm:px-6 sm:py-3 sm:text-sm">
                Project
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-zinc-700 sm:px-6 sm:py-3 sm:text-sm">
                Change
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-zinc-700 sm:px-6 sm:py-3 sm:text-sm">
                Deployment Check
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-zinc-700 sm:px-6 sm:py-3 sm:text-sm">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-3 text-center text-xs text-zinc-500 sm:px-6 sm:py-4 sm:text-sm"
                >
                  No recent activity
                </td>
              </tr>
            ) : (
              items.map((item, i) => (
                <tr
                  key={i}
                  className="hover:bg-zinc-50 cursor-pointer"
                  onClick={() => window.open(item.url, '_blank')}
                >
                  <td className="px-4 py-3 text-xs font-medium text-zinc-900 sm:px-6 sm:py-4 sm:text-sm">
                    {item.doc}
                  </td>
                  <td className="px-4 py-3 text-xs text-zinc-700 sm:px-6 sm:py-4 sm:text-sm">
                    {item.project}
                  </td>
                  <td className="px-4 py-3 text-xs italic text-zinc-600 sm:px-6 sm:py-4 sm:text-sm">
                    {item.change}
                  </td>
                  <td className="px-4 py-3 text-xs text-zinc-600 sm:px-6 sm:py-4 sm:text-sm">
                    <span className="text-xs font-medium text-green-600 bg-green-200 px-2 py-1 rounded-full">
                      {item.deployment}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-zinc-500 sm:px-6 sm:py-4 sm:text-sm">
                    {item.time}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}