import { useState } from 'react';
import SessionRow from './SessionRow.jsx';

const SessionTable = ({ title = 'Sessions', sessions, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="p-1 space-y-2">
      <h2 className="flex justify-between items-center text-sm font-semibold">
        <span>{title}</span>
      </h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
            <th className="py-1 md:px-2 text-left">Date</th>
            <th className="py-1 md:px-2 text-left">In</th>
            <th className="py-1 md:px-2 text-left">Out</th>
            {!isEditing && <th className="py-1 md:px-2 text-left">Duration</th>}
            <th className="py-1 md:px-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.length === 0 ? (
            <tr className="border-b border-gray-200">
              <td
                colSpan="5"
                className="text-sm text-start md:px-4 py-2 text-gray-500">
                No sessions available.
              </td>
            </tr>
          ) : (
            // Render the session rows as usual
            sessions.map((session) => (
              <SessionRow
                key={session.id}
                session={session}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SessionTable;
