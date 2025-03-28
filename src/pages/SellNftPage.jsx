/*Сторінка продажу NFT: Форма для виставлення NFT на продаж за певну ціну. */

import React, { useState } from 'react';
import '../styles/sellNftPage.css';

function SellNftPage() {
  // Example list of NFTs owned by the user (later we will fetch this from the backend)
  const [ownedNFTs] = useState([
    { id: 7, name: 'My First NFT' },
    { id: 8, name: 'Another NFT' },
    { id: 9, name: 'Cool Digital Art' },
  ]);

  const [selectedNftId, setSelectedNftId] = useState('');
  const [price, setPrice] = useState('');

  const handleNftChange = (event) => {
    setSelectedNftId(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // In a real application, you would send this data to your backend to list the NFT for sale
    console.log('Listing NFT for sale with data:', { selectedNftId, price });
    // For now, let's just show a message
    alert('NFT listed for sale (this is a placeholder)');
  };

  return (
    <div className="sell-nft-page">
      <h1>Sell Your NFT</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nft">Select NFT to Sell:</label>
          <select id="nft" value={selectedNftId} onChange={handleNftChange} required>
            <option value="">-- Select an NFT --</option>
            {ownedNFTs.map((nft) => (
              <option key={nft.id} value={nft.id}>
                {nft.name} (ID: {nft.id})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price (in ETH):</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={handlePriceChange}
            min="0.001" // Example minimum price
            step="0.001"
            required
          />
        </div>
        <button type="submit">List NFT for Sale</button>
      </form>
    </div>
  );
}

export default SellNftPage;