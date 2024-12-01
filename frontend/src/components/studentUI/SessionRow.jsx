import { formatTimeToAmPm } from '../../utils/utils';

const SessionRow = ({ session }) => {
  return (
    <tr className="border-b border-gray-200">
      <td className="py-1 md:px-2">{session.displayDate}</td>
      <td className="py-1 md:px-2">{formatTimeToAmPm(session.clockedIn)}</td>
      <td className="py-1 md:px-2">{formatTimeToAmPm(session.clockedOut)}</td>
      <td className="py-1 md:px-2 text-center">{session.duration} hr(s)</td>
    </tr>
  );
};

export default SessionRow;
