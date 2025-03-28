/*Сторінка перегляду NFT: Список усіх доступних NFT з можливістю фільтрації та сортування. */

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Імпортуємо Link для роутингу
import '../styles/nftListingsPage.css';

function NftListingsPage() {
  // Example NFT data (later we will get it from the backend)
  const [nfts] = useState([
    { id: 1, name: 'Abstraction #101', imageUrl: 'https://i.seadn.io/s/raw/files/a55f9d8aab226d601874bf7593649549.png?auto=format&dpr=1&w=384', price: '0.07 ETH', category: 'Art' },
    { id: 2, name: 'Collectible Kitty #007', imageUrl: 'https://i.seadn.io/s/raw/files/f3564ef33373939b024fb791f21ec37b.png?auto=format&dpr=1&w=384', price: '0.12 ETH', category: 'Collectibles' },
    { id: 3, name: 'Musical Work #3', imageUrl: 'https://i.seadn.io/s/raw/files/e4f8c7574bf861c8e5e7d387d618d72e.png?auto=format&dpr=1&w=384', price: '0.05 ETH', category: 'Music' },
    { id: 4, name: 'Sports Card #22', imageUrl: 'https://i.seadn.io/s/raw/files/02ac4d20d71afeb2d8f7c11e36d492fb.png?auto=format&dpr=1&w=384', price: '0.09 ETH', category: 'Sports' },
    { id: 5, name: 'Another Abstraction #102', imageUrl: 'https://i.seadn.io/gcs/files/b9cc6a3368e7e6e243fc9433f3024b52.png?auto=format&dpr=1&w=384', price: '0.06 ETH', category: 'Art' },
    { id: 6, name: 'Rare Doggy #001', imageUrl: 'https://i.seadn.io/s/raw/files/d4829ee56945cdace7706bed49bdf6dc.png?auto=format&dpr=1&w=384', price: '0.15 ETH', category: 'Collectibles' },
  ]);

  // We will add filtering and sorting functionality later
  const handleFilter = (filter) => {
    console.log(`Filtering by: ${filter}`);
  };

  const handleSort = (sortBy) => {
    console.log(`Sorting by: ${sortBy}`);
  };

  return (
    <div className="nft-listings-page">
      <h1>All NFTs</h1>

      <div className="filters">
        <h2>Filters</h2>
        <button onClick={() => handleFilter('category')}>Category</button> {/* Temporary buttons */}
        <button onClick={() => handleFilter('price')}>Price</button>
        {/* Add other filtering elements here (dropdowns, sliders, etc.) */}
      </div>

      <div className="sort-options">
        <h2>Sorting</h2>
        <select onChange={(e) => handleSort(e.target.value)}>
          <option value="price-low-to-high">Price: low to high</option>
          <option value="price-high-to-low">Price: high to low</option>
          <option value="newest">Recent</option>
          <option value="oldest">Older</option>
        </select>
      </div>

      <div className="nft-grid">
        {nfts.map(nft => (
          <div key={nft.id} className="nft-item">
            <img src={nft.imageUrl} alt={nft.name} />
            <h3>{nft.name}</h3>
            <p>Price: {nft.price} ETH</p>
            <p>Category: {nft.category}</p>
            <Link to={`/nft/${nft.id}`}>See details</Link> {/* Використовуємо Link для переходу на сторінку деталей */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NftListingsPage;