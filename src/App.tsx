import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import NftListingsPage from './pages/NftListingsPage';
import NftDetailsPage from './pages/NftDetailsPage';
import UserProfilePage from './pages/UserProfilePage';
import MintNftPage from './pages/MintNftPage';
import SellNftPage from './pages/SellNftPage';
import BuyNftPage from './pages/BuyNftPage';
import TradeNftPage from './pages/TradeNftPage';
//import ConnectWalletPage from './pages/ConnectWalletPage';
import 'bootstrap/dist/css/bootstrap.min.css';


// Components
import NavBar from './components/NavBar';

import './App.css';
import './index.css';
import { AuthProvider } from './pages/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        {/* Optional: Switch between NavigationBar and NavBar */}
        {/* <NavigationBar /> */}
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nfts" element={<NftListingsPage />} />
          <Route path="/nft/:id" element={<NftDetailsPage />} /> {/* :id is NFT identifier */}
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/mint" element={<MintNftPage />} />
          <Route path="/sell" element={<SellNftPage />} />
          <Route path="/buy/:id" element={<BuyNftPage />} /> {/* :id is NFT identifier */}
          <Route path="/trade/:id" element={<TradeNftPage />} /> {/* :id is NFT identifier */}
         
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
};

export default App;
