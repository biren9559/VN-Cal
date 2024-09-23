import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  // State variables
  const [price, setPrice] = useState(0);
  const [selector, setSelector] = useState('1.00');
  const [customSelector, setCustomSelector] = useState(0);
  const [discount, setDiscount] = useState(20);

  // Convert the selector to a usable number
  const selectedQuantity = selector ? parseFloat(selector) : parseFloat(customSelector);

  // Calculate values
  const amount = price * selectedQuantity;
  const calculatedDiscount = (amount * discount) / 100;
  const netAmount = amount - calculatedDiscount;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-sm-6 col-12">
          <div className="App card p-4">
            <form>
              {/* Price and Discount inputs */}
              <div className="form-group row">
                <div className="col-6">
                  <label>Price</label>
                  <input
                    className="form-control"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                    placeholder="Enter price"
                  />
                </div>

                <div className="col-6">
                  <label>Discount %</label>
                  <input
                    className="form-control"
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                    placeholder="Enter discount"
                  />
                </div>
              </div>

              {/* Selector dropdown */}
              <div className="form-group mt-2 row">
              <div className="col-6">
                <label>PCS / Metter</label>
                <select
                  className="form-control"
                  value={selector}
                  onChange={(e) => setSelector(e.target.value)}
                >
                  <option value="1.00">1 Pcs</option>
                  <option value="1.20">1.20</option>
                  <option value="1.60">1.60</option>
                  <option value="1.80">1.80</option>
                  <option value="2.00">2.00</option>
                  <option value="2.25">2.25</option>
                  <option value="2.50">2.50</option>
                  <option value="">Manual</option>
                </select>
</div>
                 <div className="col-6">
                {selector === '' && (
                  <input
                    className="form-control mt-6"
                    type="number"
                    value={customSelector}
                    onChange={(e) => setCustomSelector(parseFloat(e.target.value) || 0)}
                    placeholder="Enter custom value"
                  />
                )}
                </div>
              </div>

              {/* Display calculated values */}
              <div className="output-group mt-4">
                <p><strong>Amount:</strong> {amount.toFixed(2)}</p>
                <p><strong>Discount:</strong> {calculatedDiscount.toFixed(2)}</p>
                <p><strong>Net Amount:</strong> {netAmount.toFixed(2)}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
