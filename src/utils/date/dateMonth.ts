export default function getMonthName(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("default", { month: "short" }); // "Jan", "Feb", dst.
}