import SessionRow from './SessionRow.jsx';

const SessionTable = ({ title = 'Sessions', sessions }) => {
  return (
    <div className="md:p-1">
      <h2 className="flex justify-between items-center text-lg font-semibold bg-gray-200 px-2">
        <span>{title}</span>
      </h2>
      <table className="min-w-full bg-white  border-gray-200 ">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
            <th className="py-1 px-2 text-left">Date</th>
            <th className="py-1 px-2 text-left">In</th>
            <th className="py-1 px-2 text-left">Out</th>
            <th className="py-1 px-2 text-left">Duration</th>
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
            sessions.map((session) => (
              <SessionRow key={session.id} session={session} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SessionTable;
