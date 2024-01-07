export function formatDate(date) {
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(date).toLocaleDateString("en-US", dateOptions);
  return formattedDate
}
