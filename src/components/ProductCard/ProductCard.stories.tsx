import type { Meta, StoryObj } from '@storybook/react'
import ProductCard from './ProductCard'

const meta: Meta<typeof ProductCard> = {
  title: 'Components/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  argTypes: {
    product: { control: 'object' },
    onClick: { action: 'clicked' },
  },
}
export default meta

type Story = StoryObj<typeof ProductCard>

export const Default: Story = {
  args: {
    product: {
      id: 1,
      title: 'Zapatos deportivos',
      description: 'Zapatos cómodos para correr',
      price: 59.99,
      category: 'calzado',
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      rating: { rate: 4.5, count: 120 },
    },
  },
}
