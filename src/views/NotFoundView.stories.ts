import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { type App, getCurrentInstance } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';

import NotFoundView from '@/views/NotFoundView.vue';

// Create a mock router for Storybook
const createMockRouter = () => {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: { template: '<div />' } },
      { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
    ],
  });
};

const meta = {
  title: 'Views/NotFoundView',
  component: NotFoundView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The 404 error page displayed when users navigate to a non-existent route.

## Features
- Large decorative "404" text with broken link icon
- Clear error message explaining the situation
- "Go Back" button (uses browser history or falls back to home)
- "Back to Homepage" button

## Accessibility Features
- Screen reader announcement for the error
- \`aria-labelledby\` links the section to its heading
- Decorative elements are hidden from assistive technology
- Action buttons have clear text labels
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
  decorators: [
    () => {
      const router = createMockRouter();
      return {
        setup() {
          const app = getCurrentInstance()?.appContext.app as App;
          if (!app._context.provides?.['$router']) {
            app.use(router);
          }
        },
        template: '<story />',
      };
    },
  ],
} satisfies Meta<typeof NotFoundView>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default 404 error page */
export const Default: Story = {};
