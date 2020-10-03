const caeserCipher = (chunk, shift, action) => {
  const shiftAction = action === 'encode' ? Number(shift) : -Number(shift);
  return chunk.map((element) => {
    if (element >= 65 && element <= 90) {
      if (element + shiftAction < 65) {
        return element + shiftAction + 26;
      }
      if (element + shiftAction > 90) {
        return element + shiftAction - 26;
      }
      return element + shiftAction
    }
    if (element >= 97 && element <= 122) {
      if (element + shiftAction < 97) {
        return element + shiftAction + 26;
      }
      if (element + shiftAction > 122) {
        return element + shiftAction - 26;
      }
      return element + shiftAction
    }
    return element
  });
}
module.exports = caeserCipher;