import SessionRow from './SessionRow.jsx';

const SessionTable = ({ title = 'Sessions', sessions, onEdit, onDelete }) => {
  return (
    <div className="p-1 space-y-2">
      <h2 className="flex justify-between items-center text-sm font-semibold">
        <span>{title}</span>
      </h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
            <th className="py-1 text-center">Date</th>
            <th className="py-1 text-center">In/Out</th>
            <th className="py-1 text-center">Duration</th>
            <th className="py-1 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.length === 0 ? (
            <tr className="border-b border-gray-200">
              <td
                colSpan="5"
                className="text-sm text-start px-2 py-2 text-gray-500">
                No sessions available.
              </td>
            </tr>
          ) : (
            // Render the session rows as usual
            sessions.map((session) => (
              <SessionRow
                key={session.id}
                session={session}
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
