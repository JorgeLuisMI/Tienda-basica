'use client'

import { FilterDropdownProps } from '@/types/product'
import styles from './FilterDropdown.module.css'

export default function FilterDropdown({
  categories,
  selectedCategory,
  onCategoryChange,
}: FilterDropdownProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(e.target.value)
  }

  return (
    <div className={styles.container}>
      <label htmlFor='category-filter' className={styles.label}>
        Filtro:
      </label>
      <select
        id='category-filter'
        className={styles.select}
        value={selectedCategory}
        onChange={handleChange}
        aria-label='Filter products by category'
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}
