import { cache } from "react";

export const getToday = cache((datestring: string) => {
  const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const meses: Record<string, string> = {
    'January': 'Janeiro',
    'February': 'Fevereiro',
    'March': 'Março',
    'April': 'Abril',
    'May': 'Maio',
    'June': 'Junho',
    'July': 'Julho',
    'August': 'Agosto',
    'September': 'Setembro',
    'October': 'Outubro',
    'November': 'Novembro',
    'December': 'Dezembro'
  };
  let date = new Date();

  if (datestring) {
    date = new Date(datestring);
  }

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const today = `${day} de ${meses[month]} de ${year}`;

  return today;
})