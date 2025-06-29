export class CollectionsUtils {
  static randomElement<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
  }

  static randomSubArray<T>(array: T[]): T[] {
    if (array.length === 0) {
      throw new Error('array lenght should be greater than 0')
    }

    const length = Math.floor(Math.random() * (array.length + 1))
    const shuffled = [...array].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, length)
  }
}
