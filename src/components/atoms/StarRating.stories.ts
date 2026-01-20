import type { Meta, StoryObj } from '@storybook/vue3-vite';

import StarRating from '@/components/atoms/StarRating.vue';

const meta = {
  title: 'Atoms/StarRating',
  component: StarRating,
  tags: ['autodocs'],
  argTypes: {
    rating: { control: 'number' },
  },
} satisfies Meta<typeof StarRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullStars: Story = {
  args: {
    rating: 5,
  },
};

export const HalfStars: Story = {
  args: {
    rating: 2.5,
  },
};

export const EmptyStar: Story = {
  args: {
    rating: 0,
  },
};
