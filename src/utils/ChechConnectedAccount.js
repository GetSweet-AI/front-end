export default function CheckConnectedAccount(obj) {
  const propertiesToCheck = [
    "TwitterConnected",
    "FacebookConnected",
    "YoutubeConnected",
    "InstagramConnected",
    "TikTokConnected",
    "GoogleBusinessConnected",
    "PinterestConnected",
    "LinkedInConnected",
    
    // Add more properties if needed
  ];

  // Check if any of the properties exist and are not "no"
  return propertiesToCheck?.some(property => obj.hasOwnProperty(property) && obj[property] !== "no");
}
