// backend/services/rateCache.js
const axios = require('axios');
const xml2js = require('xml2js');
const cron = require('node-cron');

let cachedRate = null;
let lastUpdated = null;

/**
 * Функция для обновления кэша курса ЦБ РФ.
 * Запрашивает данные по URL, парсит XML и сохраняет курс USD в переменную cachedRate.
 */
async function updateRateCache() {
  try {
    // URL для получения курса ЦБ РФ (XML)
    const url = 'https://www.cbr.ru/scripts/XML_daily.asp';
    const response = await axios.get(url);
    const xmlData = response.data;

    // Парсинг XML в JSON
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xmlData);

    // Поиск элемента с валютой USD
    const valutes = result.ValCurs.Valute;
    const usdValute = valutes.find(valute => valute.CharCode[0] === 'USD');

    if (usdValute) {
      // Преобразование строки с курсом (замена запятой на точку)
      const rate = parseFloat(usdValute.Value[0].replace(',', '.'));
      cachedRate = rate;
      lastUpdated = new Date();
      console.log(`Rate cache updated: ${rate} at ${lastUpdated}`);
    } else {
      console.error('USD rate not found in XML');
    }
  } catch (error) {
    console.error("Error updating rate cache:", error.message);
  }
}

/**
 * Функция для получения кешированного курса.
 */
function getCachedRate() {
  return cachedRate;
}

/**
 * Запускаем задачу для обновления курса по расписанию.
 * Например, обновление курса каждые 30 минут.
 */
cron.schedule('*/30 * * * *', () => {
  console.log("Updating rate cache...");
  updateRateCache();
});

// При запуске сервера обновляем кэш сразу
updateRateCache();

module.exports = { getCachedRate, updateRateCache, lastUpdated };
