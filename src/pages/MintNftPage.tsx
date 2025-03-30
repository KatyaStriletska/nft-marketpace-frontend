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
  const [isForSale, setIsForSale] = useState(false);
  const [userPrincipal, setUserPrincipal] = useState<Principal | null>(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
      const identity = authClient.getIdentity();
      setUserPrincipal(identity.getPrincipal());
      localStorage.setItem("userPrincipal", identity.getPrincipal().toString());
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userPrincipal) {
      setStatus("❌ Please log in first!");
      return;
    }

    if (isForSale && (!price || price <= BigInt(0))) {
      setStatus("❌ Please enter a valid price to list the NFT for sale.");
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

      const result = await actor.mintDip721(
        userPrincipal,
        metadata,
        assetBytes,
        isForSale ? (price ?? BigInt(0)) : BigInt(0) // 💡 Якщо не продається — ціна BigInt(0)
      );

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
    <div style={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
      <div className="flex justify-center mt-7">
        <h1 className="text-4xl font-extrabold text-white" style={{ textShadow: '0 0 10px #00e676' }}>
          Mint New NFT
        </h1>
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
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="asset">Upload File:</label>
          <input type="file" id="asset" onChange={(e) => setAsset(e.target.files?.[0] || null)} />
        </div>

        <div className="form-check form-switch mt-3 mb-2">
          <label className="form-check-label fw-bold" htmlFor="isForSale">Put up for sale</label>
          <input
            className="form-check-input bg-gray-700 border-gray-600"
            type="checkbox"
            id="isForSale"
            checked={isForSale}
            onChange={() => setIsForSale(!isForSale)}
          />
        </div>

        {isForSale && (
          <div className="form-group">
            <label htmlFor="price">Price (ICP):</label>
            <input
              type="number"
              id="price"
              value={price !== null ? price.toString() : ''}
              onChange={(e) => setPrice(BigInt(e.target.value))}
              required={isForSale}
            />
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary btn-lg mt-3"
          style={{ width: "26rem" }}
        >
          Mint NFT
        </button>

        {status && <p className="mt-4 font-mono text-sm">{status}</p>}
      </form>
    </div>
  );
};

export default MintNftPage;
