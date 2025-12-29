import { describe, it, expect, vi, beforeEach } from "vitest";
import resultsModule from "../../../src/store/modules/results";

describe("Results Module", () => {
  const state = () => resultsModule.state();

  it("should verify initial state", () => {
    const s = state();
    expect(s.completedRounds).toEqual([]);
  });

  describe("Mutations", () => {
    it("ADD_ROUND_RESULT should add result", () => {
      const s = state();
      const result = { roundNo: 1, distance: 1200, rankings: [] };
      resultsModule.mutations.ADD_ROUND_RESULT(s, result);
      expect(s.completedRounds).toHaveLength(1);
      expect(s.completedRounds[0]).toEqual(result);
    });

    it("RESET_RESULTS should clear results", () => {
      const s = state();
      s.completedRounds = [{ roundNo: 1, distance: 1200, rankings: [] }];
      resultsModule.mutations.RESET_RESULTS(s);
      expect(s.completedRounds).toHaveLength(0);
    });
  });

  describe("Actions", () => {
    it("addRoundResult should prevent duplicate round numbers", () => {
      const commit = vi.fn();
      const s = state();
      s.completedRounds = [{ roundNo: 1, distance: 1200, rankings: [] }];

      // Attempt to add Round 1 again
      const newResult = { roundNo: 1, distance: 1200, rankings: [] };

      // @ts-ignore
      resultsModule.actions.addRoundResult({ commit, state: s }, newResult);

      expect(commit).not.toHaveBeenCalled();
    });

    it("addRoundResult should commit for new round number", () => {
      const commit = vi.fn();
      const s = state();
      s.completedRounds = [{ roundNo: 1, distance: 1200, rankings: [] }];

      const newResult = { roundNo: 2, distance: 1400, rankings: [] };

      // @ts-ignore
      resultsModule.actions.addRoundResult({ commit, state: s }, newResult);

      expect(commit).toHaveBeenCalledWith("ADD_ROUND_RESULT", newResult);
    });
  });
});
