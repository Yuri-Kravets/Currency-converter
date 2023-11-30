'use client'
import axios from 'axios';

const NBU_API_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange';

interface ExchangeRate {
  cc: string;
  txt: string;
  rate: number;
  rateBuy: number;
  rateSale: number;
}

export const Header = async (): Promise<ExchangeRate[] | null> => {
  try {
    const response = await axios.get(`${NBU_API_URL}?json`);
    const filteredRates = response.data.filter((rate: ExchangeRate) =>
      ['USD', 'EUR', 'GBP', 'PLN','UAH'].includes(rate.cc)
    );
    return filteredRates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return null;
  }
};



