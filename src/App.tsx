
import './App.css';
  import { backend } from "./declarations/icpAgent";

function App() {

const fetchBalance = async (user: string) => {
  console.log("FEATCH BALANCE")
  try {
    const balance:any = await backend.balanceOfDip721(user);
    console.log("Balance:", balance.toString());
  } catch (error) {
    console.error("Failed to fetch balance:", error);
  }
};
async function loadData() {
  try {
    const response = await backend.http_request({
      url: "https://localhost:3000/1"
    });
    console.log("Response: ", response);
  } catch (error) {
    console.error("Failed to load data:", error);
  }
}

// loadData();
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={()=> fetchBalance}>SEE BALANCE</button>
      </header>
    </div>
  );
}

export default App;
