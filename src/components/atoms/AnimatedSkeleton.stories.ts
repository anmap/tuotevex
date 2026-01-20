import type { Meta, StoryObj } from '@storybook/vue3-vite';

import AnimatedSkeleton from '@/components/atoms/AnimatedSkeleton.vue';

const meta = {
  title: 'Atoms/AnimatedSkeleton',
  component: AnimatedSkeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A loading placeholder with a pulse animation.

## Accessibility
- Uses \`aria-hidden="true"\` and \`role="presentation"\` to hide from screen readers
- This is correct since skeletons are decorative loading indicators

## Usage
- Style with utility classes for width, height, and border-radius.
        `,
      },
    },
  },
} satisfies Meta<typeof AnimatedSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default skeleton bar */
export const Default: Story = {
  render: () => ({
    components: { AnimatedSkeleton },
    template: '<AnimatedSkeleton class="w-48 h-4" />',
  }),
};

/** Text line placeholder */
export const TextLine: Story = {
  render: () => ({
    components: { AnimatedSkeleton },
    template: '<AnimatedSkeleton class="w-64 h-4" />',
  }),
};

/** Avatar/image placeholder */
export const Avatar: Story = {
  render: () => ({
    components: { AnimatedSkeleton },
    template: '<AnimatedSkeleton class="w-12 h-12 rounded-full" />',
  }),
};

/** Multiple lines simulating a text block */
export const TextBlock: Story = {
  render: () => ({
    components: { AnimatedSkeleton },
    template: `
      <div class="space-y-2 w-64">
        <AnimatedSkeleton class="h-4 w-full" />
        <AnimatedSkeleton class="h-4 w-full" />
        <AnimatedSkeleton class="h-4 w-3/4" />
      </div>
    `,
  }),
};

/** Card-like skeleton layout */
export const CardLayout: Story = {
  render: () => ({
    components: { AnimatedSkeleton },
    template: `
      <div class="w-64 p-4 border border-gray-200 rounded-lg space-y-3">
        <AnimatedSkeleton class="h-32 w-full rounded" />
        <AnimatedSkeleton class="h-4 w-3/4" />
        <AnimatedSkeleton class="h-4 w-1/2" />
      </div>
    `,
  }),
};
