'use client'

import { ProductCardProps } from '@/types/product'
import styles from './ProductCard.module.css'

export default function ProductCard({ product, onClick }: ProductCardProps) {
  /**
   * Maneja el clic en la tarjeta
   * Solo se activa si se proporciona un manejador onClick
   */
  const handleClick = () => {
    if (onClick) {
      onClick(product)
    }
  }

  /**
   * Maneja la interacción con el teclado
   * Hace que la tarjeta sea accesible vía teclado (teclas Enter/Espacio)
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault()
      onClick(product)
    }
  }

  /**
   * Formatea el precio a moneda
   * Convierte número a formato de moneda EUR
   */
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(price)
  }

  return (
    <article
      className={`${styles.card} ${onClick ? styles.clickable : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      aria-label={`${product.title} - ${formatPrice(product.price)}`}
    >
      {/* Contenedor de imagen del producto */}
      <div className={styles.imageContainer}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.image}
          loading='lazy'
        />
        {/* Insignia de categoría */}
        <span
          className={styles.category}
          aria-label={`Category: ${product.category}`}
        >
          {product.category}
        </span>
      </div>

      {/* Información del producto */}
      <div className={styles.content}>
        <h3 className={styles.name}>{product.title}</h3>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.footer}>
          <span
            className={styles.price}
            aria-label={`Price: ${formatPrice(product.price)}`}
          >
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </article>
  )
}
