import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/nftListingsPage.css';

interface Nft {
  id: number;
  name: string;
  imageUrl: string;
  price: string;
  category: string;
}

const NftListingsPage: React.FC = () => {
  const [sortOption, setSortOption] = useState<string>('price-low-to-high');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const originalNfts: Nft[] = [
    {
      id: 1,
      name: 'Death star',
      imageUrl: 'https://cdn.pixabay.com/photo/2025/02/12/05/02/futuristic-9400300_1280.jpg',
      price: '10 ICP',
      category: 'Art',
    },
    {
      id: 2,
      name: 'space',
      imageUrl: 'https://images.unsplash.com/photo-1615114814213-a245ffc79e9a?w=600&auto=format&fit=crop&q=60',
      price: '0.12 ICP',
      category: 'Collectibles',
    },
    {
      id: 3,
      name: 'Nebula',
      imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&auto=format&fit=crop&q=60',
      price: '0.05 ICP',
      category: 'Music',
    },
    {
      id: 4,
      name: 'Lonely',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1722178119251-d2a122401c24?w=600&auto=format&fit=crop&q=60',
      price: '0.09 ICP',
      category: 'Sports',
    },
    {
      id: 5,
      name: 'Invaders',
      imageUrl: 'https://images.unsplash.com/photo-1660786254519-e899d4e2e405?w=600&auto=format&fit=crop&q=60',
      price: '0.06 ICP',
      category: 'Art',
    },
    {
      id: 6,
      name: 'New era',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1682124752476-40db22034a58?w=600&auto=format&fit=crop&q=60',
      price: '0.15 ICP',
      category: 'Collectibles',
    },
  ];

  const [nfts, setNfts] = useState<Nft[]>(originalNfts);

  const sortNfts = (option: string, list: Nft[]) => {
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

  const handleSort = (sortBy: string) => {
    setSortOption(sortBy);
    const filtered = originalNfts.filter((nft) =>
      nft.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setNfts(sortNfts(sortBy, filtered));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = originalNfts.filter((nft) =>
      nft.name.toLowerCase().includes(value.toLowerCase())
    );
    setNfts(sortNfts(sortOption, filtered));
  };

  return (
    <div className="nft-listings-page">
      <h1
        className="text-4xl font-extrabold text-white text-center mt-6"
        style={{ textShadow: '0 0 10px #00e676' }}
      >
        All NFTs
      </h1>

      <div
  className="mt-6 ml-6"
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  }}
>
  {/* Label */}
  <label htmlFor="sort" className="text-white text-xl">
    Sorting
  </label>

  {/* Select (dropdown) */}
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

  {/* Input (search) */}
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



      <div className="nft-grid">
        {nfts.map((nft) => (
          <div key={nft.id} className="nft-item">
            <img src={nft.imageUrl} alt={nft.name} />
            <h3>{nft.name}</h3>
            <p>Price: {nft.price}</p>
            <p>Category: {nft.category}</p>
            <Link to={`/nft/${nft.id}`}>See details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NftListingsPage;
