// backend/routes/index.js
const express = require('express');
const router = express.Router();

const betController = require('../controllers/betController'); // если он используется отдельно
const walletService = require('../services/walletService');
const { getDollarRate } = require('../services/rateService');
const { calculateCoefficient } = require('../services/betService');

// Эндпоинт для получения данных пользователя (User)
router.get('/user/:id', (req, res) => {
  // Здесь можно использовать реальную логику или вернуть тестового пользователя
  res.json({ id: req.params.id, balance: 100, name: "Test User" });
});

// Эндпоинт для получения курса (например, из ЦБ РФ)
router.get('/rate', async (req, res) => {
  try {
    const rate = await getDollarRate();
    res.json({ rate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Эндпоинт для создания счета (invoice) – уберите заглушку, если готовы к работе с TMA Wallet
router.post('/createBetInvoice', async (req, res) => {
  try {
    const { direction, userAmount } = req.body;
    if (!direction || !userAmount) {
      return res.status(400).json({ error: "direction and userAmount are required" });
    }
    // Здесь должна быть логика создания счета через TMA Wallet API
    const invoice_url = `https://your-tma-wallet-endpoint/invoice?direction=${direction}&amount=${userAmount}`;
    res.json({ invoice_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Новый эндпоинт для получения коэффициентов ставок
router.get('/coefficient', async (req, res) => {
  try {
    const coeff = await calculateCoefficient();
    res.json({ up: coeff.up, down: coeff.down });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Эндпоинт для вебхука от TMA Wallet (если требуется)
router.post('/wallet-webhook', walletService.handleWalletWebhook);

module.exports = router;
