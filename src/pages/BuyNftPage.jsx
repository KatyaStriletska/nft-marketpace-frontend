/* Сторінка купівлі NFT: Підтвердження покупки NFT.*/

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/buyNftPage.css';

function BuyNftPage() {
  const { id } = useParams(); // Get NFT ID from URL
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Example function to fetch NFT details by ID (later replace with real backend request)
  const fetchNftDetails = (nftId) => {
    setLoading(true);
    setTimeout(() => {
      const mockNftData = {
        1: { id: 1, name: 'Example NFT #1', imageUrl: 'https://i.seadn.io/gcs/files/190eaea1412f964a4db01360624011f7.png?auto=format&dpr=1&w=384', price: '0.05 ETH' },
        2: { id: 2, name: 'Fantastic Art #2', imageUrl: 'https://i.seadn.io/gcs/files/9138c985bf1aefaca6964b77652998bf.png?auto=format&dpr=1&w=384', price: '0.1 ETH' },
        // Add more example NFTs as needed
      };

      const foundNft = mockNftData[nftId];
      if (foundNft) {
        setNft(foundNft);
      } else {
        setError('NFT not found');
      }
      setLoading(false);
    }, 500); // Simulate loading delay
  };

  useEffect(() => {
    fetchNftDetails(id);
  }, [id]);

  const handleBuy = () => {
    if (nft) {
      // In a real application, you would initiate the purchase transaction with your backend
      console.log('Initiating purchase for NFT:', nft);
      alert(`Successfully purchased ${nft.name} for ${nft.price}! (This is a placeholder)`);
      // You might want to redirect the user to their profile or a confirmation page
    }
  };

  if (loading) {
    return <div>Loading NFT details for purchase...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!nft) {
    return <div>NFT not found for purchase.</div>;
  }

  return (
    <div className="buy-nft-page">
      <h1>Confirm Purchase</h1>
      <div className="nft-details">
        {nft.imageUrl && <img src={nft.imageUrl} alt={nft.name} className="nft-image" />}
        <h2>{nft.name}</h2>
        <p>Price: {nft.price}</p>
        <p>Are you sure you want to purchase this NFT?</p>
        <button onClick={handleBuy} className="buy-button">Confirm Buy</button>
        {/* You might want to add a cancel button here */}
      </div>
    </div>
  );
}

export default BuyNftPage;