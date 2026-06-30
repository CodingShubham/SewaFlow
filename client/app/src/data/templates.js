export const templates = [
  {
    id: "whatsapp-order",
    title: "WhatsApp Order Automation",
    workflowType: "whatsapp-order",
    description:
      "Automatically convert WhatsApp orders into customers, invoices, and inventory updates.",
    category: "Sales",
    icon: "📦",
    requirements: {
      businessConfig: true,
      integrations: ["whatsapp"],
    },
  },
  {
    id: "invoice-reminder",
    title: "Invoice Reminder",
    workflowType: "invoice-reminder",
    description:
      "Automatically remind customers about unpaid invoices.",
    category: "Finance",
    icon: "📄",
    requirements: {
      businessConfig: true,
      integrations: ["whatsapp"],
    },
  },
];