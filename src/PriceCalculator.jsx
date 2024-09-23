import React, { useState, useEffect } from 'react';
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Label } from "../components/ui/label"

const PriceCalculator = () => {
  const [price, setPrice] = useState('');
  const [selectorValue, setSelectorValue] = useState('1.20');
  const [customValue, setCustomValue] = useState('');
  const [discount, setDiscount] = useState('15');
  const [amount, setAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [netAmount, setNetAmount] = useState(0);

  const selectorOptions = ['1','1.20', '1.60', '1.80', '2.00', '2.25', '2.50', 'Custom'];

  useEffect(() => {
    const priceValue = parseFloat(price) || 0;
    const discountValue = parseFloat(discount) || 0;
    const selectedValue = selectorValue === 'Custom' ? parseFloat(customValue) || 0 : parseFloat(selectorValue);
    
    const calculatedAmount = priceValue * selectedValue;
    const calculatedDiscount = (calculatedAmount * discountValue) / 100;
    const calculatedNetAmount = calculatedAmount - calculatedDiscount;

    setAmount(calculatedAmount);
    setDiscountAmount(calculatedDiscount);
    setNetAmount(calculatedNetAmount);
  }, [price, selectorValue, customValue, discount]);

  const handleSelectorChange = (value) => {
    setSelectorValue(value);
    if (value !== 'Custom') {
      setCustomValue('');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Price Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1"
                placeholder="Enter price"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                type="number"
                id="discount"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="mt-1"
                placeholder="Enter discount"
              />
            </div>
          </div>
          <div>
            <Label>Selector</Label>
            <RadioGroup value={selectorValue} onValueChange={handleSelectorChange} className="mt-2">
              {selectorOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
            {selectorValue === 'Custom' && (
              <Input
                type="number"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                className="mt-2"
                placeholder="Enter custom value"
              />
            )}
          </div>
          <div className="mt-6 space-y-2">
            <p><strong>Amount:</strong> {amount.toFixed(2)}</p>
            <p><strong>Discount:</strong> {discountAmount.toFixed(2)}</p>
            <p><strong>Net Amount:</strong> {netAmount.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceCalculator;