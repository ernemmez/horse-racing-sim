import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BaseButton from "../../../src/components/atoms/BaseButton.vue";

describe("BaseButton.vue", () => {
  it("should render slot content", () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: "Click Me",
      },
    });

    expect(wrapper.find('[data-testid="base-button"]').text()).toBe("Click Me");
  });

  it("should apply variant class", () => {
    const wrapper = mount(BaseButton, {
      props: { variant: "danger" },
    });

    expect(wrapper.find('[data-testid="base-button"]').classes()).toContain(
      "danger"
    );
  });

  it("should apply disabled state", () => {
    const wrapper = mount(BaseButton, {
      props: { disabled: true },
    });

    const btn = wrapper.find('[data-testid="base-button"]');
    expect(btn.classes()).toContain("disabled");
    expect(btn.attributes("disabled")).toBeDefined();
  });

  it("should emit click event", async () => {
    const wrapper = mount(BaseButton);

    await wrapper.find('[data-testid="base-button"]').trigger("click");
    expect(wrapper.emitted("click")).toHaveLength(1);
  });
});
