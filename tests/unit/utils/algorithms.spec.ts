import { describe, it, expect } from "vitest";
import {
  calculateConditionLoss,
  calculateHorseSpeed,
  getUniqueColors,
} from "../../../src/utils/algorithms";

describe("Algorithms", () => {
  describe("calculateConditionLoss", () => {
    it("should return higher loss for longer distances", () => {
      const lossShort = calculateConditionLoss(1200, 80, 100);
      const lossLong = calculateConditionLoss(2200, 80, 100);
      expect(lossLong).toBeGreaterThan(lossShort);
    });

    it("should return less loss for higher stamina", () => {
      const lossWeak = calculateConditionLoss(1400, 60, 100);
      const lossStrong = calculateConditionLoss(1400, 90, 100);
      expect(lossWeak).toBeGreaterThan(lossStrong);
    });

    it("should return 0 if condition is already 0", () => {
      const loss = calculateConditionLoss(1400, 80, 0);
      expect(loss).toBe(0);
    });
  });

  describe("calculateHorseSpeed", () => {
    it("should return a positive number", () => {
      const speed = calculateHorseSpeed(100, 80);
      expect(speed).toBeGreaterThan(0);
    });

    it("should be influenced by condition", () => {
      const speedFast = calculateHorseSpeed(100, 80);
      const speedSlow = calculateHorseSpeed(20, 80);
      expect(speedFast).toBeGreaterThan(speedSlow);
    });
  });

  describe("getUniqueColors", () => {
    it("should generate requested number of colors", () => {
      const colors = getUniqueColors(20);
      expect(colors).toHaveLength(20);
    });

    it("should be unique", () => {
      const colors = getUniqueColors(20);
      const unique = new Set(colors);
      expect(unique.size).toBe(20);
    });
  });
});
