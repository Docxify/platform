interface Activity {
  doc: string;
  project: string;
  time: string;
  change: string;
  url: string;
}

interface ActivityFeedProps {
  items?: Activity[];
}

export default function ActivityFeed({ items = [] }: ActivityFeedProps) {
  return (
    <div className="container mx-auto p-4 lg:p-8 xl:max-w-7xl">
      <h2 className="text-md font-bold mb-5 text-black">Recent Activities</h2>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-4">
        {items.length === 0 ? (
          <div className="text-sm text-zinc-500 text-center">No recent activity</div>
        ) : (
          items.map((item, i) => (
            <div
              key={i}
              onClick={() => window.open(item.url, '_blank')}
              className="border border-zinc-200 rounded-lg p-4 shadow-sm hover:bg-zinc-50 cursor-pointer"
            >
              <p className="text-sm font-semibold text-zinc-900">{item.doc}</p>
              <p className="text-sm text-zinc-700">Project: {item.project}</p>
              <p className="text-sm italic text-zinc-600">Change: {item.change}</p>
              <p className="text-sm text-zinc-500">Time: {item.time}</p>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto rounded-lg border border-zinc-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-zinc-200">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-700">Document</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-700">Project</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-700">Change</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-700">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-zinc-500">
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
                  <td className="px-6 py-4 text-sm font-medium text-zinc-900 whitespace-normal sm:whitespace-nowrap">
                    {item.doc}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-700 whitespace-normal sm:whitespace-nowrap">
                    {item.project}
                  </td>
                  <td className="px-6 py-4 text-sm italic text-zinc-600 whitespace-normal sm:whitespace-nowrap">
                    {item.change}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-500 whitespace-normal sm:whitespace-nowrap">
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
