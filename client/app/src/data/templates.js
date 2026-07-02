export const templates = [

{
    id: "whatsapp-order",

    title: "WhatsApp Order Automation",

    description: "Automatically process customer orders from WhatsApp.",

    requirements: {
        integrations: ["whatsapp"]
    },

    execution: {

        trigger: "whatsapp_message",

        functions: [

            "parseOrder",

            "createCustomer",

            "updateInventory",

            "generateInvoice",

            "notifyCustomer"

        ]

    },

    defaultConfiguration: {

        approvalMode: "automatic",

        outOfStockBehaviour: "notify",

        invoiceMode: "automatic",

        notificationsEnabled: true

    }

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