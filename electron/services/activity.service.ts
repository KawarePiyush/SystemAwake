import {
  mouse,
  Point,
  straightTo,
  screen,
  keyboard,
  Key
} from "@nut-tree-fork/nut-js";

import settingsService from "./settings.service.js";

class ActivityService {
  private timeout: NodeJS.Timeout | null = null;

  private running = false;
 

  start() {
    if (this.timeout) return;

    this.running = true;

    console.log("Activity started");

    this.scheduleNextMove();
  }

  private async performMovement() {
    if(!this.running) return;
    try {
      const current = await mouse.getPosition();

      const width = await screen.width();
      const height = await screen.height();

      const offsetX = this.random(-300, 300);
      const offsetY = this.random(-100, 100);

      const newX = Math.max(
        0,
        Math.min(width, current.x + offsetX)
      );

      const newY = Math.max(
        0,
        Math.min(height, current.y + offsetY)
      );

      console.log(
        `Moving mouse: (${current.x}, ${current.y}) -> (${newX}, ${newY})`
      );

      await mouse.move(
        straightTo(new Point(newX, newY))
      );

        const keyboardSimulation =
        settingsService.get(
          "keyboardSimulation"
        );

        if (keyboardSimulation) {
        await keyboard.pressKey(
          Key.LeftAlt
        );

        await keyboard.releaseKey(
          Key.LeftAlt
        );

        console.log(
          "Keyboard simulated"
        );
      }
    } catch (error) {
      console.error("Movement error:", error);
    }

    this.scheduleNextMove();
  }

  private scheduleNextMove() {
    if(!this.running) return

     const min =
      settingsService.get(
        "movementIntervalMin"
      ) * 1000;

    const max =
      settingsService.get(
        "movementIntervalMax"
      ) * 1000;

    const interval = this.random(
      min,
      max
    );

    console.log(
      `Next move in ${Math.floor(interval / 1000)} sec`
    );

    this.timeout = setTimeout(() => {
      this.performMovement();
    }, interval);
  }

  stop() {
    this.running = false;
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;

    }
    console.log("Activity stopped");
  }

  private random(min: number, max: number) {
    return Math.floor(
      Math.random() * (max - min + 1) + min
    );
  }
}

export default new ActivityService();