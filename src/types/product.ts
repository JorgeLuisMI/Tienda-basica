/**
 * Interfaz Product
 * Representa un producto individual en nuestro catálogo
 * La estructura coincide con la respuesta de Fake Store API: https://fakestoreapi.com/
 */
export interface Product {
  id: number
  title: string
  price: number
  category: string
  image: string
  description: string
  rating: {
    rate: number
    count: number
  }
}

/**
 * Interfaz ProductCardProps
 * Define las props que acepta el componente ProductCard
 */
export interface ProductCardProps {
  product: Product
  onClick?: (product: Product) => void
}

/**
 * Interfaz FilterDropdownProps
 * Define las props para el dropdown de filtro de categorías
 */
export interface FilterDropdownProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}
