import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { type App, getCurrentInstance } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';

import NavBar from '@/components/organisms/NavBar.vue';

// Create a mock router for Storybook
const createMockRouter = (initialRoute = '/') => {
  const router = createRouter({
    history: createMemoryHistory(initialRoute),
    routes: [
      { path: '/', name: 'home', component: { template: '<div />' } },
    ],
  });
  return router;
};

const meta = {
  title: 'Organisms/NavBar',
  component: NavBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The main navigation bar containing the logo and search functionality.

## Features
- Logo links to home page
- Search bar with URL query sync
- Responsive layout (stacks on mobile, inline on desktop)

## Accessibility Features
- \`aria-label="Main navigation"\` for landmark identification
- Logo image has descriptive alt text
- Search bar includes proper ARIA labels
        `,
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'landmark-unique', enabled: true },
        ],
      },
    },
  },
  decorators: [
    (story, context) => {
      const initialRoute = (context.parameters?.initialRoute as string) || '/';
      const router = createMockRouter(initialRoute);
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
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default state on the home page */
export const Default: Story = {};
