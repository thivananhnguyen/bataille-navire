const express = require('express');
const messagesController = require('../controllers/messagesController');
const { validateCreateMessage } = require('../middleware/messageValidation');

const router = express.Router();

router.post('/', validateCreateMessage, messagesController.createMessage);
router.get('/', messagesController.getMessages);
router.post('/cleanup', messagesController.cleanupExpiredMessages);

module.exports = router;
