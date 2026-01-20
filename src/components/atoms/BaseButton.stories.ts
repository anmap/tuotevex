import type { Meta, StoryObj } from '@storybook/vue3-vite';

import BaseButton from '@/components/atoms/BaseButton.vue';

const meta = {
  title: 'Atoms/BaseButton',
  component: BaseButton,
  tags: ['autodocs'],
  args: {
    default: 'Click me',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Visual style variant',
      table: { defaultValue: { summary: 'primary' } },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type (ignored when `to` is set)',
      table: { defaultValue: { summary: 'button' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
      table: { defaultValue: { summary: 'false' } },
    },
    to: {
      control: 'text',
      description: 'Route location — renders as a RouterLink when set',
    },
    default: {
      control: 'text',
      description: 'Slot content',
      table: { type: { summary: 'slot' } },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A versatile button component that renders as a \`<button>\` or an \`<a>\` tag (for navigation).

## Accessibility Features
- Native \`<button>\` element provides keyboard and screen reader support
- \`disabled\` attribute prevents interaction and is announced by assistive tech
- When used as a link, \`aria-disabled\` and \`tabindex="-1"\` are applied when disabled

## Usage Notes
- Set \`to\` prop to render as a link with Vue Router navigation
        `,
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'button-name', enabled: true },
          { id: 'link-name', enabled: true },
        ],
      },
    },
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: `<BaseButton v-bind="args">{{ args.default }}</BaseButton>`,
  }),
} satisfies Meta<typeof BaseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default primary button */
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

/** Secondary/outline style */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

/** Disabled primary button */
export const DisabledPrimary: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    default: 'You can\'t click me 😛',
  },
};

/** Disabled secondary button */
export const DisabledSecondary: Story = {
  args: {
    variant: 'secondary',
    disabled: true,
    default: 'You can\'t click me 😛',
  },
};
