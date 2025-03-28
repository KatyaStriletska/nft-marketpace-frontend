/* Сторінка деталей NFT: Інформація про конкретний NFT (власник, опис, історія транзакцій), 
можливість купити, виставити на продаж або запропонувати обмін.*/

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/nftDetailsPage.css';

function NftDetailsPage() {
  const { id } = useParams(); // Get NFT ID from URL
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Example function to fetch NFT details by ID (later replace with real backend request)
  const fetchNftDetails = (nftId) => {
    setLoading(true);
    setTimeout(() => {
      const mockNftData = {
        1: { id: 1, name: 'Example NFT #1', imageUrl: 'https://i.seadn.io/gcs/files/b067720800eb8cdba4e59eb4dc62a69d.png?auto=format&dpr=1&w=384', description: 'This is a very valuable and unique NFT.', owner: '0xAbc...', price: '0.05 ETH', transactionHistory: ['Purchased on 2023-10-26', 'Transferred on 2024-01-15'] },
        2: { id: 2, name: 'Fantastic Art #2', imageUrl: 'https://i.seadn.io/gcs/files/39b5603386c411a1e2ef08b684fa2796.png?auto=format&dpr=1&w=384', description: 'An amazing piece of digital art.', owner: '0xDef...', price: '0.1 ETH', transactionHistory: ['Created on 2024-03-01'] },
        // Add more example NFTs as needed
      };

      const foundNft = mockNftData[nftId];
      if (foundNft) {
        setNft(foundNft);
      } else {
        setError('NFT not found');
      }
      setLoading(false);
    }, 1000); // Simulate loading delay
  };

  useEffect(() => {
    fetchNftDetails(id);
  }, [id]);

  if (loading) {
    return <div>Loading NFT details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!nft) {
    return <div>NFT not found.</div>;
  }

  return (
    <div className="nft-details-page">
      <h1>{nft.name}</h1>
      <img src={nft.imageUrl} alt={nft.name} className="nft-image" />
      <p className="nft-description">{nft.description}</p>
      <div className="nft-owner">
        <span>Owner:</span> {nft.owner}
      </div>
      {nft.price && (
        <div className="nft-price">
          <span>Price:</span> {nft.price}
        </div>
      )}
      <div className="nft-actions">
        <button>Buy</button>
        <button>Sell</button>
        <button>Trade</button>
      </div>
      <div className="nft-history">
        <h2>Transaction History</h2>
        <ul>
          {nft.transactionHistory.map((transaction, index) => (
            <li key={index}>{transaction}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NftDetailsPage;