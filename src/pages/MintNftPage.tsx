/* Сторінка мінту NFT: Інтерфейс для створення нових NFT (якщо це передбачено функціоналом вашого бекенду). */

import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../styles/mintNftPage.css';
//import { backend } from '../declarations/backend'; // Make sure this is typed properly

// import { Principal } from "@dfinity/principal";

const MintNftPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [asset, setAsset] = useState<File | null>(null);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleAssetChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setAsset(file || null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real application, send data to your backend
    console.log('Minting NFT with data:', { name, description, asset });
    alert('NFT minting initiated (this is a placeholder)');
  };

  return (
    <div className="mint-nft-page">
      <div className="flex justify-center mt-7">
        <h1 className="text-4xl font-extrabold">Mint New NFT</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-white p-8 rounded-md">
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
            accept="image/*,audio/*,video/*"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Mint NFT
        </button>
      </form>
    </div>
  );
};

export default MintNftPage;
