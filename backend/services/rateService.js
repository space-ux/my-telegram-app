// backend/services/rateService.js
require('dotenv').config();
const axios = require('axios');
const xml2js = require('xml2js');

async function getDollarRate() {
  try {
    const url = 'https://www.cbr.ru/scripts/XML_daily.asp';
    const response = await axios.get(url);
    const xml = response.data;

    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xml);

    const valutes = result.ValCurs.Valute;
    const usdValute = valutes.find(valute => valute.CharCode[0] === 'USD');

    if (usdValute) {
      const rate = parseFloat(usdValute.Value[0].replace(',', '.'));
      return rate;
    } else {
      throw new Error('Курс доллара не найден');
    }
  } catch (error) {
    console.error('Ошибка получения курса доллара:', error.message);
    throw error;
  }
}

module.exports = { getDollarRate };
