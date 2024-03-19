export function getToday (datestring: string) {
  const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let date = new Date();

  if (datestring) {
    date = new Date(datestring);
  }

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  let today = `${month} ${day}, ${year}`;

  return today;
};