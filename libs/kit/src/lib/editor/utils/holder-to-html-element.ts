export function holderToHTMLElement(holder: string | HTMLElement): HTMLElement {
  if (typeof holder === 'string') {
    return document.querySelector(holder) as HTMLElement;
  }
  return holder;
}
