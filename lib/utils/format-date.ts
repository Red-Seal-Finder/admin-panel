export function formatDateToDDMMYY(isoDateString: string) {
  const date = new Date(isoDateString);

  const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with zero if needed
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month and pad with zero if needed
  const year = date.getFullYear().toString().slice(-2); // Get year and take the last two digits

  return `${day}/${month}/${year}`;
}
