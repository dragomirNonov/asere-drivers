const SessionRow = ({ session }) => {
  return (
    <tr className="border-b border-gray-200">
      <td className="py-1 md:px-2">
        <input
          type="date"
          id="date"
          name="date"
          value={session.date}
          className="p-1 max-w-[85%] bg-white"
          disabled
        />
      </td>
      <td className="py-1 md:px-2">{session.clockedIn}</td>
      <td className="py-1 md:px-2">{session.clockedOut}</td>
      <td className="py-1 md:px-2">{session.duration} hr(s)</td>
    </tr>
  );
};

export default SessionRow;
