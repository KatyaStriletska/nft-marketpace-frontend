/* Сторінка профілю користувача: Перегляд NFT, що належать користувачеві,
історія покупок/продажів, можливість редагувати профіль. */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getActor } from '../declarations';
import type { MetadataPart } from '../declarations/dip721_nft_container.did.js';
import '../styles/userProfilePage.css';
//import { Principal } from '@dfinity/candid/lib/cjs/idl';
import { Principal } from "@dfinity/principal";
import { AuthClient } from '@dfinity/auth-client';
import { useAuth } from './AuthContext';

interface User {
  username: string;
  profilePicture: string;
}

interface OwnedNft {
  id: bigint;
  name: string;
  imageUrl: string;
  price: string;
}

interface HistoryItem {
  id: number;
  nftName: string;
  date: string;
  price: string;
}


const UserProfilePage: React.FC = () => {
  const [user] = useState<User>({
    username: 'User123',
    profilePicture:
      'https://i.seadn.io/gcs/files/a65afc41e66633b16cb5d4bedc90dac0.png?auto=format&dpr=1&w=384',
  });

  const [ownedNFTs, setOwnedNFTs] = useState<OwnedNft[]>([]);
  const [loadingNFTs, setLoadingNFTs] = useState(true);

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
  
  useEffect(() => {
    const loadNFTs = async () => {
      try {
        const actor = await getActor();
        if (principal === null) {
          console.error("Principal is null");
          return;
        }
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
            } else {
              console.error("Error fetching metadata:", metadata.Err);
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
  
  return (
    <div className="user-profile-page">
      <div className="profile-header">
        
        <button onClick={logout}>Log out</button>
      </div>
      {principal ? <h1>Your Principal: {principal.toString()}</h1> : <h1>Not authorised</h1>}


      <section className="owned-nfts">
        <h2>My NFTs</h2>
        {loadingNFTs ? (
          <p>Loading NFTs...</p>
        ) : (
          <div className="nft-list">
            {ownedNFTs.length === 0 ? (
              <p>You don't own any NFTs yet.</p>
            ) : (
              ownedNFTs.map((nft) => (
                <div key={nft.id} className="nft-card">
                  <img src={nft.imageUrl} alt={nft.name} />
                  <h3>{nft.name}</h3>
                  <button onClick={() => burnNft(nft.id)}>Burn</button>
                  <Link to={`/nft/${nft.id}`}>View</Link>
                </div>
              ))
            )}
          </div>
        )}
      </section>

      <section className="purchase-history">
        <h2>Purchase History</h2>
        {purchaseHistory.length > 0 ? (
          <ul>
            {purchaseHistory.map((purchase) => (
              <li key={purchase.id}>
                {purchase.nftName} - Purchased: {purchase.date}, Price: {purchase.price}
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't purchased anything yet.</p>
        )}
      </section>

      <section className="sale-history">
        <h2>Sale History</h2>
        {saleHistory.length > 0 ? (
          <ul>
            {saleHistory.map((sale) => (
              <li key={sale.id}>
                {sale.nftName} - Sold: {sale.date}, Price: {sale.price}
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't sold anything yet.</p>
        )}
      </section>
    </div>
  );
};

export default UserProfilePage;
