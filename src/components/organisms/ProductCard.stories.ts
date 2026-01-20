import type { Meta, StoryObj } from '@storybook/vue3-vite';

import ProductCard from '@/components/organisms/ProductCard.vue';
import type { Product } from '@/types/product';

// Mock product data
const createProduct = (overrides: Partial<Product> = {}): Product => ({
  id: '1',
  title: 'Essence Mascara Lash Princess',
  brand: 'Essence',
  sku: 'RCH45Q1A',
  price: 9.99,
  rating: 4.5,
  reviews: [
    { rating: 5, comment: 'Great!', date: '2024-01-01', reviewerName: 'John', reviewerEmail: 'john@example.com' },
    { rating: 4, comment: 'Good', date: '2024-01-02', reviewerName: 'Jane', reviewerEmail: 'jane@example.com' },
  ],
  description: 'The Essence Mascara Lash Princess is a popular mascara known for its dramatic volumizing and lengthening effects.',
  images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'],
  stock: 50,
  shippingInformation: 'Ships in 1-2 business days',
  ...overrides,
});

const meta = {
  title: 'Organisms/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  argTypes: {
    product: {
      description: 'The product data to display',
      table: { type: { summary: 'Product' } },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A product card displaying comprehensive product information.

## Features
- Product image with loading skeleton and fallback
- Brand, title, and SKU display
- Star rating with review count
- Price formatted in EUR
- Stock status with color-coded indicators
- Shipping information

## Stock Status Colors
- **Red**: Out of stock (0)
- **Orange**: Low stock (1-9)
- **Green**: In stock (10+)

## Accessibility Features
- Semantic \`<article>\` element
- Descriptive \`aria-label\` attributes for brand, SKU, shipping, and stock
- Alt text on product image
        `,
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
        ],
      },
    },
  },
  render: (args) => ({
    components: { ProductCard },
    setup() {
      return { args };
    },
    template: '<ProductCard v-bind="args" />',
  }),
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default product card with all information */
export const Default: Story = {
  args: {
    product: createProduct(),
  },
};

/** Product with high stock (+100) */
export const HighStock: Story = {
  args: {
    product: createProduct({ stock: 150 }),
  },
};

/** Product with low stock (warning state) */
export const LowStock: Story = {
  args: {
    product: createProduct({ stock: 5 }),
  },
};

/** Product that is out of stock */
export const OutOfStock: Story = {
  args: {
    product: createProduct({ stock: 0 }),
  },
};

/** Product without a brand */
export const NoBrand: Story = {
  args: {
    product: createProduct({ brand: undefined }),
  },
};

/** Product with a long description */
export const LongDescription: Story = {
  args: {
    product: createProduct({
      description: 'This is a very long product description that should be truncated on larger screens. It contains detailed information about the product features, materials, and usage instructions. The description goes on to explain the benefits and unique selling points of this particular item, making it easier for customers to understand what they are purchasing.',
    }),
  },
};

/** Product with no image (shows fallback) */
export const NoImage: Story = {
  args: {
    product: createProduct({ images: [] }),
  },
};

/** Product with broken image URL (shows fallback) */
export const BrokenImage: Story = {
  args: {
    product: createProduct({ images: ['https://invalid-url.com/broken.jpg'] }),
  },
};

/** Product with perfect 5-star rating */
export const FiveStarRating: Story = {
  args: {
    product: createProduct({ rating: 5 }),
  },
};

/** Product with low rating */
export const LowRating: Story = {
  args: {
    product: createProduct({ rating: 1.5 }),
  },
};

/** Expensive product */
export const ExpensiveProduct: Story = {
  args: {
    product: createProduct({
      title: 'Premium Luxury Watch',
      brand: 'Rolex',
      price: 12999.99,
      description: 'An exquisite timepiece crafted with precision and elegance.',
    }),
  },
};
