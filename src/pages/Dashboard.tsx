import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Droplets, Thermometer, Wind, Sun, Sprout, AlertCircle, Power, Activity, Wifi, WifiOff } from "lucide-react";
import { esp32Service, ESP32Data } from "@/lib/esp32Service";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface SensorData {
  moisture: number;
  temperature: number;
  humidity: number;
  light: number;
}

const Dashboard = () => {
  const [sensorData, setSensorData] = useState<SensorData>({
    moisture: 65,
    temperature: 24,
    humidity: 55,
    light: 750,
  });

  const [esp32Data, setEsp32Data] = useState<ESP32Data | null>(null);

  // Simulate real-time data updates (reduced frequency to prevent glitching)
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        moisture: Math.max(0, Math.min(100, prev.moisture + (Math.random() - 0.5) * 5)),
        temperature: Math.max(15, Math.min(35, prev.temperature + (Math.random() - 0.5) * 2)),
        humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 3)),
        light: Math.max(0, Math.min(1500, prev.light + (Math.random() - 0.5) * 100)),
      }));

      // Update ESP32 data every second (matching Arduino delay)
      setEsp32Data(esp32Service.getCurrentData());
    }, 2000); // Reduced from 1000ms to 2000ms for smoother experience

    return () => clearInterval(interval);
  }, []);

  const getPlantStatus = () => {
    if (!esp32Data) return { status: "Loading...", icon: "⏳", color: "text-muted-foreground" };

    if (esp32Data.pumpStatus) return { status: "Watering", icon: "💧", color: "text-blue-600" };
    if (esp32Data.moisturePercent < 30) return { status: "Needs Water Soon", icon: "💧", color: "text-status-moisture" };
    if (sensorData.temperature > 30) return { status: "Too Hot", icon: "☀️", color: "text-status-temp" };
    if (sensorData.humidity < 40) return { status: "Low Humidity", icon: "💨", color: "text-status-humidity" };
    return { status: "Healthy", icon: "🌱", color: "text-primary" };
  };

  const plantStatus = getPlantStatus();

  const metrics = [
    {
      title: "Soil Moisture",
      value: `${sensorData.moisture.toFixed(1)}%`,
      icon: Droplets,
      color: "text-status-moisture",
      bgColor: "bg-status-moisture/10",
      borderColor: "border-status-moisture/20",
      progress: sensorData.moisture,
      ideal: "40-70%",
    },
    {
      title: "Temperature",
      value: `${sensorData.temperature.toFixed(1)}°C`,
      icon: Thermometer,
      color: "text-status-temp",
      bgColor: "bg-status-temp/10",
      borderColor: "border-status-temp/20",
      progress: (sensorData.temperature / 35) * 100,
      ideal: "18-28°C",
    },
    {
      title: "Humidity",
      value: `${sensorData.humidity.toFixed(1)}%`,
      icon: Wind,
      color: "text-status-humidity",
      bgColor: "bg-status-humidity/10",
      borderColor: "border-status-humidity/20",
      progress: sensorData.humidity,
      ideal: "40-60%",
    },
    {
      title: "Light Intensity",
      value: `${sensorData.light.toFixed(0)} lux`,
      icon: Sun,
      color: "text-status-light",
      bgColor: "bg-status-light/10",
      borderColor: "border-status-light/20",
      progress: (sensorData.light / 1500) * 100,
      ideal: "500-1000 lux",
    },
  ];

  return (
    <div className="min-h-screen py-24 bg-gradient-hero">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Plant Health <span className="text-primary">Dashboard</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Real-time monitoring of your plant's environment
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <Link to="/live-monitor">
              <Button variant="outline" className="gap-2">
                <Activity className="h-4 w-4" />
                View Live Monitor
              </Button>
            </Link>
            {esp32Data && (
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${esp32Data.connected
                  ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20'
                }`}>
                {esp32Data.connected ? (
                  <>
                    <Wifi className="h-4 w-4" />
                    <span>ESP32 Connected</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="h-4 w-4" />
                    <span>Simulation Mode</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ESP32 Real Sensor Data - Featured Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Raw Moisture Reading */}
          <Card className="p-6 shadow-card hover:shadow-hover transition-all duration-300 border-2 border-blue-500/30 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-foreground">ESP32 Soil Sensor</h3>
              <Droplets className="h-6 w-6 text-blue-600" />
            </div>
            {esp32Data && (
              <>
                <div className="text-4xl font-bold mb-2 text-foreground">{esp32Data.moisture}</div>
                <p className="text-sm text-muted-foreground mb-3">Raw ADC Reading (0-4095)</p>
                <Progress value={(esp32Data.moisture / 4095) * 100} className="mb-3" />
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex-1">
                    <span className="text-muted-foreground">Threshold: </span>
                    <span className="font-semibold">2500</span>
                  </div>
                  <div className={`font-semibold ${esp32Data.moisture > 2500 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {esp32Data.moisture > 2500 ? '> Dry' : '≤ Wet'}
                  </div>
                </div>
              </>
            )}
          </Card>

          {/* Pump Status */}
          <Card className={`p-6 shadow-card hover:shadow-hover transition-all duration-300 border-2 ${esp32Data?.pumpStatus
            ? 'border-emerald-500/50 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-card'
            : 'border-gray-300/50 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950/20 dark:to-card'
            }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-foreground">Pump Status</h3>
              <Power className={`h-6 w-6 ${esp32Data?.pumpStatus ? 'text-emerald-600' : 'text-gray-400'}`} />
            </div>
            {esp32Data && (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`relative w-16 h-16 rounded-full flex items-center justify-center ${esp32Data.pumpStatus ? 'bg-emerald-500' : 'bg-gray-300'
                    }`}>
                    {esp32Data.pumpStatus && (
                      <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
                    )}
                    <Power className="h-8 w-8 text-white relative z-10" />
                  </div>
                  <div>
                    <div className={`text-3xl font-bold ${esp32Data.pumpStatus ? 'text-emerald-600' : 'text-gray-500'}`}>
                      {esp32Data.pumpStatus ? 'ON' : 'OFF'}
                    </div>
                    <p className="text-sm text-muted-foreground">{esp32Data.message}</p>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Last updated: {esp32Data.timestamp.toLocaleTimeString()}
                </div>
              </>
            )}
          </Card>
        </div>

        {/* Plant Status Card */}
        <div className="max-w-md mx-auto mb-12 animate-slide-up">
          <Card className="p-8 text-center shadow-hover border-2 bg-gradient-card">
            <div className="text-8xl mb-4 animate-grow">{plantStatus.icon}</div>
            <h2 className="text-2xl font-bold mb-2">Your Plant is</h2>
            <p className={`text-3xl font-bold ${plantStatus.color}`}>{plantStatus.status}</p>
            <p className="text-sm text-muted-foreground mt-2">Last updated: Just now</p>
          </Card>
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <Card
              key={metric.title}
              className={`p-6 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 border ${metric.borderColor} ${metric.bgColor} animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">{metric.title}</h3>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
              <div className="text-3xl font-bold mb-3 text-foreground">{metric.value}</div>
              <Progress value={metric.progress} className="mb-2" />
              <p className="text-xs text-muted-foreground">Ideal: {metric.ideal}</p>
            </Card>
          ))}
        </div>

        {/* Recommendations */}
        <Card className="p-8 shadow-card border-2 border-primary/20 bg-gradient-card animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <AlertCircle className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Care Recommendations</h3>
              <ul className="space-y-2">
                {esp32Data?.pumpStatus && (
                  <li className="flex items-center gap-2 text-blue-600 font-semibold">
                    <Power className="h-4 w-4" />
                    Automatic watering in progress
                  </li>
                )}
                {sensorData.moisture < 30 && !esp32Data?.pumpStatus && (
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-2 h-2 bg-status-moisture rounded-full" />
                    Water your plant soon - soil moisture is low
                  </li>
                )}
                {sensorData.temperature > 28 && (
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-2 h-2 bg-status-temp rounded-full" />
                    Move to a cooler location - temperature is high
                  </li>
                )}
                {sensorData.humidity < 40 && (
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-2 h-2 bg-status-humidity rounded-full" />
                    Consider using a humidifier or misting
                  </li>
                )}
                {sensorData.light < 400 && (
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-2 h-2 bg-status-light rounded-full" />
                    Move closer to a light source
                  </li>
                )}
                {sensorData.moisture >= 40 && sensorData.temperature <= 28 && sensorData.humidity >= 40 && sensorData.light >= 400 && !esp32Data?.pumpStatus && (
                  <li className="flex items-center gap-2 text-primary">
                    <Sprout className="h-4 w-4" />
                    All conditions are optimal! Keep up the great work!
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
