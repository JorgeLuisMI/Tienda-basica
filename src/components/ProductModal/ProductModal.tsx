'use client'

import { useEffect } from 'react'
import { Product } from '@/types/product'
import styles from './ProductModal.module.css'

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
}: ProductModalProps) {
  /**
   * Efecto para manejar la pulsación de la tecla ESC
   * Cierra el modal cuando se presiona ESC
   */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    // Agrega event listener cuando el modal está abierto
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Previene el scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden'
    }

    // Función de limpieza
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // No renderiza si el modal no está abierto o no hay producto
  if (!isOpen || !product) return null

  /**
   * Formatea el precio a moneda EUR
   */
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(price)
  }

  /**
   * Maneja el clic en el fondo
   * Cierra el modal al hacer clic fuera del contenido
   */
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className={styles.overlay}
      onClick={handleBackdropClick}
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
    >
      <div className={styles.modal}>
        {/* Botón de cerrar */}
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label='Close modal'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <line x1='18' y1='6' x2='6' y2='18' />
            <line x1='6' y1='6' x2='18' y2='18' />
          </svg>
        </button>

        {/* Imagen del producto */}
        <div className={styles.imageContainer}>
          <img
            src={product.image}
            alt={product.title}
            className={styles.image}
          />
        </div>

        {/* Detalles del producto */}
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 id='modal-title' className={styles.title}>
              {product.title}
            </h2>
            <span className={styles.category}>{product.category}</span>
          </div>

          <p className={styles.description}>{product.description}</p>

          <div className={styles.footer}>
            <span className={styles.price}>{formatPrice(product.price)}</span>
            <button
              className={styles.addButton}
              aria-label={`Add ${product.title} to cart`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
