'use client'

import { useEffect, useState } from 'react';
import PageWrapper from "./components/PageWrapper";
import { Header } from "./components/Header";
import CurrencyConverter from "./components/Converter";

interface ExchangeRate {
  cc: string;
  txt: string;
  rate: number;
  rateBuy: number;
  rateSale: number;
}

const Home: React.FC = () => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      const rates = await Header();
      if (rates) {
        setExchangeRates(rates);
      }
    };

    fetchExchangeRates();
  }, []);

  return (
    <PageWrapper>
      <div>
        <h1 className="text-2xl font-bold mb-4">Курси валют НБУ</h1>
        <ul className='grid grid-cols-2'>
          {exchangeRates.map((rate) => (
            <li key={rate.cc} className='text-lg mb-2'>
              {`${rate.cc} (${rate.txt}): ${rate.rate}`}
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <CurrencyConverter/>
    </PageWrapper>
  // <PageWrapper>
  //   <div>
  //     <h1 className="text-2xl font-bold mb-4">Курсы валют НБУ</h1>
  //     <ul className='grid grid-cols-3'>
  //       {exchangeRates.map((rate) => (
  //         <li key={rate.cc} className='text-lg mb-2'>
  //           {`${rate.cc} (${rate.txt}): Продажа - ${rate.rateSale}, Покупка - ${rate.rateBuy}`}
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  //   <hr />
  // </PageWrapper>
  );
};

export default Home;
