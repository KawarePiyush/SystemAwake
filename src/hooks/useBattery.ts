import { useEffect, useState } from "react";

export interface BatteryState {
  level: number;
  charging: boolean;
}

export const useBattery = () => {
  const [battery, setBattery] =
    useState<BatteryState | null>(null);

  useEffect(() => {
    let batteryManager: BatteryManager;

    const loadBattery = async () => {
      batteryManager =
        await navigator.getBattery();

      const updateBattery = () => {
        setBattery({
          level: Math.floor(
            batteryManager.level * 100
          ),

          charging:
            batteryManager.charging,
        });
      };

      updateBattery();

      batteryManager.addEventListener(
        "chargingchange",
        updateBattery
      );

      batteryManager.addEventListener(
        "levelchange",
        updateBattery
      );
    };

    loadBattery();

    return () => {
      if (!batteryManager) return;

      batteryManager.removeEventListener(
        "chargingchange",
        () => {}
      );

      batteryManager.removeEventListener(
        "levelchange",
        () => {}
      );
    };
  }, []);

  return battery;
};