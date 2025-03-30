import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/nftListingsPage.css';
import { getActor } from '../declarations';

interface Nft {
  id: number;
  name: string;
  imageUrl: string;
  price: string;
}

const NftListingsPage: React.FC = () => {
  const [nfts, setNfts] = useState<Nft[]>([]);
  const [filteredNfts, setFilteredNfts] = useState<Nft[]>([]);
  const [sortOption, setSortOption] = useState<string>('price-low-to-high');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const actor = await getActor();
        const result = await actor.getAllNFTs();

        if (Array.isArray(result)) {
          const formatted = result.map((nft: any, index: number) => {
            const metadata = nft.metadata[0];
            const imageUrl = URL.createObjectURL(new Blob([nft.content]));

            return {
              id: index,
              name:
                metadata.key_val_data.find((item: any) => item[0] === 'name')?.[1]?.TextContent || 'Unknown',
              imageUrl,
              price: nft.price[0]?.toString() || '0 ICP',
            };
          });

          setNfts(formatted);
          setFilteredNfts(formatted);
        }
      } catch (error) {
        console.error('Error loading NFTs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  const sortNfts = (list: Nft[], option: string) => {
    const sorted = [...list];
    if (option === 'price-low-to-high') {
      sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (option === 'price-high-to-low') {
      sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (option === 'newest') {
      sorted.sort((a, b) => b.id - a.id);
    } else if (option === 'oldest') {
      sorted.sort((a, b) => a.id - b.id);
    }
    return sorted;
  };

  const handleSort = (value: string) => {
    setSortOption(value);
    const sorted = sortNfts(filteredNfts, value);
    setFilteredNfts(sorted);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = nfts.filter((nft) =>
      nft.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredNfts(sortNfts(filtered, sortOption));
  };

  return (
    <div className="nft-listings-page">
      <h1 className="text-4xl font-extrabold text-white text-center mt-6" style={{ textShadow: '0 0 10px #00e676' }}>
        All NFTs
      </h1>

      <div className="mt-6 ml-6" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <label htmlFor="sort" className="text-white text-xl">Sorting</label>
        <select
          id="sort"
          onChange={(e) => handleSort(e.target.value)}
          value={sortOption}
          style={{
            backgroundColor: '#ffffff',
            color: '#000000',
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            borderRadius: '6px',
            padding: '0.5rem 1rem',
          }}
        >
          <option value="price-low-to-high">Price: low to high</option>
          <option value="price-high-to-low">Price: high to low</option>
          <option value="newest">Recent</option>
          <option value="oldest">Older</option>
        </select>

        <input
          type="text"
          placeholder="Search NFTs..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            backgroundColor: '#ffffff',
            color: '#000000',
            border: 'none',
            outline: 'none',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            borderRadius: '6px',
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            minWidth: '200px',
          }}
        />
      </div>

      {loading ? (
        <p className="text-white mt-6 ml-6">Loading NFTs...</p>
      ) : (
        <div
          className="nft-list"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem',
            justifyItems: 'center',
            maxWidth: '1540px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {filteredNfts.map((nft) => (
            <div
              key={nft.id}
              className="nft-card"
              style={{
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
                color: 'black',
                width: '100%',
                maxWidth: '220px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                src={nft.imageUrl}
                alt={nft.name}
                style={{ width: '100%', borderRadius: '6px' }}
              />
              <h3 style={{ fontSize: '1rem', marginTop: '0.5rem' }}>{nft.name}</h3>
              <p style={{ margin: '0.3rem 0' }}>Price: {nft.price}</p>
              <Link
                to={`/nft/${nft.id}`}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NftListingsPage;
