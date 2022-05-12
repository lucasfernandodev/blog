import dayjs from 'dayjs';
import 'dayjs/locale/pt-br' // load on demand

export function DateIs({date}: {date: string}){

  const localizedFormat = require('dayjs/plugin/localizedFormat');
  dayjs.extend(localizedFormat)
  dayjs.locale('pt-br')

  return <>{dayjs(date).format('LL')}</>
  
}