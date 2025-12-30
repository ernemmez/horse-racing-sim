import { describe, it, expect, vi } from "vitest";
import programModule from "../../../src/store/modules/program";

describe("Program Module", () => {
  const state = () => programModule.state();

  // Mock root state with 20 horses
  const mockHorses = Array.from({ length: 20 }, (_, i) => ({
    id: `h${i}`,
    name: `Horse ${i}`,
    color: "#000",
    condition: 100,
    stamina: 80,
  }));

  const rootState = {
    horses: { horses: mockHorses },
  };

  describe("Actions", () => {
    it("generateProgram should create 6 rounds with 10 horses each", () => {
      const commit = vi.fn();

      programModule.actions.generateProgram({ commit, rootState } as any);

      expect(commit).toHaveBeenCalledWith("SET_ROUNDS", expect.any(Array));
      expect(commit).toHaveBeenCalledWith("SET_CURRENT_ROUND", 0);

      // Get the rounds passed to commit
      const rounds = commit.mock.calls[0][1];
      expect(rounds).toHaveLength(6);
      expect(rounds[0].horses).toHaveLength(10);
      expect(rounds[0].distance).toBe(1200);
      expect(rounds[5].distance).toBe(2200);
    });

    it("nextRound should increment current round index", () => {
      const commit = vi.fn();
      const dispatch = vi.fn();
      const s = state();
      s.rounds = Array(6).fill({}) as any;
      s.currentRoundIndex = 0;

      programModule.actions.nextRound({ commit, state: s, dispatch } as any);

      expect(commit).toHaveBeenCalledWith("SET_CURRENT_ROUND", 1);
      expect(dispatch).toHaveBeenCalledWith("race/resetRace", null, {
        root: true,
      });
    });

    it("nextRound should set to null if finished", () => {
      const commit = vi.fn();
      const dispatch = vi.fn();
      const s = state();
      s.rounds = Array(6).fill({}) as any;
      s.currentRoundIndex = 5; // Last round

      programModule.actions.nextRound({ commit, state: s, dispatch } as any);

      expect(commit).toHaveBeenCalledWith("SET_CURRENT_ROUND", null);
    });
  });
});
