const express = require('express');
const router = express.Router();

const executeWorkflow = require('../services/executionEngine');
const Integration = require('../Model/Integrations');
const Workflow = require('../Model/WorkFlow');

router.get('/whatsapp', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
        console.log('Webhook verified');
        return res.status(200).send(challenge);
    }

    return res.sendStatus(403);
});

router.post('/whatsapp', async (req, res) => {
    try {

        // Respond to Meta immediately
        res.sendStatus(200);

        const entry = req.body.entry?.[0];
        const changes = entry?.changes?.[0];
        const value = changes?.value;
        const message = value?.messages?.[0];

        if (!message) return;

        const phoneNumberId = value?.metadata?.phone_number_id;
        const from = message.from;
        const text = message.text?.body;

        if (!text || !phoneNumberId) return;

        console.log(`Message from ${from}: ${text}`);

        // Find connected WhatsApp Integration
        const integration = await Integration.findOne({
            type: "whatsapp",
            "credentials.phoneNumberId": phoneNumberId,
            status: "connected"
        });

        if (!integration) {
            console.log(`No connected WhatsApp integration found for phoneNumberId: ${phoneNumberId}`);
            return;
        }

        // Find active workflow for this business
        const workflow = await Workflow.findOne({
            userId: integration.userId,
            trigger: "whatsapp_message",
            isActive: true
        });

        if (!workflow) {
            console.log(`No active workflow found for user: ${integration.userId}`);
            return;
        }

        const eventData = {
            rawMessage: {
                from,
                text
            },
            integration: {
                accessToken: integration.credentials.accessToken,
                phoneNumberId: integration.credentials.phoneNumberId
            }
        };

        // Execute workflow
        await executeWorkflow(workflow, eventData);

    } catch (error) {
        console.error("Webhook error:", error.message);
    }
});

module.exports = router;