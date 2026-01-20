import type { Meta, StoryObj } from '@storybook/vue3-vite';

import StarRating from '@/components/atoms/StarRating.vue';

const meta = {
  title: 'Atoms/StarRating',
  component: StarRating,
  tags: ['autodocs'],
  argTypes: {
    rating: {
      control: { type: 'range', min: 0, max: 5, step: 0.1 },
      description: 'The rating value from 0 to 5',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A star rating display component that shows ratings from 0-5 stars.

## Accessibility Features
- Uses \`role="img"\` to indicate the component represents a graphic
- Provides an \`aria-label\` that announces the rating (e.g., "3.5 out of 5 stars")
- Decorative star icons are hidden from screen readers with \`aria-hidden="true"\`
- Color contrast meets WCAG AA standards for the filled star color

## Usage Notes
- This component is display-only and not interactive
- Screen readers will announce the full rating text
        `,
      },
    },
    a11y: {
      config: {
        rules: [
          // Ensure color contrast is checked
          { id: 'color-contrast', enabled: true },
          // Verify images have accessible names
          { id: 'image-alt', enabled: true },
          // Check for valid ARIA roles
          { id: 'aria-roles', enabled: true },
        ],
      },
    },
  },
} satisfies Meta<typeof StarRating>;

export default meta;
type Story = StoryObj<typeof meta>;

/** All 5 stars filled. Screen reader: "5 out of 5 stars" */
export const FullStars: Story = {
  args: {
    rating: 5,
  },
};

/** Demonstrates the half-star indicator. Screen reader: "2.5 out of 5 stars" */
export const HalfStars: Story = {
  args: {
    rating: 2.5,
  },
};

/** All stars empty. Screen reader: "0 out of 5 stars" */
export const EmptyStars: Story = {
  args: {
    rating: 0,
  },
};
