import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ResultsPanel from "../../../src/components/organisms/ResultsPanel.vue";

// Stub the child component
const RoundResultCardStub = {
  template: '<div class="round-result-card-stub">Result</div>',
  props: ["result"],
};

describe("ResultsPanel.vue", () => {
  const mockResults = [
    { roundNo: 1, distance: 1200, rankings: [] },
    { roundNo: 2, distance: 1400, rankings: [] },
  ];

  const globalOptions = {
    components: {
      RoundResultCard: RoundResultCardStub,
    },
  };

  it("should render empty state when no results", () => {
    const wrapper = mount(ResultsPanel, {
      props: { results: [] },
      global: globalOptions,
    });

    expect(wrapper.find('[data-testid="empty-state"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="results-list"]').exists()).toBe(false);
  });

  it("should render results list when results exist", () => {
    const wrapper = mount(ResultsPanel, {
      props: { results: mockResults },
      global: globalOptions,
    });

    expect(wrapper.find('[data-testid="empty-state"]').exists()).toBe(false);
    expect(wrapper.find('[data-testid="results-list"]').exists()).toBe(true);
    // We expect 2 items
    expect(wrapper.findAll('[data-testid="round-result-card"]')).toHaveLength(
      2
    );
  });

  it("should display results in reverse order", () => {
    const wrapper = mount(ResultsPanel, {
      props: { results: mockResults },
      global: globalOptions,
    });

    const cards = wrapper.findAllComponents(RoundResultCardStub);

    // First card displayed should be the LAST result (round 2)
    expect(cards[0].props("result").roundNo).toBe(2);

    // Second card displayed should be the FIRST result (round 1)
    expect(cards[1].props("result").roundNo).toBe(1);
  });

  it("should show count badge", () => {
    const wrapper = mount(ResultsPanel, {
      props: { results: mockResults },
      global: globalOptions,
    });

    const badge = wrapper.find('[data-testid="results-count-badge"]');
    expect(badge.exists()).toBe(true);
    expect(badge.text()).toContain("2 Laps");
  });
});
