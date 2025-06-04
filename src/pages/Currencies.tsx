
import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { CurrencyExchange } from '@/components/currencies/CurrencyExchange';
import { useCurrencyPairs, mockCurrencies } from '@/utils/stocksApi';
import { Button } from '@/components/ui/button';

const Currencies = () => {
  const currencies = useCurrencyPairs(mockCurrencies);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1000);
  
  // Find the exchange rate between selected currencies
  const getExchangeRate = () => {
    const directPair = currencies.find(
      c => c.fromCurrency === fromCurrency && c.toCurrency === toCurrency
    );
    
    if (directPair) {
      return directPair.rate;
    }
    
    // Fallback to USD as base if direct pair not found
    const fromToUSD = currencies.find(c => c.fromCurrency === fromCurrency && c.toCurrency === 'USD');
    const usdToTarget = currencies.find(c => c.fromCurrency === 'USD' && c.toCurrency === toCurrency);
    
    if (fromToUSD && usdToTarget) {
      return fromToUSD.rate * usdToTarget.rate;
    }
    
    return 1.0834; // Default EUR/USD rate as fallback
  };
  
  const convertedAmount = (amount * getExchangeRate()).toFixed(2);
  
  return (
    <PageLayout title="Currency Exchange">
      <div className="grid grid-cols-1 gap-6">
        <CurrencyExchange currencies={currencies} />
        
        <div className="bg-card rounded-lg p-6 shadow mt-6">
          <h2 className="text-xl font-semibold mb-4">Currency Converter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">From</label>
                <select 
                  className="w-full px-4 py-2 border rounded-md"
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                  <option value="CHF">CHF - Swiss Franc</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-md" 
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">To</label>
                <select 
                  className="w-full px-4 py-2 border rounded-md"
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                >
                  <option value="EUR">EUR - Euro</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                  <option value="CHF">CHF - Swiss Franc</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Converted Amount</label>
                <div className="w-full px-4 py-2 border rounded-md bg-gray-50">
                  {toCurrency === 'EUR' ? '€' : toCurrency === 'GBP' ? '£' : toCurrency === 'JPY' ? '¥' : '$'}
                  {new Intl.NumberFormat().format(Number(convertedAmount))}
                </div>
              </div>
              <Button className="w-full mt-2">Convert</Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Currencies;
