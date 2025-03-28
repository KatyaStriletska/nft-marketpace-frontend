/* Сторінка підключення гаманця: Інтерфейс для підключення користувацького гаманця
Internet Computer (наприклад, Plug Wallet, Stoic Wallet). */

import React, { useState } from 'react';
import '../styles/connectWalletPage.css';

const ConnectWalletPage: React.FC = () => {
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [connecting, setConnecting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleConnectWallet = (walletType: string) => {
    setConnecting(true);
    setErrorMessage('');

    setTimeout(() => {
      setConnecting(false);

      if (walletType === 'metamask') {
        setConnectedWallet('MetaMask');
        alert('MetaMask connected (this is a simulation)');
      } else if (walletType === 'phantom') {
        setConnectedWallet('Phantom');
        alert('Phantom connected (this is a simulation)');
      } else if (walletType === 'internet-computer') {
        setConnectedWallet('Internet Computer Wallet');
        alert('Internet Computer Wallet connected (this is a simulation)');
      } else {
        setErrorMessage('Could not connect to the selected wallet.');
      }
    }, 1500); // Simulate delay
  };

  return (
    <div className="connect-wallet-page">
      <h1>Connect Your Wallet</h1>
      <p>To interact with the marketplace, please connect your crypto wallet.</p>

      <div className="wallet-options">
        <button onClick={() => handleConnectWallet('metamask')} disabled={connecting}>
          {connecting ? 'Connecting... ' : ''}Connect with MetaMask
        </button>
        <button onClick={() => handleConnectWallet('phantom')} disabled={connecting}>
          {connecting ? 'Connecting... ' : ''}Connect with Phantom
        </button>
        <button onClick={() => handleConnectWallet('internet-computer')} disabled={connecting}>
          {connecting ? 'Connecting... ' : ''}Connect with Internet Computer Wallet
        </button>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {connectedWallet && <p className="connected-message">Connected with: {connectedWallet}</p>}
    </div>
  );
};

export default ConnectWalletPage;
