import React, { useState } from 'react';
import '../styles/mintNftPage.css';
import { Principal } from '@dfinity/principal';
import { getActor } from '../declarations'; // ✅ points to declarations/index.js
import type { MetadataPart } from "../declarations/dip721_nft_container.did";


const MintNftPage: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [asset, setAsset] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  // Hardcoded test principal (replace with Plug later or use your own dev ID)
  const recipient = Principal.fromText("565ec-3m77y-baush-ctl56-fov37-67wgb-ikzsx-h5xdb-7qo74-njlng-kae");


  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleAssetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAsset(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Minting NFT...');

    try {
      const actor = await getActor();

      let assetBytes = new Uint8Array([]);
      if (asset) {
        const buffer = await asset.arrayBuffer();
        assetBytes = new Uint8Array(buffer);
      }

      const metadata: MetadataPart[] = [
        {
          data: assetBytes,
          key_val_data: [
            ["name", { TextContent: name }],
            ["description", { TextContent: description }]
          ],
          purpose: { Rendered: null },
        },
      ];
      
      

      const result = await actor.mintDip721(recipient, metadata, assetBytes);


      if ('Ok' in result) {
        setStatus(`✅ Minted successfully! Token ID: ${result.Ok.token_id.toString()}`);
      } else {
        setStatus(`❌ Mint failed: ${JSON.stringify(result.Err)}`);
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Mint failed due to unexpected error.');
    }
  };

  return (
    <div className="mint-nft-page">
      <div className="flex justify-center mt-7">
        <h1 className="text-4xl font-extrabold">Mint New NFT</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-white p-8 rounded-md">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={handleDescriptionChange} />
        </div>

        <div className="form-group">
          <label htmlFor="asset">Upload File:</label>
          <input type="file" id="asset" onChange={handleAssetChange} />
        </div>

        <button
          type="submit"
          className="text-white bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Mint NFT
        </button>

        {status && <p className="mt-4 font-mono text-sm">{status}</p>}
      </form>
    </div>
  );
};

export default MintNftPage;
