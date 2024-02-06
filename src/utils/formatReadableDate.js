// Create a utility.js file
export function formatTimeSince(dateString) {
  const originalDate = new Date(dateString);
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const difference = currentDate - originalDate;

  // Convert difference to days, hours, etc.
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);

  // Build the readable string
  let readableString = '';
  if (days > 0) {
    readableString += `${days} day${days > 1 ? 's' : ''} `;
  }
  if (hours > 0) {
    readableString += `${hours} h${hours > 1 ? 's' : ''} `;
  }
  if (days === 0 && minutes > 0) {
    // Include minutes only if there are no days
    readableString += `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }

  // Trim and return the final string
  return readableString.trim();
}

export function formatReadableDate(dateString) {
    const originalDate = new Date(dateString);
  
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    };
  
    return originalDate.toLocaleDateString('en-US', options);
  }
  