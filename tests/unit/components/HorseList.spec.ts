import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import HorseList from "../../../src/components/organisms/HorseList.vue";

describe("HorseList.vue", () => {
  const mockHorses = [
    {
      id: "1",
      name: "Horse 1",
      color: "#000000",
      condition: 90,
      stamina: 80,
      maxCondition: 100,
    },
    {
      id: "2",
      name: "Horse 2",
      color: "#FFFFFF",
      condition: 40,
      stamina: 70,
      maxCondition: 100,
    },
  ];

  it("should render empty state when no horses", () => {
    const wrapper = mount(HorseList, {
      props: { horses: [] },
    });

    expect(wrapper.find('[data-testid="empty-state"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="horse-table"]').exists()).toBe(false);
  });

  it("should render horse list when horses exist", () => {
    const wrapper = mount(HorseList, {
      props: { horses: mockHorses },
    });

    expect(wrapper.find('[data-testid="empty-state"]').exists()).toBe(false);
    expect(wrapper.find('[data-testid="horse-table"]').exists()).toBe(true);
    expect(wrapper.findAll('[data-testid="horse-row"]')).toHaveLength(2);
  });

  it("should display correct horse details", () => {
    const wrapper = mount(HorseList, {
      props: { horses: mockHorses },
    });

    const firstRow = wrapper.findAll('[data-testid="horse-row"]')[0];
    expect(firstRow.find('[data-testid="horse-name"]').text()).toBe("Horse 1");
    expect(firstRow.find('[data-testid="horse-condition"]').text()).toBe("90");
    expect(firstRow.find('[data-testid="stamina-pill"]').text()).toBe("S:80");
  });

  it("should show tooltip on hover", async () => {
    const wrapper = mount(HorseList, {
      props: { horses: mockHorses },
      global: {
        stubs: {
          Teleport: {
            template: "<div><slot /></div>",
          },
        },
      },
    });

    const pill = wrapper.find('[data-testid="stamina-pill"]');
    await pill.trigger("mouseenter");

    expect(wrapper.find('[data-testid="stamina-tooltip"]').exists()).toBe(true);

    await pill.trigger("mouseleave");
    expect(wrapper.find('[data-testid="stamina-tooltip"]').exists()).toBe(
      false
    );
  });
});
