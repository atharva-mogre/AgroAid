// ESP32 Sensor Data Service
// Connects to backend WebSocket server for real ESP32 data

export interface ESP32Data {
    moisture: number;        // Raw ADC value 0-4095
    moisturePercent: number; // Converted to percentage
    pumpStatus: boolean;     // true = ON, false = OFF
    timestamp: Date;
    message: string;         // Serial output message
    connected?: boolean;     // Backend connection status
}

export interface SensorLog {
    timestamp: Date;
    moisture: number;
    message: string;
}

const THRESHOLD = 2500; // Same as Arduino code
const MAX_ADC = 4095;   // 12-bit ADC max value
const WEBSOCKET_URL = 'ws://localhost:3001';

class ESP32Service {
    private currentMoisture: number = 2000;
    private logs: SensorLog[] = [];
    private maxLogs = 100;
    private ws: WebSocket | null = null;
    private latestData: ESP32Data | null = null;
    private useRealData = false;
    private reconnectInterval: ReturnType<typeof setInterval> | null = null;
    private lastSimulationTime = 0;

    constructor() {
        this.connectWebSocket();
    }

    // Connect to WebSocket backend
    private connectWebSocket() {
        try {
            this.ws = new WebSocket(WEBSOCKET_URL);

            this.ws.onopen = () => {
                console.log('✅ Connected to ESP32 backend');
                this.useRealData = true;
                // Clear simulation logs when switching to real data
                this.logs = [];
                if (this.reconnectInterval) {
                    clearInterval(this.reconnectInterval);
                    this.reconnectInterval = null;
                }
            };

            this.ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    this.latestData = {
                        moisture: data.moisture,
                        moisturePercent: data.moisturePercent,
                        pumpStatus: data.pumpStatus,
                        message: data.message,
                        timestamp: new Date(data.timestamp),
                        connected: data.connected !== false
                    };

                    // Add to logs (real data only)
                    this.logs.push({
                        timestamp: new Date(data.timestamp),
                        moisture: data.moisture,
                        message: data.message
                    });

                    // Keep only recent logs
                    if (this.logs.length > this.maxLogs) {
                        this.logs.shift();
                    }
                } catch (error) {
                    console.error('Error parsing WebSocket data:', error);
                }
            };

            this.ws.onerror = () => {
                console.warn('⚠️ WebSocket error, falling back to simulation');
                this.useRealData = false;
            };

            this.ws.onclose = () => {
                console.log('🔌 Disconnected from backend, using simulation...');
                this.useRealData = false;
                this.ws = null;

                // Try to reconnect every 5 seconds
                if (!this.reconnectInterval) {
                    this.reconnectInterval = setInterval(() => {
                        console.log('🔄 Attempting to reconnect to backend...');
                        this.connectWebSocket();
                    }, 5000);
                }
            };
        } catch (error) {
            console.warn('⚠️ Could not connect to backend, using simulation');
            this.useRealData = false;
        }
    }

    // Simulate sensor reading (fallback when backend unavailable)
    private simulateMoistureReading(): number {
        const change = Math.random() * 100 - 30;
        this.currentMoisture = Math.max(500, Math.min(MAX_ADC, this.currentMoisture + change));
        return Math.round(this.currentMoisture);
    }

    // Get current sensor data
    getCurrentData(): ESP32Data {
        // Use real data if available
        if (this.useRealData && this.latestData) {
            return this.latestData;
        }

        // Fall back to simulation - but only update every second
        const now = Date.now();
        if (now - this.lastSimulationTime < 1000) {
            // Return last simulated data if called too frequently
            if (this.latestData) {
                return { ...this.latestData, connected: false };
            }
        }

        this.lastSimulationTime = now;

        const moisture = this.simulateMoistureReading();
        const pumpStatus = moisture > THRESHOLD;
        const message = pumpStatus ? "Soil dry → Watering" : "Soil wet → Stop";
        const moisturePercent = Math.round(((MAX_ADC - moisture) / MAX_ADC) * 100);

        const simData: ESP32Data = {
            moisture,
            moisturePercent,
            pumpStatus,
            timestamp: new Date(),
            message,
            connected: false
        };

        // Store for next call
        this.latestData = simData;

        // Add to logs for simulation
        this.logs.push({
            timestamp: new Date(),
            moisture,
            message
        });

        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }

        return simData;
    }

    // Get recent logs
    getLogs(): SensorLog[] {
        return [...this.logs];
    }

    // Clear logs
    clearLogs(): void {
        this.logs = [];
    }

    // Get threshold value
    getThreshold(): number {
        return THRESHOLD;
    }

    // Check if using real data
    isConnected(): boolean {
        return this.useRealData && this.ws !== null && this.ws.readyState === WebSocket.OPEN;
    }

    // Disconnect WebSocket
    disconnect(): void {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        if (this.reconnectInterval) {
            clearInterval(this.reconnectInterval);
            this.reconnectInterval = null;
        }
    }
}

// Export singleton instance
export const esp32Service = new ESP32Service();
