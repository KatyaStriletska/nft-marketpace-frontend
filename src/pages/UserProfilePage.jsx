/*Сторінка профілю користувача: Перегляд NFT, що належать користувачеві,
 історія покупок/продажів, можливість редагувати профіль. */
 
 import React, { useState } from 'react';
 import { Link } from 'react-router-dom'; // Import Link for routing
 import '../styles/userProfilePage.css';
 
 function UserProfilePage() {
   // Example user data (later we will get it from the backend)
   const [user] = useState({
     username: 'User123',
     profilePicture: 'https://i.seadn.io/gcs/files/a65afc41e66633b16cb5d4bedc90dac0.png?auto=format&dpr=1&w=384',
   });
 
   // Example data for NFTs owned by the user
   const [ownedNFTs] = useState([
     { id: 7, name: 'My First NFT', imageUrl: 'https://i.seadn.io/s/raw/files/52450f13bc7f439e7dd9ca516068f57e.png?auto=format&dpr=1&w=384', price: '0.02 ETH' },
     { id: 8, name: 'Another NFT', imageUrl: 'https://i.seadn.io/gae/nr2PQytCsAti--2u3lWkznJAo1QqUP3wpGkadICKeH4Gly8LKBttsnndmRdywsS_jNlKoRAZ9bMi7-aIv_UKOB3O02lSITJf0LclrKg?auto=format&dpr=1&w=384', price: '0.07 ETH' },
   ]);
 
   // Example purchase history
   const [purchaseHistory] = useState([
     { id: 101, nftName: 'Cool Picture #1', date: '2024-03-01', price: '0.05 ETH' },
     { id: 102, nftName: 'Music Track #5', date: '2024-02-15', price: '0.03 ETH' },
   ]);
 
   // Example sale history
   const [saleHistory] = useState([
     { id: 201, nftName: 'Old Kitty #3', date: '2024-03-10', price: '0.08 ETH' },
   ]);
 
   return (
     <div className="user-profile-page">
       <div className="profile-header">
         <img src={user.profilePicture} alt={user.username} className="profile-picture" />
         <h1>{user.username}</h1>
         <button>Edit Profile</button> {/* We will add functionality later */}
       </div>
 
       <section className="owned-nfts">
         <h2>My NFTs</h2>
         <div className="nft-list">
           {ownedNFTs.map(nft => (
             <div key={nft.id} className="nft-card">
               <img src={nft.imageUrl} alt={nft.name} />
               <h3>{nft.name}</h3>
               <p>Price: {nft.price}</p>
               <Link to={`/nft/${nft.id}`}>View</Link> {/* Link to the NFT details page */}
             </div>
           ))}
         </div>
       </section>
 
       <section className="purchase-history">
         <h2>Purchase History</h2>
         {purchaseHistory.length > 0 ? (
           <ul>
             {purchaseHistory.map(purchase => (
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
             {saleHistory.map(sale => (
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
 }
 
 export default UserProfilePage;