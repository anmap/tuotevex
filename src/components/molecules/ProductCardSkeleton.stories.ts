import type { Meta, StoryObj } from '@storybook/vue3-vite';

import ProductCardSkeleton from '@/components/molecules/ProductCardSkeleton.vue';

const meta = {
  title: 'Molecules/ProductCardSkeleton',
  component: ProductCardSkeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A loading placeholder for product cards.

## Accessibility
- Built with \`AnimatedSkeleton\` which uses \`aria-hidden="true"\`
- Screen readers will skip this decorative loading state

## Usage
- Display while fetching product data
- Matches the layout of \`ProductCard\` for seamless transition
        `,
      },
    },
  },
} satisfies Meta<typeof ProductCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Single product card skeleton */
export const Default: Story = {};

/** Multiple skeletons simulating a loading list */
export const LoadingList: Story = {
  render: () => ({
    components: { ProductCardSkeleton },
    template: `
      <div class="space-y-4">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    `,
  }),
};
