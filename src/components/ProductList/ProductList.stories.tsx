import type { Meta, StoryObj } from '@storybook/react'
import ProductList from './ProductList'

const meta: Meta<typeof ProductList> = {
  title: 'Components/ProductList',
  component: ProductList,
  tags: ['autodocs'],
  argTypes: {
    products: { control: 'object' },
    onProductClick: { action: 'productClicked' },
  },
}
export default meta

type Story = StoryObj<typeof ProductList>

export const Default: Story = {
  args: {
    products: [
      {
        id: 1,
        title: 'Zapatos deportivos',
        description: 'Zapatos cómodos para correr',
        price: 59.99,
        category: 'calzado',
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        rating: { rate: 4.5, count: 120 },
      },
      {
        id: 2,
        title: 'Camiseta básica',
        description: 'Camiseta de algodón suave',
        price: 19.99,
        category: 'ropa',
        image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
        rating: { rate: 4.2, count: 80 },
      },
    ],
  },
}
