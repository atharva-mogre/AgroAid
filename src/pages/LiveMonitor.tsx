import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { esp32Service, SensorLog } from "@/lib/esp32Service";
import { Power, Droplets, Trash2, RefreshCw, Terminal } from "lucide-react";

const LiveMonitor = () => {
    const [logs, setLogs] = useState<SensorLog[]>([]);
    const [isPaused, setIsPaused] = useState(false);
    const [currentData, setCurrentData] = useState(esp32Service.getCurrentData());
    const logsEndRef = useRef<HTMLDivElement>(null);
    const prevLogCountRef = useRef(0);

    // Auto-scroll only when new logs arrive
    const scrollToBottom = () => {
        logsEndRef.current?.scrollIntoView({ behavior: "auto", block: "end", inline: "nearest" });
    };

    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => {
                const data = esp32Service.getCurrentData();
                setCurrentData(data);
                const newLogs = esp32Service.getLogs();

                // Only scroll if new logs were added
                if (newLogs.length > prevLogCountRef.current && newLogs.length > 0) {
                    setLogs(newLogs);
                    setTimeout(scrollToBottom, 50); // Small delay to ensure render
                } else {
                    setLogs(newLogs);
                }
                prevLogCountRef.current = newLogs.length;
            }, 1000); // Match ESP32 update rate

            return () => clearInterval(interval);
        }
    }, [isPaused]);

    const handleClearLogs = () => {
        esp32Service.clearLogs();
        setLogs([]);
    };

    return (
        <div className="min-h-screen py-24 bg-gradient-hero">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Terminal className="h-8 w-8 text-primary" />
                        <h1 className="text-4xl md:text-5xl font-bold">
                            Live <span className="text-primary">Monitor</span>
                        </h1>
                    </div>
                    <p className="text-muted-foreground text-lg">
                        Real-time ESP32 sensor output (Serial Monitor)
                    </p>
                </div>

                {/* Current Status Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {/* Current Moisture */}
                    <Card className="p-6 border-2 border-blue-500/30 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-card">
                        <div className="flex items-center gap-3 mb-3">
                            <Droplets className="h-6 w-6 text-blue-600" />
                            <h3 className="font-bold text-foreground">Moisture Reading</h3>
                        </div>
                        <div className="text-3xl font-bold text-foreground">{currentData.moisture}</div>
                        <p className="text-sm text-muted-foreground mt-1">
                            {currentData.moisture > 2500 ? "Dry (> 2500)" : "Wet (≤ 2500)"}
                        </p>
                    </Card>

                    {/* Pump Status */}
                    <Card className={`p-6 border-2 ${currentData.pumpStatus
                        ? 'border-emerald-500/50 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-card'
                        : 'border-gray-300/50 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950/20 dark:to-card'
                        }`}>
                        <div className="flex items-center gap-3 mb-3">
                            <Power className={`h-6 w-6 ${currentData.pumpStatus ? 'text-emerald-600' : 'text-gray-400'}`} />
                            <h3 className="font-bold text-foreground">Pump</h3>
                        </div>
                        <div className={`text-3xl font-bold ${currentData.pumpStatus ? 'text-emerald-600' : 'text-gray-500'}`}>
                            {currentData.pumpStatus ? 'ON' : 'OFF'}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{currentData.message}</p>
                    </Card>

                    {/* Log Count */}
                    <Card className="p-6 border-2 border-primary/20">
                        <div className="flex items-center gap-3 mb-3">
                            <Terminal className="h-6 w-6 text-primary" />
                            <h3 className="font-bold text-foreground">Log Entries</h3>
                        </div>
                        <div className="text-3xl font-bold text-foreground">{logs.length}</div>
                        <p className="text-sm text-muted-foreground mt-1">
                            {isPaused ? "Paused" : "Updating every 1s"}
                        </p>
                    </Card>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap gap-3 mb-4">
                    <Button
                        onClick={() => setIsPaused(!isPaused)}
                        variant={isPaused ? "default" : "outline"}
                        className="gap-2"
                    >
                        <RefreshCw className={`h-4 w-4 ${!isPaused ? 'animate-spin' : ''}`} />
                        {isPaused ? "Resume" : "Pause"}
                    </Button>
                    <Button
                        onClick={handleClearLogs}
                        variant="outline"
                        className="gap-2"
                    >
                        <Trash2 className="h-4 w-4" />
                        Clear Logs
                    </Button>
                </div>

                {/* Serial Monitor Output */}
                <Card className="p-6 bg-black/95 dark:bg-black border-2 border-primary/20 font-mono text-sm">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-white/70 text-xs ml-2">Serial Monitor - COM5 (115200 baud)</span>
                    </div>

                    <div className="h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent">
                        {logs.length === 0 ? (
                            <div className="flex items-center justify-center h-full text-white/50">
                                <p>Waiting for data...</p>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {logs.map((log, index) => (
                                    <div key={index} className="text-white/90 hover:bg-white/5 px-2 py-1 rounded transition-colors">
                                        <span className="text-green-400">[{log.timestamp.toLocaleTimeString()}]</span>
                                        {" "}
                                        <span className="text-cyan-400">Moisture:</span>
                                        {" "}
                                        <span className="text-yellow-400">{log.moisture}</span>
                                        <br />
                                        <span className="text-green-400">[{log.timestamp.toLocaleTimeString()}]</span>
                                        {" "}
                                        {log.message.includes("Watering") ? (
                                            <span className="text-blue-400 font-semibold">{log.message}</span>
                                        ) : (
                                            <span className="text-emerald-400">{log.message}</span>
                                        )}
                                    </div>
                                ))}
                                <div ref={logsEndRef} />
                            </div>
                        )}
                    </div>
                </Card>

                {/* Info Card */}
                <Card className="mt-6 p-6 border-2 border-primary/20 bg-gradient-card">
                    <h3 className="font-semibold text-lg mb-3 text-foreground">About This Monitor</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                        This live monitor simulates the serial output from your ESP32 microcontroller. The moisture sensor on pin 34 reads analog values from 0-4095. When the reading exceeds 2500 (indicating dry soil), the pump connected to pin 27 automatically turns ON to water your plant.
                    </p>
                    <div className="text-xs text-muted-foreground space-y-1">
                        <p>• <strong>Sensor Pin:</strong> GPIO 34 (Analog Input)</p>
                        <p>• <strong>Pump Pin:</strong> GPIO 27 (Digital Output)</p>
                        <p>• <strong>Threshold:</strong> 2500 ADC units</p>
                        <p>• <strong>Update Rate:</strong> 1000ms (1 second)</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default LiveMonitor;
