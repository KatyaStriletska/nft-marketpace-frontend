import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/homePage.css';
import { getActor } from '../declarations';

interface Nft {
  id: number;
  name: string;
  imageUrl: string;
  price: string;
}

const HomePage: React.FC = () => {
  const [loadingNFTs, setLoadingNFTs] = useState(true);
  const [nfts, setNfts] = useState<Nft[]>([]);
  const [nftsForSale, setNftsForSale] = useState<Nft[]>([]);

  const GETnfts = async () => {
    try {
      const actor = await getActor();
      const result = await actor.getAllNFTs(); 
      const availableNfts = await actor.getAvailableNFTs();
      console.log('Available NFTs:', availableNfts);

      if (Array.isArray(result)) {
        const nftData = result; 
        const formattedNFTs = nftData.map((nft: any, index: number) => {
          const metadata = nft.metadata[0]; 
          const imageUrl = URL.createObjectURL(new Blob([nft.content])); 

          return {
            id: index, 
            name: metadata.key_val_data.find((item: any) => item[0] === 'name')?.[1]?.TextContent || 'Unknown',
            imageUrl: imageUrl,
            price: nft.price[0]?.toString() || '0 ICP',
          };
        });

        setNfts(formattedNFTs);
      } else {
        console.error('Error fetching NFTs:');
      }
      if (Array.isArray(availableNfts)) {
        const formattedNFTs = availableNfts.map((nft: any, index: number) => {
          const metadata = nft.metadata[0]; 
          const imageUrl = URL.createObjectURL(new Blob([nft.content])); 

          return {
            id: index, 
            name: metadata.key_val_data.find((item: any) => item[0] === 'name')?.[1]?.TextContent || 'Unknown',
            imageUrl: imageUrl,
            price: nft.price[0]?.toString() || '0 ICP',
          };
        });

        setNftsForSale(formattedNFTs);
      } else {
        console.error('Error fetching NFTs:');
      }
    } catch (error) {
      console.error('Failed to fetch NFTs:', error);
    } finally {
      setLoadingNFTs(false);
    }
  };

  useEffect(() => {
    GETnfts();
  }, []);

  return (
    <div className="home-page">
      <section className="popular-nfts">
        <div className="nfts-header">
          <h2 className="text-4xl font-extrabold">Popular NFTs</h2>
        </div>
        <section className="owned-nfts">
          <h2>My NFTs</h2>
          {loadingNFTs ? (
            <p>Loading NFTs...</p>
          ) : (
            <div className="nft-list">
              {nfts.length === 0 ? (
                <p>No NFTs yet.</p>
              ) : (
                nfts.map((nft) => (
                  <div key={nft.id} className="nft-card">
                    <img src={nft.imageUrl} alt={nft.name} />
                    <h3>{nft.name}</h3>
                    <Link to={`/nft/${nft.id}`}>View</Link>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
        <section className="owned-nfts">
          <h2>NFT for Sale</h2>
          {loadingNFTs ? (
            <p>Loading NFTs...</p>
          ) : (
            <div className="nft-list">
              {nftsForSale.length === 0 ? (
                <p>No NFTs yet.</p>
              ) : (
                nftsForSale.map((nft) => (
                  <div key={nft.id} className="nft-card">
                    <img src={nft.imageUrl} alt={nft.name} />
                    <h3>{nft.name}</h3>
                    <p>Price: {nft.price}</p>
                    <Link to={`/nft/${nft.id}`}>View</Link>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </section>
    </div>
  );
};

export default HomePage;
