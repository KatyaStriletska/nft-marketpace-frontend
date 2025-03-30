import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import NftListingsPage from './pages/NftListingsPage';
import NftDetailsPage from './pages/NftDetailsPage';
import UserProfilePage from './pages/UserProfilePage';
import MintNftPage from './pages/MintNftPage';
import SellNftPage from './pages/SellNftPage';
import BuyNftPage from './pages/BuyNftPage';
//import ConnectWalletPage from './pages/ConnectWalletPage';
import 'bootstrap/dist/css/bootstrap.min.css';


// Components
import NavBar from './components/NavBar';

import './App.css';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        {/* Optional: Switch between NavigationBar and NavBar */}
        {/* <NavigationBar /> */}
        <NavBar />
        <Routes>
          <Route path="/nfts" element={<NftListingsPage />} />
          <Route path="/nft/:id" element={<NftDetailsPage />} /> {/* :id is NFT identifier */}
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/mint" element={<MintNftPage />} />
          <Route path="/sell" element={<SellNftPage />} />
          <Route path="/buy/:id" element={<BuyNftPage />} /> {/* :id is NFT identifier */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
