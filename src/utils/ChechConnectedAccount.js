export default function CheckConnectedAccount(obj) {
    const propertiesToCheck = [
      "TwitterConnected",
      "FacebookConnected",
      "YoutubeConnected",
      "InstagramConnected",
      "TikTokConnected",
      "GoogleBusinessConnected",
      "PinterestConnected",
      "LinkedInConnected"
      // Add more properties if needed
    ];
  
    return !(propertiesToCheck.every(property => obj[property] === "no"));
  }