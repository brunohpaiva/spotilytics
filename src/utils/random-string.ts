const decimalToHex = (number: number) => {
  return number.toString(16).padStart(2, "0")
}

export const randomString = (length = 40) => {
  const array = window.crypto.getRandomValues(new Uint8Array(length / 2))
  return Array.from(array, decimalToHex).join('')
}

