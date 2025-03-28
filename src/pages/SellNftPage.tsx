/* Сторінка продажу NFT: Форма для виставлення NFT на продаж за певну ціну. */

import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../styles/sellNftPage.css';

interface OwnedNft {
  id: number;
  name: string;
}

const SellNftPage: React.FC = () => {
  // Example NFT list (will be fetched from backend later)
  const [ownedNFTs] = useState<OwnedNft[]>([
    { id: 7, name: 'My First NFT' },
    { id: 8, name: 'Another NFT' },
    { id: 9, name: 'Cool Digital Art' },
  ]);

  const [selectedNftId, setSelectedNftId] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const handleNftChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedNftId(event.target.value);
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Listing NFT for sale with data:', { selectedNftId, price });
    alert('NFT listed for sale (this is a placeholder)');
  };

  return (
    <div className="sell-nft-page">
      <h1>Sell Your NFT</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nft">Select NFT to Sell:</label>
          <select
            id="nft"
            value={selectedNftId}
            onChange={handleNftChange}
            required
          >
            <option value="">-- Select an NFT --</option>
            {ownedNFTs.map((nft) => (
              <option key={nft.id} value={nft.id.toString()}>
                {nft.name} (ID: {nft.id})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (in ICP):</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={handlePriceChange}
            min="0.001"
            step="0.001"
            required
          />
        </div>

        <button type="submit">List NFT for Sale</button>
      </form>
    </div>
  );
};

export default SellNftPage;
