import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/nftDetailsPage.css';
import { getActor } from '../declarations';

interface Nft {
  id: bigint;
  name: string;
  imageUrl: string;
  description?: string;
  owner: string;
  price?: string;
  transactionHistory: string[];
}

const NftDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [nft, setNft] = useState<Nft | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNftDetails = async (id: bigint) => {
    try {
      const actor = await getActor();
      const nftResult = await actor.getNftByIdDip721(id);

      if (nftResult.length === 0) {
        setError(`NFT з ID ${id} не знайдено`);
        setLoading(false);
        return;
      }

      const nft = nftResult[0];
      const blob = new Blob([new Uint8Array(nft.content)], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(blob);

      let name = `NFT #${id}`;
      let description = 'Опис недоступний';
      let transactionHistory: string[] = [];

      if ("Ok" in nft.metadata) {
        const part = (nft.metadata.Ok as { key_val_data: [string, any][] }[])[0];

        const nameEntry = part.key_val_data.find(([key]) => key === "name");
        if (nameEntry && "TextContent" in nameEntry[1]) {
          name = nameEntry[1].TextContent;
        }

        const descriptionEntry = part.key_val_data.find(([key]) => key === "description");
        if (descriptionEntry && "TextContent" in descriptionEntry[1]) {
          description = descriptionEntry[1].TextContent;
        }

        const historyEntry = part.key_val_data.find(([key]) => key === "history");
        if (historyEntry && "TextContent" in historyEntry[1]) {
          transactionHistory = historyEntry[1].TextContent.split(';');
        }
      }

      setNft({
        id,
        name,
        imageUrl,
        description,
        owner: nft.owner.toText().slice(0, 10) + '...',
        price: '-', 
        transactionHistory,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error load  NFT:', error);
      setError('Error to featch NFT.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchNftDetails(BigInt(id));
    } else {
      setError("NFT ID is missing.");
      setLoading(false);
    }
  }, [id]);

  if (loading) return <div>Loading NFT details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!nft) return <div>NFT not found.</div>;

  const buyNft = async () => {
    const actor = await getActor();
    if (id) {
      try {
        const result = await actor.buyNFT(BigInt(id));
        console.log("Transaction successful:", result);
      } catch (error) {
        console.error("Transaction failed:", error);
      }
    }
  };

  return (
    <div className="nft-details-page">
      <div className="nft-details-page-container">
        <h1 className="text-4xl font-extrabold text-white" style={{ textShadow: '0 0 10px #00e676' }}>
          {nft.name}
        </h1>
        <img src={nft.imageUrl} alt={nft.name} className="nft-image" />
        <p className="nft-description text-white">{nft.description}</p>

        <div className="nft-owner text-white">
          <strong>Owner:</strong> {nft.owner}
        </div>

        {nft.price && (
          <div className="nft-price text-white">
            <strong>Price:</strong> {nft.price}
          </div>
        )}

        <div className="nft-actions">
          <button onClick={buyNft}>Buy</button>
          <button onClick={() => alert('Sell action triggered')}>Sell</button>
        </div>

        {nft.transactionHistory.length > 0 && (
          <div className="nft-history">
            <h2 className="text-white">Transaction History</h2>
            <ul>
              {nft.transactionHistory.map((transaction, index) => (
                <li key={index} className="text-white">{transaction}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NftDetailsPage;
