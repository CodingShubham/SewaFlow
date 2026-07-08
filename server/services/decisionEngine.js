const decideOrderExecution = async (input) => {

    const {
        rawMessage,
        items = [],
        confidence = 0
    } = input;

    const message = (rawMessage?.text || "")
        .trim()
        .toLowerCase();

    const greetings = [
        "hi",
        "hello",
        "hey",
        "good morning",
        "good evening",
        "good afternoon",
        "thanks",
        "thank you",
        "ok",
        "okay"
    ];

    if (greetings.includes(message)) {

        return {
            shouldContinue: false,
            reason: "Greeting message"
        };

    }

    if (items.length === 0) {

        return {
            shouldContinue: false,
            reason: "No order items detected"
        };

    }

    if (confidence < 0.7) {

        return {
            shouldContinue: false,
            reason: "Low confidence order detection"
        };

    }

    return {
        shouldContinue: true
    };

};

module.exports = {
    decideOrderExecution
};