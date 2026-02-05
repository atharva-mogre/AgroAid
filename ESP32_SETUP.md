# AgroAid ESP32 Backend Setup

Complete backend implementation to connect your physical ESP32 to the AgroAid dashboard.

## Quick Start

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Upload Arduino Code
Upload this code to your ESP32:
```cpp
#define SENSOR_PIN 34
#define LED_PIN 27

int threshold = 2500;

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  int moisture = analogRead(SENSOR_PIN);
  Serial.print("Moisture: ");
  Serial.println(moisture);

  if (moisture > threshold) {
    digitalWrite(LED_PIN, HIGH);   // pump ON
    Serial.println("Soil dry → Watering");
  } else {
    digitalWrite(LED_PIN, LOW);    // pump OFF
    Serial.println("Soil wet → Stop");
  }

  delay(1000);
}
```

### 3. Run Everything
**Terminal 1** - Backend:
```bash
cd backend
npm start
```

**Terminal 2** - Frontend:
```bash
npm run dev
```

### 4. Open Browser
Navigate to `http://localhost:8080`

## System Architecture
```
ESP32 → USB → Node.js Backend → WebSocket → React Frontend
```

- **Backend**: Reads serial data (115200 baud) and broadcasts via WebSocket (port 3001)
- **Frontend**: Auto-connects to WebSocket, falls back to simulation if unavailable

## Troubleshooting

### ESP32 Not Detected
- Install [CP210x drivers](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers) or CH340 drivers
- Check Device Manager (Windows) for COM port
- Verify ESP32 shows up in Arduino IDE

### Backend Connection Failed
- Ensure ESP32 is plugged in via USB
- Check `server.js` console for port detection
- Try manually specifying COM port in `server.js`

### Frontend Shows Simulation
- Check browser console (F12) for WebSocket errors
- Verify backend is running (`npm start` in backend folder)
- Ensure port 3001 is not blocked by firewall

## Files Created
- `backend/package.json` - Dependencies
- `backend/server.js` - Express + WebSocket + SerialPort
- `src/lib/esp32Service.ts` - Frontend WebSocket client

Enjoy your smart garden! 🌱
