import React, { useEffect, useState } from 'react';
import '../styles/mintNftPage.css';
import { Principal } from '@dfinity/principal';
import { AuthClient } from "@dfinity/auth-client";
import { getActor } from '../declarations';
import type { MetadataPart } from "../declarations/dip721_nft_container.did";

const MintNftPage: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [asset, setAsset] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [price, setPrice] = useState<bigint | null>(null);
  const [userPrincipal, setUserPrincipal] = useState<Principal | null>(null);
  const [isForSale, setIsForSale] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
      const identity = authClient.getIdentity();
      const principal = identity.getPrincipal().toString();
      localStorage.setItem("userPrincipal", principal);

      setUserPrincipal(identity.getPrincipal());
    }
  };

  const handleLogin = async () => {
    const authClient = await AuthClient.create();
    await authClient.login({
      identityProvider: "https://identity.ic0.app",
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        setUserPrincipal(identity.getPrincipal());
      },
      onError: (err) => console.error("Login failed:", err),
    });
  };
  const handleLogout = async () => {
    const authClient = await AuthClient.create();
    await authClient.logout();
    setUserPrincipal(null);
  };
  // Hardcoded test principal (replace with Plug later or use your own dev ID)
  // const recipient = Principal.fromText("w3ek4-dpcyk-w6bpo-ixbku-mr2zs-szjqo-kkxob-fz4se-y7brs-u72cj-rae");


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
  const handleCheckboxChange = () => {
    setIsForSale(!isForSale);
    if (!isForSale) setPrice(null); 
    console.log(price);
    console.log(isForSale);

  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      setPrice(BigInt(value));
    } else {
      setPrice(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(price);
    e.preventDefault();
    if (!userPrincipal) {
      setStatus("❌ Please log in first!");
      return;
    }
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
      const result = await actor.mintDip721(userPrincipal, metadata, assetBytes, price ?? BigInt(0));
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
    <div style={{ display: 'flex', flexDirection: "column", alignContent: "space-around", justifyContent: "space-evenly", alignItems: "center" }}>
      <div className="flex justify-center mt-7">
        <h1 className="text-4xl font-extrabold">Mint New NFT</h1>
      </div>
      <div className="mt-7">
        <h1 className="text-4xl font-extrabold">Mint New NFT</h1>
      </div>

      <div className="my-4">
        {userPrincipal ? (
          <div>
            <p>✅ Logged in as: {userPrincipal.toText()}</p>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <button className="btn btn-primary" onClick={handleLogin}>
            Login with Internet Identity
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-white p-8 rounded-md" style={{ padding: '40px', borderRadius: '19px' }}>
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
        <div className="form-check form-switch">
        <label className="form-check-label fw-bold" id="flexSwitchCheckDefault" htmlFor="isForSale">Put up for sale</label>
        <input
          className="form-check-input bg-gray-700 border-gray-600"
          type="checkbox"
          id="isForSale"
          checked={isForSale}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="form-group " style={{ display: isForSale ? 'block' : 'none' }}>
        <label htmlFor="price">Price:</label>
        <input

          type="number"
          id="price"
          value={price !== null ? price.toString() : ''}
          onChange={handlePriceChange}
        />
      </div>
        <button
          type="submit"
          // onClick={() => handleSubmit}
          className="max-w-sm mx-auto btn btn-secondary btn-lg" 
          style={{ backgroundColor: 'rgb(0 0 0 / 36%)', width: "26rem"}}
        >
          Mint NFT
        </button>
        {status && <p className="mt-4 font-mono text-sm">{status}</p>}
      </form>
  
      
    </div>
  );
};
export default MintNftPage;  