const express = require('express');
const router = express.Router();
const executeWorkflow = require('../services/executionEngine');
const User = require('../Model/User');

router.get('/whatsapp', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
        console.log('Webhook verified');
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

router.post('/whatsapp', async (req, res) => {
    try {
       
        res.sendStatus(200);

        const entry = req.body.entry?.[0];
        const changes = entry?.changes?.[0];
        const message = changes?.value?.messages?.[0];

        if (!message) return;

        const from = message.from;
        const text = message.text?.body;

        if (!text) return;

        console.log(`Message from ${from}: ${text}`);

        const eventData = {
            rawMessage: { from, text }
        };

        const user = await User.findOne({});
        if (!user) return;

        await executeWorkflow("whatsapp_order", eventData, user._id);

    } catch (error) {
        console.error('Webhook error:', error.message);
    }
});

module.exports = router;