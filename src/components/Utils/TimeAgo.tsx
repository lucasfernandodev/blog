import TimeAgoReact from 'javascript-time-ago';
import ReactTimeAgo from 'react-time-ago';
import pt from 'javascript-time-ago/locale/pt.json';

TimeAgoReact.setDefaultLocale(pt.locale);
TimeAgoReact.addLocale(pt);

const TimeAgo = ({date} : {date: Date | string}) => {

  const currentDate = date instanceof Date ? date : new Date(date);
  return <ReactTimeAgo date={currentDate} locale="pt-BR" timeStyle="round-minute"/>;
};

export default TimeAgo;