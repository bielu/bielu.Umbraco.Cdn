
import type { Meta, StoryObj } from '@storybook/vue3';
import RefreshNode from "../components/RefreshNode.vue";

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'BieluCdn/RefreshNode',
  component: RefreshNode,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  
} satisfies Meta<typeof RefreshNode>;

export default meta;
type Story = StoryObj<typeof RefreshNode>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
  },
};
