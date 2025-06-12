export class MathUtils {
  static generateNineDigitNumber(): string {
    return Math.floor(Math.random() * 1_000_000_000)
      .toString()
      .padStart(9, '0')
  }
}
