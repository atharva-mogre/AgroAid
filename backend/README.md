# AgroAid Backend Server

This backend connects your ESP32 hardware to the frontend via WebSocket.

## Installation

```bash
cd backend
npm install
```

## Running

1. **Upload Arduino code to ESP32**
2. **Connect ESP32 to PC via USB**
3. **Start backend:**
   ```bash
   npm start
   ```
4. **Start frontend** (in another terminal):
   ```bash
   cd ..
   npm run dev
   ```

## How It Works

- Reads serial data from ESP32 (115200 baud)
- Parses moisture readings and pump status
- Broadcasts real-time data via WebSocket (port 3001)
- Frontend connects and displays live sensor data

## Troubleshooting

**ESP32 not detected?**
- Install CP210x or CH340 USB drivers
- Check Device Manager for COM port
- Ensure Arduino code is uploaded

**Connection issues?**
- Check `server.js` for correct COM port
- Verify ESP32 is sending data (Arduino Serial Monitor)
- Ensure backend and frontend are both running
