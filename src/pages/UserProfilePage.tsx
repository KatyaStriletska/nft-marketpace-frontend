import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getActor } from '../declarations';
import type { MetadataPart } from '../declarations/dip721_nft_container.did.js';
import '../styles/userProfilePage.css';
import { Principal } from "@dfinity/principal";
import { AuthClient } from '@dfinity/auth-client';
import { useAuth } from './AuthContext';

interface OwnedNft {
  id: bigint;
  name: string;
  imageUrl: string;
  price: string;
}

const UserProfilePage: React.FC = () => {
  const [ownedNFTs, setOwnedNFTs] = useState<OwnedNft[]>([]);
  const [loadingNFTs, setLoadingNFTs] = useState(true);
<<<<<<< HEAD

  const [purchaseHistory] = useState<HistoryItem[]>([
    { id: 101, nftName: 'Cool Picture #1', date: '2024-03-01', price: '0.05 ICP' },
    { id: 102, nftName: 'Music Track #5', date: '2024-02-15', price: '0.03 ICP' },
  ]);

  const [saleHistory] = useState<HistoryItem[]>([
    { id: 201, nftName: 'Old Kitty #3', date: '2024-03-10', price: '0.08 ICP' },
  ]);
  const { principal, logout } = useAuth()
  useEffect(() => {
    if (principal) {
      console.log("User is logged in with Principal:", principal.toString());
    } else {
      console.log("User doesn't have a Principal");
    }
  }, [principal]);
  const burnNft = async (nftId: bigint) => {
    try {
      const actor = await getActor();
      const result = await actor.deleteNFT(nftId);
      console.log('Burn result:', result);
  
      if ('Ok' in result) {
        setOwnedNFTs((prevNFTs) => prevNFTs.filter((nft) => nft.id !== nftId));
      } else {
        console.error('Burn failed:', result.Err);
      }
    } catch (error) {
      console.error('Failed to burn NFT:', error);
    }
  };
  
=======
  const [principal, setPrincipal] = useState<Principal | null>(null);

  useEffect(() => {
    const storedPrincipal = localStorage.getItem("userPrincipal");
    if (storedPrincipal) {
      setPrincipal(Principal.fromText(storedPrincipal));
    }
  }, []);

>>>>>>> bd745bdd7847a4750270537c9efa885d5ae62364
  useEffect(() => {
    const loadNFTs = async () => {
      try {
        const actor = await getActor();
        if (principal === null) {
          console.error("Principal is null");
          return;
        }
<<<<<<< HEAD
=======

>>>>>>> bd745bdd7847a4750270537c9efa885d5ae62364
        const tokenIds: bigint[] = Array.from(await actor.tokensOfOwnerDip721(principal));
        const fetchedNFTs: OwnedNft[] = await Promise.all(
          tokenIds.map(async (id) => {
            const metadata = await actor.getMetadataDip721(BigInt(id));
            const asset = await actor.getAssetDip721(BigInt(id));

            const blob = new Blob([new Uint8Array(asset)], { type: 'image/png' });
            const imageUrl = URL.createObjectURL(blob);

            let name = `NFT #${id}`;

            if ("Ok" in metadata) {
              const part = metadata.Ok[0];
              const nameEntry = part.key_val_data.find(([key]) => key === "name");

              if (nameEntry && "TextContent" in nameEntry[1]) {
                name = nameEntry[1].TextContent;
              }
            }

            return {
              id,
              name,
              imageUrl,
              price: '-', // Placeholder
            };
          })
        );

        setOwnedNFTs(fetchedNFTs);
      } catch (error) {
        console.error('Failed to fetch owned NFTs:', error);
      } finally {
        setLoadingNFTs(false);
      }
    };

    loadNFTs();
  }, [principal]);
<<<<<<< HEAD
  
  return (
    <div className="user-profile-page">
      <div className="profile-header">
        
        <button onClick={logout}>Log out</button>
=======

  const handleLogout = async () => {
    const authClient = await AuthClient.create();
    await authClient.logout();
    setPrincipal(null);
  };

  const burnNft = async (nftId: bigint) => {
    try {
      const actor = await getActor();
      const result = await actor.deleteNFT(nftId);
      console.log('Burn result:', result);
  
      if ('Ok' in result) {
        setOwnedNFTs((prevNFTs) => prevNFTs.filter((nft) => nft.id !== nftId));
      } else {
        console.error('Burn failed:', result.Err);
      }
    } catch (error) {
      console.error('Failed to burn NFT:', error);
    }
  };

  return (
    <div className="user-profile-page">
      <div className="profile-header">
        <button onClick={handleLogout}>Log out</button>
>>>>>>> bd745bdd7847a4750270537c9efa885d5ae62364
      </div>

      {principal ? (
        <p>Your Principal: {principal.toString()}</p>
      ) : (
        <p>Not authorised</p>
      )}

      <section className="owned-nfts">
        <h2 className="text-3xl font-extrabold text-white" style={{ textShadow: '0 0 10px #00e676' }}>My NFTs</h2>
        {loadingNFTs ? (
          <p>Loading NFTs...</p>
        ) : (
          <div
            className="nft-list"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '1.5rem',
              marginTop: '1.5rem',
              justifyItems: 'center',
              maxWidth: '1540px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {ownedNFTs.length === 0 ? (
              <p>You don't own any NFTs yet.</p>
            ) : (
              ownedNFTs.map((nft) => (
<<<<<<< HEAD
                <div key={nft.id} className="nft-card">
                  <img src={nft.imageUrl} alt={nft.name} />
                  <h3>{nft.name}</h3>
                  <button onClick={() => burnNft(nft.id)}>Burn</button>
                  <Link to={`/nft/${nft.id}`}>View</Link>
=======
                <div
                  key={nft.id.toString()}
                  className="nft-card"
                  style={{
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '10px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
                    color: 'black',
                    width: '100%',
                    maxWidth: '220px',
                  }}
                >
                  <img
                    src={nft.imageUrl}
                    alt={nft.name}
                    style={{ width: '100%', borderRadius: '6px' }}
                  />

                   <h3>{nft.name}</h3>
                   <button onClick={() => burnNft(nft.id)}>Burn</button>
                  <h3 style={{ color: 'black' }}>{nft.name}</h3>
                  
                  <Link
                    to={`/nft/${nft.id.toString()}`}
                    style={{
                      backgroundColor: 'rgb(0, 102, 204)',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      display: 'inline-block',
                      marginTop: '0.5rem',
                    }}
                  >
                    More
                  </Link>
>>>>>>> bd745bdd7847a4750270537c9efa885d5ae62364
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default UserProfilePage;
