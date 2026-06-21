const mongoose = require('mongoose');

const executionSchema = new mongoose.Schema({
  workflowId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkFlow',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['running', 'success', 'failed'],
    default: 'running'
  },
  currentStep: {
    type: String,
    default: null
  },
  logs: {
    type: [
      {
        step: String,
        status: String,
        input: mongoose.Schema.Types.Mixed,
        output: mongoose.Schema.Types.Mixed,
        error: String,
        durationMs: Number
      }
    ],
    default: []
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  finishedAt: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model('Execution', executionSchema);