import type { Meta, StoryObj } from '@storybook/vue3';
import { within, userEvent } from '@storybook/testing-library';
import CdnDashboard from "../components/CdnDashboard.vue";

const meta = {
  title: 'BieluCdn/Dashboard',
  component: CdnDashboard,
  render: () => ({
    components: { CdnDashboard },
    template: '<cdn-dashboard/>',
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/vue/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof CdnDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/vue/writing-tests/interaction-testing
export const LoggedIn: Story = {
  play: async ({ canvasElement }: any) => {
    const canvas = within(canvasElement);
    const loginButton = await canvas.getByRole('button', {
      name: /DefaultDashboard/i,
    });
    await userEvent.click(loginButton);
  },
};
