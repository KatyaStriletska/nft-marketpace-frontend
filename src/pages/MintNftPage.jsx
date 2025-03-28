/* Сторінка мінту NFT: Інтерфейс для створення нових NFT (якщо це передбачено функціоналом вашого бекенду).*/

import React, { useState } from 'react';
import '../styles/mintNftPage.css';
import {backend} from '../backend'
// import { Principal } from "@dfinity/principal";

function MintNftPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [asset, setAsset] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAssetChange = (event) => {
    setAsset(event.target.files[0]);
  };
  // const [tokenId, setTokenId] = useState<number | null>(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Minting NFT with data:', { name, description, asset });
    // For now, let's just show a message
    alert('NFT minting initiated (this is a placeholder)');
  };

  return (
    <div className="mint-nft-page">
      <div className="flex justify-center mt-7">
        <h1 className="text-4xl font-extrabold">Mint New NFT</h1>
      </div>
      
      <form onSubmit={handleSubmit} class="max-w-sm mx-auto bg-white p-8 rounded-md">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="asset">Asset (Image, Audio, Video):</label>
          <input
            type="file"
            id="asset"
            onChange={handleAssetChange}
            required
          />
        </div>
        <button type="submit" class="text-white bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Mint NFT</button>
        {/* <h1>NFT Minting</h1>
        {tokenId !== null && <p>Minted NFT ID: {tokenId}</p>} */}
      </form>
    </div>
  );
}

export default MintNftPage;