import type { Meta, StoryObj } from '@storybook/react'
import ProductModal from './ProductModal'

const meta: Meta<typeof ProductModal> = {
  title: 'Components/ProductModal',
  component: ProductModal,
  tags: ['autodocs'],
  argTypes: {
    product: { control: 'object' },
    isOpen: { control: 'boolean' },
    onClose: { action: 'closed' },
  },
}
export default meta

type Story = StoryObj<typeof ProductModal>

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
    isOpen: true,
  },
}
