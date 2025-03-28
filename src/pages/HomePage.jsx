/*Головна сторінка: Відображення популярних NFT, нових надходжень, категорій.*/ 

import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/homePage.css';

function HomePage() {
  // Example data (later we will get it from the backend)
  const popularNFTs = [
    { id: 1, name: 'Crypto Kitty #1', imageUrl: 'https://i.seadn.io/s/raw/files/f3564ef33373939b024fb791f21ec37b.png?auto=format&dpr=1&w=384', price: '0.05 ETH' },
    { id: 2, name: 'Weird Dog #2', imageUrl: 'https://i.seadn.io/s/raw/files/d33a69fe2f9c867d37a099d356af6045.png?auto=format&dpr=1&w=384', price: '0.1 ETH' },
    { id: 3, name: 'Abstract Flower #3', imageUrl: 'https://i.seadn.io/s/raw/files/a55f9d8aab226d601874bf7593649549.png?auto=format&dpr=1&w=384', price: '0.08 ETH' },
  ];

  const newArrivals = [
    { id: 4, name: 'New Art #4', imageUrl: 'https://i.seadn.io/s/raw/files/e4f8c7574bf861c8e5e7d387d618d72e.png?auto=format&dpr=1&w=384', price: '0.03 ETH' },
    { id: 5, name: 'Another Kitty #5', imageUrl: 'https://i.seadn.io/s/raw/files/02ac4d20d71afeb2d8f7c11e36d492fb.png?auto=format&dpr=1&w=384', price: '0.06 ETH' },
  ];

  const categories = ['Art', 'Collectibles', 'Music', 'Sports'];

  return (
    <div className="home-page">
      <section className="popular-nfts">
      <h2 class="text-4xl font-extrabold">Popular NFTs</h2>
        <div className="nft-list">
          {popularNFTs.map(nft => (
            <div key={nft.id} className="nft-card">
              <img src={nft.imageUrl} alt={nft.name} />
              <h3>{nft.name}</h3>
              <p>Price: {nft.price}</p>
              <Link to={`/nft/${nft.id}`}>View</Link> {/* Використовуємо Link для переходу на сторінку деталей */}
            </div>
          ))}
        </div>
      </section>

      <section className="new-arrivals">
      <h2 class="text-4xl font-extrabold ">New Arrivals</h2>
        <div className="nft-list">
          {newArrivals.map(nft => (
            <div key={nft.id} className="nft-card">
              <img src={nft.imageUrl} alt={nft.name} />
              <h3>{nft.name}</h3>
              <p>Price: {nft.price}</p>
              <Link to={`/nft/${nft.id}`}>View</Link> {/* Використовуємо Link для переходу на сторінку деталей */}
            </div>
          ))}
        </div>
      </section>

      <section className="categories">
        <h2>Categories</h2>
        <ul className="category-list">
          {categories.map(category => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default HomePage;