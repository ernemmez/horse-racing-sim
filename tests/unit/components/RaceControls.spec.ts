import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import RaceControls from "../../../src/components/molecules/RaceControls.vue";
import BaseButton from "../../../src/components/atoms/BaseButton.vue";

describe("RaceControls.vue", () => {
  const defaultProps = {
    hasProgram: false,
    canStart: false,
    isRaceActive: false,
    isProgramFinished: false,
    isPaused: false,
  };

  // Register BaseButton stub or use real component component if simple
  const globalOptions = {
    components: {
      BaseButton,
    },
  };

  it("should render generate button enabled initially", () => {
    const wrapper = mount(RaceControls, {
      props: defaultProps,
      global: globalOptions,
    });

    const generateBtn = wrapper.find('[data-testid="generate-button"]');
    expect(generateBtn.exists()).toBe(true);
    expect(generateBtn.attributes("disabled")).toBeUndefined();
  });

  it("should disable generate button when race active", () => {
    const wrapper = mount(RaceControls, {
      props: { ...defaultProps, isRaceActive: true },
      global: globalOptions,
    });

    expect(
      wrapper.find('[data-testid="generate-button"]').attributes("disabled")
    ).toBeDefined();
  });

  it("should show Start button when race not active", () => {
    const wrapper = mount(RaceControls, {
      props: defaultProps,
      global: globalOptions,
    });

    expect(wrapper.find('[data-testid="start-button"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="pause-button"]').exists()).toBe(false);
  });

  it("should show Pause button when race IS active", () => {
    const wrapper = mount(RaceControls, {
      props: { ...defaultProps, isRaceActive: true },
      global: globalOptions,
    });

    expect(wrapper.find('[data-testid="start-button"]').exists()).toBe(false);
    expect(wrapper.find('[data-testid="pause-button"]').exists()).toBe(true);
  });

  it("should emit events on click", async () => {
    const wrapper = mount(RaceControls, {
      props: { ...defaultProps, canStart: true },
      global: globalOptions,
    });

    await wrapper.find('[data-testid="generate-button"]').trigger("click");
    expect(wrapper.emitted("generate")).toHaveLength(1);

    await wrapper.find('[data-testid="start-button"]').trigger("click");
    expect(wrapper.emitted("start")).toHaveLength(1);
  });

  it("should emit pause event", async () => {
    const wrapper = mount(RaceControls, {
      props: { ...defaultProps, isRaceActive: true },
      global: globalOptions,
    });

    await wrapper.find('[data-testid="pause-button"]').trigger("click");
    expect(wrapper.emitted("pause")).toHaveLength(1);
  });
});
