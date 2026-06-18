export interface InvoiceItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Invoice {
  id: string;

  invoiceNumber: string;

  date: string;

  items: InvoiceItem[];

  subtotal: number;

  gst: number;

  discount: number;

  total: number;
}