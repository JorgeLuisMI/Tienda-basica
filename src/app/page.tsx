'use client'

import { useState, useMemo, useEffect } from 'react'
import FilterDropdown from '@/components/FilterDropdown/FilterDropdown'
import ProductList from '@/components/ProductList/ProductList'
import ProductModal from '@/components/ProductModal/ProductModal'
import { fetchProducts, fetchCategories } from '@/data/products'
import { Product } from '@/types/product'
import styles from './page.module.css'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>(['All'])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true) // Inicia estado de carga
        setError(null) // Resetea cualquier error previo

        // Obtiene productos y categorías en paralelo para mejor rendimiento
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ])

        setProducts(productsData) // Actualiza estado con productos obtenidos
        setCategories(categoriesData) // Actualiza estado con categorías obtenidas
      } catch (err) {
        setError(
          'Failed to load products. Please check your internet connection and try again.'
        ) // Mensaje de error genérico
        console.error('Error loading data:', err)
      } finally {
        setLoading(false) // Finaliza estado de carga
      }
    }

    loadData() // Llama a la función de carga de datos
  }, []) // Array de dependencias vacío = ejecutar una vez al montar

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return products
    }
    return products.filter((product) => product.category === selectedCategory)
  }, [selectedCategory, products]) // Recalcula si cambia la categoría o los productos

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category) // Actualiza la categoría seleccionada
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product) // Establece el producto seleccionado para mostrar en el modal
  }

  const handleCloseModal = () => {
    setSelectedProduct(null) // Limpia el producto seleccionado, cerrando el modal
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Sección de encabezado */}
        <header className={styles.header}>
          <h1 className={styles.title}>Tienda básica</h1>
          <p className={styles.subtitle}>
            Tienda de productos con Next.js y TypeScript
          </p>
        </header>

        {/* Estado de carga */}
        {loading && (
          <div className={styles.loading}>
            <p>Loading products...</p>
          </div>
        )}

        {/* Estado de error */}
        {error && (
          <div className={styles.error}>
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className={styles.retryButton}
            >
              Retry
            </button>
          </div>
        )}

        {/* Visualización de productos - solo cuando no está cargando y no hay error */}
        {!loading && !error && (
          <>
            {/* Sección de filtro */}
            <section
              className={styles.filterSection}
              aria-label='Product filters'
            >
              <FilterDropdown
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
              <p className={styles.resultCount} aria-live='polite'>
                Mostrando {filteredProducts.length}{' '}
                {filteredProducts.length === 1 ? 'producto' : 'productos'}
              </p>
            </section>

            {/* Sección de productos */}
            <section
              className={styles.productsSection}
              aria-label='Product list'
            >
              <ProductList
                products={filteredProducts}
                onProductClick={handleProductClick}
              />
            </section>

            {/* Modal de detalle del producto */}
            <ProductModal
              product={selectedProduct}
              isOpen={selectedProduct !== null}
              onClose={handleCloseModal}
            />
          </>
        )}
      </main>

      {/* Pie de página */}
      <footer className={styles.footer}>
        <p>© 2025 Tienda básica by Jorge Moreno</p>
      </footer>
    </div>
  )
}
