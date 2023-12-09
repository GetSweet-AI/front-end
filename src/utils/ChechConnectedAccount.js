export default function CheckConnectedAccount(obj) {
    const propertiesToCheck = [
      "TwitterConnected",
      "FacebookConnected",
      "YoutubeConnected"
      // Add more properties if needed
    ];
  
    return !(propertiesToCheck.every(property => obj[property] === "no"));
  }