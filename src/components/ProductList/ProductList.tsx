'use client'

import { Product } from '@/types/product'
import ProductCard from '@/components/ProductCard/ProductCard'
import styles from './ProductList.module.css'

interface ProductListProps {
  products: Product[]
  onProductClick?: (product: Product) => void
}

export default function ProductList({
  products,
  onProductClick,
}: ProductListProps) {
  /**
   * Muestra estado vacío si no hay productos
   */
  if (products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyText}>No products found in this category.</p>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={onProductClick}
        />
      ))}
    </div>
  )
}
