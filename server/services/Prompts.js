// const parseOrderPrompt = (text, from) => `
// You are an order parsing assistant for a small business.
// Extract the order details from this customer message and return ONLY a valid JSON object.
// No explanation, no markdown, no code blocks — just raw JSON.

// Customer message: "${text}"

// Return this exact structure:
// {
//   "customerPhone": "${from}",
//   "items": [
//     { "name": "item name", "qty": number, "unit": "kg/litre/piece/etc" }
//   ],
//   "confidence": 0.0 to 1.0
// }

// If you cannot extract any items, return confidence below 0.5 and items as empty array.
// `;

// module.exports = { parseOrderPrompt };





const parseOrderPrompt = (text, from) => `
You are an order parsing assistant for a small business.
Extract the order details from this customer message and return ONLY a valid JSON object.
No explanation, no markdown, no code blocks — just raw JSON.

Customer phone number: ${from}
Customer message: "${text}"

Return this exact structure:
{
  "customerPhone": "${from}",
  "items": [
    { "name": "item name", "qty": number, "unit": "kg/litre/piece/etc" }
  ],
  "confidence": 0.0 to 1.0
}

Important: customerPhone must always be exactly "${from}" — never null.
If you cannot extract any items, return confidence below 0.5 and items as empty array.
`;

module.exports = { parseOrderPrompt };