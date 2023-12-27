// Create a utility.js file
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
  