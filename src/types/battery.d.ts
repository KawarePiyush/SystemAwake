interface BatteryManager extends EventTarget {
  charging: boolean;

  chargingTime: number;

  dischargingTime: number;

  level: number;

  onchargingchange: (() => void) | null;

  onchargingtimechange: (() => void) | null;

  ondischargingtimechange:
    | (() => void)
    | null;

  onlevelchange: (() => void) | null;
}

interface Navigator {
  getBattery(): Promise<BatteryManager>;
}