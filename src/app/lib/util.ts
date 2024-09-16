export const  formatDateTime = (dateTimeString: string): string => {
  // Step 1: Parse the input string to a Date object
  const [datePart, timePart] = dateTimeString.split(", ");
  const [day, month, year] = datePart.split("/").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);

  const date = new Date(year, month - 1, day, hours, minutes); // month is 0-indexed

  // Step 2: Extract the time in 12-hour format with AM/PM
  let hours12 = date.getHours() % 12 || 12; // Converts 24-hour format to 12-hour
  let ampm = date.getHours() >= 12 ? "pm" : "am";

  // Step 3: Return the formatted string with 12-hour time
  return `${datePart}, ${hours12}:${minutes.toString().padStart(2, '0')}${ampm}`;
}