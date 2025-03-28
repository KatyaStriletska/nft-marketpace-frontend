/* Сторінка профілю користувача: Перегляд NFT, що належать користувачеві,
історія покупок/продажів, можливість редагувати профіль. */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/userProfilePage.css';

// Interfaces
interface User {
  username: string;
  profilePicture: string;
}

interface OwnedNft {
  id: number;
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
  // Example user data
  const [user] = useState<User>({
    username: 'User123',
    profilePicture: 'https://i.seadn.io/gcs/files/a65afc41e66633b16cb5d4bedc90dac0.png?auto=format&dpr=1&w=384',
  });

  // Example owned NFTs
  const [ownedNFTs] = useState<OwnedNft[]>([
    {
      id: 7,
      name: 'My First NFT',
      imageUrl: 'https://i.seadn.io/gcs/files/ea0f01776a6dec8fb3646f052324bdf9.png?auto=format&dpr=1&w=384',
      price: '0.02 ICP',
    },
    {
      id: 8,
      name: 'Another NFT',
      imageUrl: 'https://i.seadn.io/gae/bEtT4wFmyCnoYDnFhs_8R-5jiwiitokA3wHw7t9BvagFEOd68ibg2BCBZt9bggAdFodnzmQ5RsqXfadRjvbkQPG6aXufT0Uy7iCZHA?auto=format&dpr=1&w=384',
      price: '0.07 ICP',
    },
  ]);

  // Purchase and sale history
  const [purchaseHistory] = useState<HistoryItem[]>([
    { id: 101, nftName: 'Cool Picture #1', date: '2024-03-01', price: '0.05 ICP' },
    { id: 102, nftName: 'Music Track #5', date: '2024-02-15', price: '0.03 ICP' },
  ]);

  const [saleHistory] = useState<HistoryItem[]>([
    { id: 201, nftName: 'Old Kitty #3', date: '2024-03-10', price: '0.08 ICP' },
  ]);

  return (
    <div className="user-profile-page">
      <div className="profile-header">
        <img src={user.profilePicture} alt={user.username} className="profile-picture" />
        <h1>{user.username}</h1>
        <button>Edit Profile</button> {/* Add functionality later */}
      </div>

      <section className="owned-nfts">
        <h2>My NFTs</h2>
        <div className="nft-list">
          {ownedNFTs.map((nft) => (
            <div key={nft.id} className="nft-card">
              <img src={nft.imageUrl} alt={nft.name} />
              <h3>{nft.name}</h3>
              <p>Price: {nft.price}</p>
              <Link to={`/nft/${nft.id}`}>View</Link>
            </div>
          ))}
        </div>
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
