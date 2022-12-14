export function getFormattedDate(date) {
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const newDate = new Date(date)
  return `${months[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()}`;
}