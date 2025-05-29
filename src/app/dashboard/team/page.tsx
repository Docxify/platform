'use client';

import { useState } from 'react';
import AddMemberButton from '@/components/AddMemberButton';
import EditRoleButton from '@/components/EditRoleButton';
import AddMemberModal from '@/components/AddMemberModal';
import EditRoleModal from '@/components/EditRoleModal';
import DeleteTeamMemberButton from '@/components/DeleteTeamMemberButton';

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
  const [teamMembers, setTeamMembers] = useState<Member[]>(
    members.length
      ? members
      : [
          { name: 'Alice Smith', role: 'Owner', email: 'alice@team.com', lastActive: '2025-05-18' },
          { name: 'Bob Jones', role: 'Member', email: 'bob@team.com', lastActive: '2025-05-17' },
          { name: 'Charlie Brown', role: 'Member', email: 'charlie@team.com', lastActive: '2025-05-19' },
        ]
  );

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const handleAddMember = (newMember: { name: string; role: string; email: string; lastActive: string }) => {
    setTeamMembers([...teamMembers, { ...newMember, lastActive: newMember.lastActive || new Date().toISOString().split('T')[0] }]);
    setIsAddModalOpen(false);
  };

  const handleEditRole = (role: string) => {
    if (selectedMember) {
      setTeamMembers(
        teamMembers.map((member) =>
          member.email === selectedMember.email ? { ...member, role } : member
        )
      );
      setIsEditModalOpen(false);
      setSelectedMember(null);
    }
  };

  const handleDeleteMember = (member: Member) => {
    if (window.confirm(`Are you sure you want to delete ${member.name} from the team?`)) {
      setTeamMembers(teamMembers.filter((m) => m.email !== member.email));
    }
  };

  const openEditModal = (member: Member) => {
    setSelectedMember(member);
    setIsEditModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 xl:max-w-7xl">
      {/* Team Members Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-md font-bold text-black">Team Members</h2>
          <AddMemberButton onClick={() => setIsAddModalOpen(true)} />
        </div>

        {/* Table View for All Screen Sizes */}
        <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white">
          <table className="min-w-full divide-y divide-zinc-200">
            <thead className="bg-zinc-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-700">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-700">Last Active</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {teamMembers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-zinc-500">
                    No team members
                  </td>
                </tr>
              ) : (
                teamMembers.map((member, i) => (
                  <tr key={i} className="hover:bg-zinc-50">
                    <td className="px-6 py-4 text-sm font-medium text-zinc-900">{member.name}</td>
                    <td className="px-6 py-4 text-sm text-zinc-700">{member.role}</td>
                    <td className="px-6 py-4 text-sm text-zinc-600">{member.email}</td>
                    <td className="px-6 py-4 text-sm text-zinc-500">{member.lastActive}</td>
                    <td className="px-6 py-4 text-sm flex gap-2">
                      <EditRoleButton onClick={() => openEditModal(member)} />
                      <DeleteTeamMemberButton onClick={() => handleDeleteMember(member)} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddMember}
      />
      <EditRoleModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        member={selectedMember}
        onEdit={handleEditRole}
      />
    </div>
  );
}