import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import StatusBadge from "../../../src/components/atoms/StatusBadge.vue";

describe("StatusBadge.vue", () => {
  it("should render slot content", () => {
    const wrapper = mount(StatusBadge, {
      props: { status: "active" },
      slots: {
        default: "Active Status",
      },
    });

    expect(wrapper.find('[data-testid="status-badge"]').text()).toBe(
      "Active Status"
    );
  });

  it("should apply correct status class", () => {
    const wrapper = mount(StatusBadge, {
      props: { status: "waiting" },
    });

    expect(wrapper.find('[data-testid="status-badge"]').classes()).toContain(
      "waiting"
    );
  });
});
