const express = require('express');
const WebSocket = require('ws');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Create HTTP server
const server = app.listen(PORT, () => {
    console.log(`✅ Backend server running on http://localhost:${PORT}`);
});

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// ESP32 Serial Connection Configuration
let serialPort = null;
let parser = null;
let isConnected = false;

// Store latest sensor data
let latestData = {
    moisture: 0,
    pumpStatus: false,
    message: '',
    timestamp: new Date()
};

// Function to connect to ESP32
async function connectToESP32() {
    try {
        // List available ports
        const ports = await SerialPort.list();
        console.log('\n📡 Available Serial Ports:');
        ports.forEach((port, index) => {
            console.log(`${index + 1}. ${port.path} - ${port.manufacturer || 'Unknown'}`);
        });

        // Find ESP32 (usually has "CP210" or "CH340" in manufacturer)
        const esp32Port = ports.find(port =>
            port.manufacturer && (
                port.manufacturer.includes('Silicon Labs') ||  // CP2102
                port.manufacturer.includes('CH340') ||
                port.manufacturer.includes('wch.cn')
            )
        );

        if (!esp32Port) {
            console.log('⚠️  ESP32 not found. Please check:');
            console.log('   1. ESP32 is connected via USB');
            console.log('   2. Drivers are installed (CP210x or CH340)');
            console.log('   3. Arduino code is uploaded');
            console.log('\n💡 Using first available port as fallback...');

            if (ports.length > 0) {
                const fallbackPort = ports[0].path;
                initializeSerialPort(fallbackPort);
            } else {
                console.log('❌ No serial ports detected!');
                return;
            }
        } else {
            console.log(`\n✅ ESP32 found on: ${esp32Port.path}`);
            initializeSerialPort(esp32Port.path);
        }

    } catch (error) {
        console.error('❌ Error connecting to ESP32:', error.message);
    }
}

// Initialize serial port connection
function initializeSerialPort(portPath) {
    try {
        serialPort = new SerialPort({
            path: portPath,
            baudRate: 115200  // Match ESP32 Serial.begin(115200)
        });

        parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));

        serialPort.on('open', () => {
            console.log(`\n🔌 Connected to ESP32 on ${portPath}`);
            console.log('📊 Listening for sensor data...\n');
            isConnected = true;
        });

        // Handle incoming serial data
        parser.on('data', (line) => {
            console.log(`📥 ${line}`);

            // Parse moisture reading
            if (line.includes('Moisture:')) {
                const moisture = parseInt(line.split(':')[1].trim());
                latestData.moisture = moisture;
                latestData.pumpStatus = moisture > 2500;
                latestData.timestamp = new Date();
            }

            // Parse status message
            if (line.includes('Soil')) {
                latestData.message = line.trim();

                // Broadcast to all WebSocket clients
                broadcastData();
            }
        });

        serialPort.on('error', (err) => {
            console.error('❌ Serial Port Error:', err.message);
            isConnected = false;
        });

        serialPort.on('close', () => {
            console.log('🔌 ESP32 disconnected');
            isConnected = false;
        });

    } catch (error) {
        console.error('❌ Failed to initialize serial port:', error.message);
    }
}

// Broadcast data to all connected WebSocket clients
function broadcastData() {
    const data = {
        moisture: latestData.moisture,
        moisturePercent: Math.round(((4095 - latestData.moisture) / 4095) * 100),
        pumpStatus: latestData.pumpStatus,
        message: latestData.message,
        timestamp: latestData.timestamp
    };

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

// WebSocket connection handler
wss.on('connection', (ws) => {
    console.log('🔗 New WebSocket client connected');

    // Send current data immediately
    ws.send(JSON.stringify({
        moisture: latestData.moisture,
        moisturePercent: Math.round(((4095 - latestData.moisture) / 4095) * 100),
        pumpStatus: latestData.pumpStatus,
        message: latestData.message,
        timestamp: latestData.timestamp,
        connected: isConnected
    }));

    ws.on('close', () => {
        console.log('❌ WebSocket client disconnected');
    });
});

// REST API endpoints
app.get('/api/status', (req, res) => {
    res.json({
        connected: isConnected,
        latestData: {
            moisture: latestData.moisture,
            moisturePercent: Math.round(((4095 - latestData.moisture) / 4095) * 100),
            pumpStatus: latestData.pumpStatus,
            message: latestData.message,
            timestamp: latestData.timestamp
        }
    });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// Start ESP32 connection
console.log('🚀 Starting AgroAid Backend Server...');
connectToESP32();

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down gracefully...');
    if (serialPort && serialPort.isOpen) {
        serialPort.close();
    }
    process.exit(0);
});
