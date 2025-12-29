import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import RaceTrack from "../../../src/components/organisms/RaceTrack.vue";
import { createStore } from "vuex";

// Mocking algorithms formatTime as it is used in template directly or via helper
vi.mock("../../../src/utils/algorithms", () => ({
  formatTime: (ms: number) => {
    if (!ms) return "0.00s";
    return `${(ms / 1000).toFixed(2)}s`;
  },
}));

describe("RaceTrack.vue", () => {
  const store = createStore({
    modules: {
      race: {
        namespaced: true,
        state: {
          raceStartTime: null,
        },
      },
    },
  });

  // Basic mock data
  const mockRound = {
    roundNo: 1,
    distance: 1200,
    horses: [
      { id: "1", name: "Horse 1", color: "#000", condition: 100, stamina: 80 },
      { id: "2", name: "Horse 2", color: "#FFF", condition: 100, stamina: 90 },
    ],
  };

  const mockPositions = {
    "1": { horseId: "1", position: 50, speed: 10 },
    "2": { horseId: "2", position: 100, speed: 10, finishTime: 12345 },
  };

  it("should render empty state when no current round", () => {
    const wrapper = mount(RaceTrack, {
      props: {
        currentRound: null,
        isRaceActive: false,
        horsePositions: {},
      },
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find('[data-testid="empty-state"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="race-container"]').exists()).toBe(false);
  });

  it("should render race tracks and horses when round active", () => {
    const wrapper = mount(RaceTrack, {
      props: {
        currentRound: mockRound,
        isRaceActive: false,
        horsePositions: mockPositions,
      },
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find('[data-testid="empty-state"]').exists()).toBe(false);
    expect(wrapper.find('[data-testid="race-container"]').exists()).toBe(true);
    expect(wrapper.findAll('[data-testid="race-lane"]')).toHaveLength(2);
  });

  it("should position horses correctly based on props", () => {
    const wrapper = mount(RaceTrack, {
      props: {
        currentRound: mockRound,
        isRaceActive: false,
        horsePositions: mockPositions,
      },
      global: {
        plugins: [store],
      },
    });

    const horses = wrapper.findAll('[data-testid="horse-runner"]');

    // Horse 1 (position 50)
    expect(horses[0].attributes("style")).toContain("left: 50%");

    // Horse 2 (position 100)
    expect(horses[1].attributes("style")).toContain("left: 100%");
  });

  it("should show confetti for finished horses", () => {
    const wrapper = mount(RaceTrack, {
      props: {
        currentRound: mockRound,
        isRaceActive: false,
        horsePositions: mockPositions,
      },
      global: {
        plugins: [store],
      },
    });

    const lanes = wrapper.findAll('[data-testid="race-lane"]');

    // Horse 1 not finished (pos 50)
    expect(lanes[0].find('[data-testid="finish-confetti"]').exists()).toBe(
      false
    );

    // Horse 2 finished (pos 100)
    expect(lanes[1].find('[data-testid="finish-confetti"]').exists()).toBe(
      true
    );
  });

  it("should update timer when race is active", async () => {
    vi.useFakeTimers();
    const startTime = 1000000;
    vi.setSystemTime(startTime);

    // Update store mock
    store.state.race.raceStartTime = startTime;

    const wrapper = mount(RaceTrack, {
      props: {
        currentRound: mockRound,
        isRaceActive: true,
        horsePositions: mockPositions,
      },
      global: {
        plugins: [store],
      },
    });

    // Start interval logic
    await wrapper.vm.$nextTick();

    // Advance time by 1.5 seconds
    await vi.advanceTimersByTimeAsync(1500);

    // raceTime should be updated. 1500ms = 1.50s
    // formatTime mock returns `${ms/1000}s` fixed to 2 decimals
    expect(wrapper.find('[data-testid="race-timer"]').text()).toBe("1.50s");

    vi.useRealTimers();
  });
});
