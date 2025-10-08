import type { Meta, StoryObj } from '@storybook/react'
import FilterDropdown from './FilterDropdown'

const meta: Meta<typeof FilterDropdown> = {
  title: 'Components/FilterDropdown',
  component: FilterDropdown,
  tags: ['autodocs'],
  argTypes: {
    categories: { control: 'object' },
    selectedCategory: { control: 'text' },
    onCategoryChange: { action: 'categoryChanged' },
  },
}
export default meta

type Story = StoryObj<typeof FilterDropdown>

export const Default: Story = {
  args: {
    categories: ['calzado', 'ropa', 'accesorios'],
    selectedCategory: 'calzado',
  },
}
