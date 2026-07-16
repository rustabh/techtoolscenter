export interface LineItem {
  id: string;
  description: string;
  qty: number;
  rate: number;
}

export interface Party {
  name: string;
  address: string;
  email: string;
  phone: string;
  gstin: string;
}

export function newItem(): LineItem {
  return { id: Math.random().toString(36).slice(2), description: "", qty: 1, rate: 0 };
}

export function subtotal(items: LineItem[]): number {
  return items.reduce((sum, i) => sum + (i.qty || 0) * (i.rate || 0), 0);
}
