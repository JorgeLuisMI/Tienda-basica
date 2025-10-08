import { Product } from '@/types/product'

/**
 * URL base para Fake Store API
 */
const API_BASE_URL = 'https://fakestoreapi.com'

/**
 * Obtiene todos los productos de la API
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

/**
 * Obtiene todas las categorías disponibles de la API
 */
export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const categories = await response.json()
    // Agrega 'All' al inicio para el filtro
    return ['All', ...categories]
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

/**
 * Obtiene productos por categoría
 */
export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error)
    throw error
  }
}
