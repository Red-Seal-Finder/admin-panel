export function extractInitials(fullName: string) {
  // Split the full name into individual words
  const words = fullName.split(" ");

  // Extract the first character of each word
  const initials = words
    .map((word) => word.charAt(0))
    .slice(0, 2)
    .join("");

  return initials.toUpperCase();
}
