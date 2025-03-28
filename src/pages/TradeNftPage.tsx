/* Сторінка трейду NFT: Інтерфейс для пропонування обміну NFT. */

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/tradeNftPage.css';

interface Nft {
  id: number;
  name: string;
  imageUrl?: string;
  price?: string;
}

const TradeNftPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ID of the target NFT
  const [targetNft, setTargetNft] = useState<Nft | null>(null);
  const [ownedNFTs, setOwnedNFTs] = useState<Nft[]>([]);
  const [selectedNFTsToOffer, setSelectedNFTsToOffer] = useState<string[]>([]);
  const [loadingTargetNft, setLoadingTargetNft] = useState<boolean>(true);
  const [errorTargetNft, setErrorTargetNft] = useState<string | null>(null);

  const fetchNftDetails = (nftId: string | undefined) => {
    setLoadingTargetNft(true);
    setTimeout(() => {
      const mockNftData: Record<number, Nft> = {
        1: {
          id: 1,
          name: 'Example NFT #1',
          imageUrl:
            'https://i.seadn.io/gae/SctdzyD9QlToQWxxS76tnACs79fpOCT8T7QiKov8mIwhMKcx43tPLnVd_VwynF8f7Rn_EcHyg4t4y5IIAx3FKAqX?auto=format&dpr=1&w=384',
          price: '0.05 ICP',
        },
        2: {
          id: 2,
          name: 'Fantastic Art #2',
          imageUrl:
            'https://i.seadn.io/s/raw/files/96cdbac880ebad809af99fcf62d0c635.png?auto=format&dpr=1&w=384',
          price: '0.1 ICP',
        },
      };

      const numericId = parseInt(nftId || '');
      const foundNft = mockNftData[numericId];

      if (foundNft) {
        setTargetNft(foundNft);
      } else {
        setErrorTargetNft('NFT not found');
      }

      setLoadingTargetNft(false);
    }, 500);
  };

  useEffect(() => {
    setTimeout(() => {
      setOwnedNFTs([
        { id: 7, name: 'My First NFT' },
        { id: 8, name: 'Another NFT' },
        { id: 9, name: 'Cool Digital Art' },
      ]);
    }, 300);
  }, []);

  useEffect(() => {
    fetchNftDetails(id);
  }, [id]);

  const handleOfferNftChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedNFTsToOffer(selectedOptions);
  };

  const handleInitiateTrade = () => {
    if (targetNft && selectedNFTsToOffer.length > 0) {
      console.log('Initiating trade offer:', {
        targetNftId: targetNft.id,
        offeredNftIds: selectedNFTsToOffer,
      });
      alert(
        `Trade offer initiated for ${targetNft.name} with your selected NFTs! (This is a placeholder)`
      );
    } else {
      alert('Please select at least one NFT to offer for trade.');
    }
  };

  if (loadingTargetNft) {
    return <div>Loading NFT details for trade...</div>;
  }

  if (errorTargetNft) {
    return <div>Error: {errorTargetNft}</div>;
  }

  if (!targetNft) {
    return <div>NFT not found for trade.</div>;
  }

  return (
    <div className="trade-nft-page">
      <h1>Trade for {targetNft.name}</h1>
      <div className="target-nft-details">
        {targetNft.imageUrl && (
          <img
            src={targetNft.imageUrl}
            alt={targetNft.name}
            className="nft-image"
          />
        )}
        <h2>{targetNft.name}</h2>
        {targetNft.price && <p>Price: {targetNft.price}</p>}
      </div>

      <div className="offer-section">
        <h2>Your NFTs to Offer</h2>
        {ownedNFTs.length > 0 ? (
          <select
            multiple
            value={selectedNFTsToOffer}
            onChange={handleOfferNftChange}
            className="owned-nft-select"
          >
            {ownedNFTs.map((nft) => (
              <option key={nft.id} value={nft.id.toString()}>
                {nft.name} (ID: {nft.id})
              </option>
            ))}
          </select>
        ) : (
          <p>You don't have any NFTs to offer yet.</p>
        )}
        <button onClick={handleInitiateTrade} className="trade-button">
          Initiate Trade Offer
        </button>
      </div>
    </div>
  );
};

export default TradeNftPage;
