/**
 * Format a number as a Finnish formatted currency string.
 *
 * @param price - The number to format.
 * @returns A string representing the number in the format "100.00 €".
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fi-FI', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}

/**
 * Render the number of stars for a given rating.
 *
 * @param rating - The rating to render stars for.
 * @returns An object containing the number of full stars, half stars, and empty stars.
 */
export const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = !Number.isInteger(rating)
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return { fullStars, hasHalfStar, emptyStars }
}

/**
 * Normalize a Vue Router query value into a single string.
 *
 * - Arrays are reduced to the first value
 * - Non-string values become an empty string
 *
 * @param value - The raw value from `route.query`.
 * @returns A single string suitable for input binding.
 */
export const normalizeQueryValue = (value: unknown) => {
  if (Array.isArray(value)) {
    return value[0] ?? ''
  }
  return typeof value === 'string' ? value : ''
}
