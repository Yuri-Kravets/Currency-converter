
'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ExchangeRates {
  [currency: string]: number;
}

const CurrencyConverter: React.FC = () => {
  const [amountFrom, setAmountFrom] = useState<number | null>(0);
  const [currencyFrom, setCurrencyFrom] = useState<string>('UAH');

  const [amountTo, setAmountTo] = useState<number | null>(0);
  const [currencyTo, setCurrencyTo] = useState<string>('USD');

  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(
          'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
        );
        const rates: ExchangeRates = response.data.reduce(
          (acc: ExchangeRates, rate: { cc: string; rate: number }) => {
            acc[rate.cc] = rate.rate;
            return acc;
          },
          {}
        );
        setExchangeRates(rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, []);

  useEffect(() => {
    const rateFrom = exchangeRates[currencyFrom] || 1;
    const rateTo = exchangeRates[currencyTo] || 1;

    if (amountFrom !== null) {
      setAmountTo((amountFrom * rateFrom) / rateTo);
    }
  }, [amountFrom, currencyFrom, currencyTo, exchangeRates]);

  const handleAmountFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === '' ? null : Number(event.target.value);
    setAmountFrom(value);
    if (value !== null) {
      setAmountTo((value * exchangeRates[currencyFrom]) / exchangeRates[currencyTo]);
    }
  };

  const handleCurrencyFromChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newCurrencyFrom = event.target.value;
    setCurrencyFrom(newCurrencyFrom);

    if (amountFrom !== null) {
      setAmountTo((amountFrom * exchangeRates[newCurrencyFrom]) / exchangeRates[currencyTo]);
    }
  };

  const handleAmountToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === '' ? null : Number(event.target.value);
    setAmountTo(value);
    if (value !== null) {
      setAmountFrom((value * exchangeRates[currencyTo]) / exchangeRates[currencyFrom]);
    }
  };

  const handleCurrencyToChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newCurrencyTo = event.target.value;
    setCurrencyTo(newCurrencyTo);

    if (amountFrom !== null) {
      setAmountFrom((amountTo * exchangeRates[newCurrencyTo]) / exchangeRates[currencyFrom]);
    }
  };

  return (
    <>
      <h1 className='text-2xl font-bold mb-4 mt-4'>Конвертер Валют</h1>
      <div className='grid grid-cols-2'>
        <div className='flex flex-col'>
          <label className='font-bold'>
            Выберите валюту:
            <select
              className='ml-6'
              value={currencyFrom}
              onChange={handleCurrencyFromChange}
            >
              <option value="UAH">UAH</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="PLN">PLN</option>
              <option value="GBP">GBP</option>
            </select>
          </label>
          <label className='font-bold'>
            Введите количество:
            <input
              className='ml-4'
              type="number"
              value={amountFrom === null ? '' : amountFrom}
              onChange={handleAmountFromChange}
            />
          </label>
        </div>
        <div className='flex flex-col'>
          <label className='font-bold '>
            Выберите валюту:
            <select value={currencyTo} onChange={handleCurrencyToChange}>
              <option value="UAH">UAH</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="PLN">PLN</option>
              <option value="GBP">GBP</option>
            </select>
          </label>
          <label className='font-bold'>
            Резутьтат:
            <input
              className='ml-4'
              type="number"
              value={amountTo === null ? '' : amountTo}
              onChange={handleAmountToChange}
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default CurrencyConverter;

