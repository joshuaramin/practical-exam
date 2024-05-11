export default function generateTaskID(length: number) {
  var digits = "0123456789";
  let is = "";
  for (let i = 0; i < length; i++) {
    is += digits[Math.floor(Math.random() * 10)];
  }
  return is;
}
