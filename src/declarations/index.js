import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "./dip721_nft_container.did.js";
export { idlFactory } from "./dip721_nft_container.did.js";

export const canisterId = "l75es-sqaaa-aaaai-atgqa-cai";

/**
 * Create an actor with optional agent options.
 * @param {string | import("@dfinity/principal").Principal} canisterId
 * @param {object} options
 * @returns {Promise<import("@dfinity/agent").ActorSubclass>}
 */
export const createActor = async (canisterId, options = {}) => {
  const agent =
    options.agent ||
    new HttpAgent({
      host: "https://ic0.app", // Використовуємо IC Mainnet
      ...options.agentOptions,
    });

  if (options.agent && options.agentOptions) {
    console.warn(
      "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
    );
  }

  // ТІЛЬКИ В DEV-MODE МОЖНА ВИКЛИКАТИ fetchRootKey()
  if (process.env.DFX_NETWORK !== "ic" && process.env.NODE_ENV !== "production") {
    try {
      await agent.fetchRootKey();
    } catch (err) {
      console.warn("Unable to fetch root key. Is the local replica running?");
      console.error(err);
    }
  }

  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions,
  });
};

/**
 * Convenience method to quickly get an actor for the default canister.
 * @returns {Promise<import("@dfinity/agent").ActorSubclass>}
 */
export const getActor = () => createActor(canisterId);
