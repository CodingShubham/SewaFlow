export const templates = [
  {
    id: "whatsapp-order",

    title: "Order Processing",

    description:
      "Receive customer orders through WhatsApp, review them, update inventory, generate invoices and notify customers automatically.",

    category: "Sales",

    icon: "📦",

    features: [
      "AI understands customer messages",
      "Human approval",
      "Inventory reservation",
      "Invoice generation",
      "Customer notifications",
    ],

    requirements: {
      integrations: ["whatsapp"],
    },

    execution: {
      trigger: "whatsapp_message",

      functions: [
        "parseOrder",
        "createCustomer",
        "updateInventory",
        "generateInvoice",
        "notifyCustomer",
      ],
    },

    defaultConfiguration: {
      approvalMode: "automatic",
      outOfStockBehaviour: "notify",
      invoiceMode: "automatic",
      notificationsEnabled: true,
    },
  },

  {
    id: "payment-reminder",

    title: "Payment Reminder",

    description:
      "Automatically remind customers about unpaid invoices.",

    category: "Finance",

    icon: "💰",

    comingSoon: true,
  },

  {
    id: "appointment-booking",

    title: "Appointment Booking",

    description:
      "Automatically manage customer appointments and confirmations.",

    category: "Bookings",

    icon: "📅",

    comingSoon: true,
  },

  {
    id: "customer-support",

    title: "Customer Support",

    description:
      "Answer common customer questions with AI before escalating to your team.",

    category: "Support",

    icon: "💬",

    comingSoon: true,
  },
];