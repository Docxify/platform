interface Activity {
    doc: string;
    project: string;
    time: string;
    change: string;
    url: string;
  }
  
  interface Member {
    name: string;
    role: string;
    email: string;
    lastActive: string;
  }
  
  interface TeamPageProps {
    activities?: Activity[];
    members?: Member[];
  }
  
  export default function Team({ activities = [], members = [] }: TeamPageProps) {
    // Mock member data (replace with actual data from your backend or props)
    const defaultMembers: Member[] = members.length
      ? members
      : [
          { name: "Alice Smith", role: "Developer", email: "alice@team.com", lastActive: "2025-05-18" },
          { name: "Bob Jones", role: "Designer", email: "bob@team.com", lastActive: "2025-05-17" },
          { name: "Charlie Brown", role: "Manager", email: "charlie@team.com", lastActive: "2025-05-19" },
        ];
  
    return (
      <div className="container mx-auto p-4 lg:p-8 xl:max-w-7xl">
        {/* Team Members Section */}
        <h2 className="text-md font-bold mb-5 text-black">Team Members</h2>
        <div className="mb-8">
          {/* Mobile View: Card-like for Members */}
          <div className="sm:hidden space-y-4">
            {defaultMembers.length === 0 ? (
              <div className="text-sm text-zinc-500 text-center">No team members</div>
            ) : (
              defaultMembers.map((member, i) => (
                <div
                  key={i}
                  className="border border-zinc-200 rounded-lg p-4 shadow-sm hover:bg-zinc-50"
                >
                  <p className="text-sm font-semibold text-zinc-900">{member.name}</p>
                  <p className="text-sm text-zinc-700">Role: {member.role}</p>
                  <p className="text-sm text-zinc-600">Email: {member.email}</p>
                  <p className="text-sm text-zinc-500">Last Active: {member.lastActive}</p>
                </div>
              ))
            )}
          </div>
  
          {/* Desktop View: Table for Members */}
          <div className="hidden sm:block overflow-x-auto rounded-lg border border-zinc-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-zinc-200">
              <thead className="bg-zinc-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-700">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-700">Last Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {defaultMembers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-zinc-500">
                      No team members
                    </td>
                  </tr>
                ) : (
                  defaultMembers.map((member, i) => (
                    <tr key={i} className="hover:bg-zinc-50">
                      <td className="px-6 py-4 text-sm font-medium text-zinc-900">{member.name}</td>
                      <td className="px-6 py-4 text-sm text-zinc-700">{member.role}</td>
                      <td className="px-6 py-4 text-sm text-zinc-600">{member.email}</td>
                      <td className="px-6 py-4 text-sm text-zinc-500">{member.lastActive}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
  
      </div>
    );
  }