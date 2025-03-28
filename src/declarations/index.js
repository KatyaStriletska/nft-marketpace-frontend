import { Actor, HttpAgent } from "@dfinity/agent";

// Imports and re-exports candid interface
import { idlFactory } from "./dip721_nft_container.did.js";
export { idlFactory } from "./dip721_nft_container.did.js";

/* CANISTER_ID is replaced by webpack based on node environment
 * Note: canister environment variable will be standardized as
 * process.env.CANISTER_ID_<CANISTER_NAME_UPPERCASE>
 * beginning in dfx 0.15.0
 */
export const canisterId = "avqkn-guaaa-aaaaa-qaaea-cai";
//   process.env.CANISTER_ID_DIP721_NFT_CONTAINER;
console.log(canisterId)
export const createActor = async (canisterId, options = {}) => {
    const agent =
      options.agent ||
      (await HttpAgent.create({
        ...options.agentOptions,
      }));
  
    if (options.agent && options.agentOptions) {
      console.warn(
        "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
      );
    }

  // Fetch root key for certificate validation during development
  console.log(process.env.DFX_NETWORK)
  if ("local" !== "ic") {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
      console.error(err);
    });
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions,
  });
};

export const dip721_nft_container = canisterId ? createActor(canisterId) : undefined;
