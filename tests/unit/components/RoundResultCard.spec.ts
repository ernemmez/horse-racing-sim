import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import RoundResultCard from "../../../src/components/molecules/RoundResultCard.vue";

describe("RoundResultCard.vue", () => {
  const mockResult = {
    roundNo: 1,
    distance: 1200,
    rankings: [
      {
        horseId: "1",
        horseName: "Winner",
        horseColor: "#000",
        position: 1,
        finishTime: 10000,
      },
      {
        horseId: "2",
        horseName: "Runner Up",
        horseColor: "#FFF",
        position: 2,
        finishTime: 10500,
      },
    ],
  };

  it("should render correct header info", () => {
    const wrapper = mount(RoundResultCard, {
      props: { result: mockResult },
    });

    expect(wrapper.find("h4").text()).toContain("Lap 1");
    expect(wrapper.find('[data-testid="round-distance"]').text()).toBe("1200m");
  });

  it("should render correct number of rankings", () => {
    const wrapper = mount(RoundResultCard, {
      props: { result: mockResult },
    });

    expect(wrapper.findAll('[data-testid="ranking-item"]')).toHaveLength(2);
  });

  it("should display winner trophy only for first place", () => {
    const wrapper = mount(RoundResultCard, {
      props: { result: mockResult },
    });

    const items = wrapper.findAll('[data-testid="ranking-item"]');

    // First item is winner
    expect(items[0].find('[data-testid="winner-trophy"]').exists()).toBe(true);

    // Second item is not winner
    expect(items[1].find('[data-testid="winner-trophy"]').exists()).toBe(false);
  });

  it("should format time correctly", () => {
    const wrapper = mount(RoundResultCard, {
      props: { result: mockResult },
    });

    // 10000ms = 10.00s
    expect(wrapper.find('[data-testid="finish-time"]').text()).toBe("10.00s");
  });
});
