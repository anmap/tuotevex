import type { Meta, StoryObj } from '@storybook/vue3-vite';

import HomeView from '@/views/HomeView.vue';

const meta = {
  title: 'Views/HomeView',
  component: HomeView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The landing page displayed when users first visit the application.

## Features
- Animated fade-slide-up entrance effect
- Logo with responsive sizing
- Welcome message with call-to-action badge
- Instructs users to use the search bar

## Accessibility Features
- \`aria-labelledby\` links the section to its heading
- Decorative logo has empty alt text
- Sparkles icon is hidden from screen readers
        `,
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'heading-order', enabled: true },
        ],
      },
    },
  },
} satisfies Meta<typeof HomeView>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default landing page view */
export const Default: Story = {};
