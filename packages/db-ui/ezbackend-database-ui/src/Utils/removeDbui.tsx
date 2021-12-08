export default function removeDbui(text: string) {
  return text.replace(/^(db-ui\/)/, "");
}
