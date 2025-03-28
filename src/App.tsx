import './App.css';
import { backend } from "./declarations/icpAgent";
import { Principal } from "@dfinity/principal";

function App() {

  const fetchBalance = async (user: string) => {
    console.log("FETCH BALANCE");
    try {
      const principal = Principal.fromText(user);
      const balance: any = await backend.balanceOfDip721(principal);
      console.log("Balance:", balance.toString());
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

  const handleSeeBalanceClick = () => {
    const testPrincipal = "565ec-3m77y-baush-ctl56-fov37-67wgb-ikzsx-h5xdb-7qo74-njlng-kae";
    fetchBalance(testPrincipal);
  };
  

  

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleSeeBalanceClick}>SEE BALANCE</button>
      </header>
    </div>
  );
}

export default App;
