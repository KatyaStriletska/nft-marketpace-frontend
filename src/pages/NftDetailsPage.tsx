import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/nftDetailsPage.css';
import { getActor } from '../declarations';
import { Principal } from '@dfinity/principal';
import { MetadataDesc } from '../declarations/dip721_nft_container.did';

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
  const { id } = useParams<{ id: string }>(); // get ID from URL
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
      console.log(nft);

      // Створюємо URL для зображення на основі content
      const blob = new Blob([new Uint8Array(nft.content)], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(blob);

      let name = `NFT #${id}`;
      let description = 'Опис недоступний';
      let transactionHistory: string[] = [];

      if ("Ok" in nft.metadata) {
        const part = (nft.metadata.Ok as { key_val_data: [string, any][] }[])[0];
        
        // Отримання імені
        const nameEntry = part.key_val_data.find(([key]) => key === "name");
        if (nameEntry && "TextContent" in nameEntry[1]) {
          name = nameEntry[1].TextContent;
        }

        // Отримання опису
        const descriptionEntry = part.key_val_data.find(([key]) => key === "description");
        if (descriptionEntry && "TextContent" in descriptionEntry[1]) {
          description = descriptionEntry[1].TextContent;
        }

        // Отримання історії транзакцій
        const historyEntry = part.key_val_data.find(([key]) => key === "history");
        if (historyEntry && "TextContent" in historyEntry[1]) {
          transactionHistory = historyEntry[1].TextContent.split(';'); // Припустимо, що транзакції розділені крапкою з комою
        }
      }
      //  else {
      //   console.error("Помилка отримання метаданих:", nft.metadata);
      // }

      // Встановлення стану NFT
      setNft({
        id,
        name,
        imageUrl,
        description,
        owner: nft.owner.toText().slice(0, 10) + '...', // Вивід частини ідентифікатора власника
        price: '-', // Поки що ціна не передається в метаданих
        transactionHistory,
      });
      setLoading(false);
    } catch (error) {
      console.error('Помилка завантаження NFT:', error);
      setError('Не вдалося завантажити дані NFT.');
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

  if (loading) {
    return <div>Loading NFT details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!nft) {
    return <div>NFT not found.</div>;
  }
  const buyNft = async () =>{
    console.log("buyNft");
    const actor = await getActor();
    const res = await actor.buyNFT(nft.id);
  }
  return (
    <div className="nft-details-page">
      <div className='nft-details-page-container'>
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
          <button onClick={() => alert('Trade action triggered')}>Trade</button>
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
