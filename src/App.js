import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  // State variables
  const [price, setPrice] = useState(0);
  const [selector, setSelector] = useState('1.00');
  const [customSelector, setCustomSelector] = useState(0);
  const [discount, setDiscount] = useState(20);
  const [entries, setEntries] = useState([]); // Array to store each entry

  // Convert the selector to a usable number
  const selectedQuantity = selector ? parseFloat(selector) : parseFloat(customSelector) || 1;

  // Calculate values
  const amount = price * selectedQuantity;
  const calculatedDiscount = (amount * discount) / 100;
  const netAmount = amount - calculatedDiscount;

  // Handle adding entry to the list
  const handleAdd = () => {
    const newEntry = {
      pcsMtr: selector === '' ? customSelector : selector, // Store the selected Pcs/Mtr value
      amount,
      discount: calculatedDiscount,
      netAmount,
    };
    setEntries([...entries, newEntry]);
    setPrice(0);    
    setCustomSelector(0);    
  };

  // Handle clearing the list
  const handleClear = () => {

    setEntries([]);
  };

  // Handle deleting an entry from the list
  const handleDelete = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  // Handle Reset All
  const handleResetAll = () => {
    setPrice(0);
    setSelector('1.20');
    setCustomSelector(0);
    setDiscount(20);
    setEntries([]);
  };

  // Calculate totals for the bottom display
  const totalAmount = entries.reduce((sum, entry) => sum + entry.amount, 0).toFixed(2);
  const totalDiscount = entries.reduce((sum, entry) => sum + entry.discount, 0).toFixed(2);
  const totalNetAmount = entries.reduce((sum, entry) => sum + entry.netAmount, 0).toFixed(2);

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
                    min="0"
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
                    min="0"
                    max="100"
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                    placeholder="Enter discount percentage"
                  />
                </div>
              </div>

              {/* Selector dropdown */}
              <div className="form-group mt-2 row">
                <div className="col-6">
                  <label>PCS / Meter</label>
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
                  <input
                    className="form-control mt-4"
                    type="number"
                    disabled={selector !== ''}
                    min="0"
                    value={customSelector}
                    onChange={(e) => setCustomSelector(parseFloat(e.target.value) || 0)}
                    placeholder="Enter custom value"
                  />
                </div>
              </div>

              {/* Display calculated values */}
              <ul className="list-group mt-3">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Amount: {amount.toFixed(2)}</span>
                  <span>Discount: {calculatedDiscount.toFixed(2)}</span>
                  <span>Net: {netAmount.toFixed(2)}</span>
                </li>
              </ul>

              {/* Add, Clear, and Reset All buttons */}
              <div className="d-flex justify-content-between mt-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAdd}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleClear}
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleResetAll}
                >
                  Reset All
                </button>
              </div>
            </form>

            {/* Display list of entries */}
            <div className="mt-3">
              <h5>Entries</h5>
              {entries.length > 0 ? (
                <ul className="list-group">
                  {entries.map((entry, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <span>Pcs/Mtr: {entry.pcsMtr}</span>
                      <span>Amount: {entry.amount.toFixed(2)}</span>
                      <span>Discount: {entry.discount.toFixed(2)}</span>
                      <span>Net: {entry.netAmount.toFixed(2)}</span>
                      <button className="btn btn-sm btn-primary" onClick={() => handleDelete(index)}>
                        🗑️
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No entries yet</p>
              )}
            </div>

            {/* Totals sticky to the bottom */}
            <div className="card-footer bg-light mt-4">
              <div className="d-flex justify-content-between">
                <span><strong>Total Amount:</strong> {totalAmount}</span>
                <span><strong>Total Discount:</strong> {totalDiscount}</span>
                <span><strong>Total Net:</strong> {totalNetAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
