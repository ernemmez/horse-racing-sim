import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ProgramTable from "../../../src/components/organisms/ProgramTable.vue";

describe("ProgramTable.vue", () => {
  const mockRounds = [
    { roundNo: 1, distance: 1200, horses: [] },
    { roundNo: 2, distance: 1400, horses: [] },
  ];

  it("should render correct number of rounds", () => {
    const wrapper = mount(ProgramTable, {
      props: {
        rounds: mockRounds,
        currentRoundIndex: 0,
        completedRoundsCount: 0,
      },
    });
    expect(wrapper.findAll('[data-testid="round-block"]')).toHaveLength(2);
  });

  it("should expand current round by default", () => {
    const wrapper = mount(ProgramTable, {
      props: {
        rounds: mockRounds,
        currentRoundIndex: 0,
        completedRoundsCount: 0,
      },
    });

    // First round (R1) should be expanded (no display: none)
    const firstRoundContent = wrapper.findAll(
      '[data-testid="round-horses-list"]'
    )[0];
    expect(firstRoundContent.attributes("style") || "").not.toContain(
      "display: none"
    );

    // Second round (R2) should be collapsed (display: none)
    const secondRoundContent = wrapper.findAll(
      '[data-testid="round-horses-list"]'
    )[1];
    expect(secondRoundContent.attributes("style") || "").toContain(
      "display: none"
    );
  });

  it("should toggle round on click", async () => {
    const wrapper = mount(ProgramTable, {
      props: {
        rounds: mockRounds,
        currentRoundIndex: 0,
        completedRoundsCount: 0,
      },
    });

    // Click second round header (initially closed)
    const secondHeader = wrapper.findAll('[data-testid="round-header"]')[1];
    await secondHeader.trigger("click");

    const secondRoundContent = wrapper.findAll(
      '[data-testid="round-horses-list"]'
    )[1];
    expect(secondRoundContent.attributes("style") || "").not.toContain(
      "display: none"
    );

    // Click first round header (initially open) to close it
    const firstHeader = wrapper.findAll('[data-testid="round-header"]')[0];
    await firstHeader.trigger("click");

    const firstRoundContent = wrapper.findAll(
      '[data-testid="round-horses-list"]'
    )[0];
    expect(firstRoundContent.attributes("style") || "").toContain(
      "display: none"
    );
  });

  it("should match snapshot structure", () => {
    const wrapper = mount(ProgramTable, {
      props: {
        rounds: mockRounds,
        currentRoundIndex: 0,
        completedRoundsCount: 0,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
