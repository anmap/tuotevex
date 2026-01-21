import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import SearchBar from '@/components/molecules/SearchBar.vue';

const meta = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'The search input value (v-model)',
      table: { defaultValue: { summary: '""' } },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A search input component with a search icon and rounded pill styling.

## Features
- Uses \`v-model\` for two-way binding
- Prevents form submission (search-as-you-type pattern)

## Accessibility Features
- \`role="search"\` landmark for screen readers
- \`aria-label\` on form and input for context
- Native \`<input type="search">\` provides clear button in some browsers
        `,
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'label', enabled: true },
        ],
      },
    },
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Empty search bar in its default state */
export const Default: Story = {
  render: () => ({
    components: { SearchBar },
    template: '<SearchBar />',
  }),
};

/** Search bar with a pre-filled value */
export const WithValue: Story = {
  render: () => ({
    components: { SearchBar },
    setup() {
      const search = ref('iPhone');
      return { search };
    },
    template: '<SearchBar v-model="search" />',
  }),
};

/** Interactive demo showing real-time v-model binding */
export const Interactive: Story = {
  render: () => ({
    components: { SearchBar },
    setup() {
      const search = ref('');
      return { search };
    },
    template: `
      <div class="space-y-4">
        <SearchBar v-model="search" />
        <p class="text-sm text-slate-600">
          Current value: <code class="bg-slate-100 px-2 py-1 rounded">{{ search || '(empty)' }}</code>
        </p>
      </div>
    `,
  }),
};

/** Constrained width example (e.g., in a navbar) */
export const ConstrainedWidth: Story = {
  render: () => ({
    components: { SearchBar },
    template: `
      <div class="w-64">
        <SearchBar />
      </div>
    `,
  }),
};

/** Full width example (e.g., in a search page) */
export const FullWidth: Story = {
  render: () => ({
    components: { SearchBar },
    template: `
      <div class="w-full max-w-2xl">
        <SearchBar />
      </div>
    `,
  }),
};
