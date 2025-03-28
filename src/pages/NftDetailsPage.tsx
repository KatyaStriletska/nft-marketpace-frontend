/* Сторінка деталей NFT: Інформація про конкретний NFT (власник, опис, історія транзакцій),
можливість купити, виставити на продаж або запропонувати обмін. */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/nftDetailsPage.css';

interface Nft {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  owner: string;
  price?: string;
  transactionHistory: string[];
}

const NftDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // get ID from URL
  const [nft, setNft] = useState<Nft | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate fetching NFT from backend
  const fetchNftDetails = (nftId: string | undefined) => {
    if (!nftId) {
      setError("NFT ID is missing.");
      setLoading(false);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const mockNftData: Record<number, Nft> = {
        1: {
          id: 1,
          name: 'Example NFT #1',
          imageUrl: 'https://i.seadn.io/gcs/files/b067720800eb8cdba4e59eb4dc62a69d.png?auto=format&dpr=1&w=384',
          description: 'This is a very valuable and unique NFT.',
          owner: '0xAbc...',
          price: '0.05 ICP',
          transactionHistory: ['Purchased on 2023-10-26', 'Transferred on 2024-01-15'],
        },
        2: {
          id: 2,
          name: 'Fantastic Art #2',
          imageUrl: 'https://i.seadn.io/gcs/files/39b5603386c411a1e2ef08b684fa2796.png?auto=format&dpr=1&w=384',
          description: 'An amazing piece of digital art.',
          owner: '0xDef...',
          price: '0.1 ICP',
          transactionHistory: ['Created on 2024-03-01'],
        },
      };

      const numericId = parseInt(nftId);
      const foundNft = mockNftData[numericId];

      if (foundNft) {
        setNft(foundNft);
      } else {
        setError('NFT not found');
      }

      setLoading(false);
    }, 1000);
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
        <strong>Owner:</strong> {nft.owner}
      </div>

      {nft.price && (
        <div className="nft-price">
          <strong>Price:</strong> {nft.price}
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
};

export default NftDetailsPage;
