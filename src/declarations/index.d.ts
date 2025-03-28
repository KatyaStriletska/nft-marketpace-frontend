import type {
  ActorSubclass,
  HttpAgentOptions,
  ActorConfig,
  Agent,
} from "@dfinity/agent";
import type { Principal } from "@dfinity/principal";
import type { IDL } from "@dfinity/candid";
import type { _SERVICE } from "./dip721_nft_container.did";

/**
 * IDL Factory generated from candid file.
 */
export declare const idlFactory: IDL.InterfaceFactory;

/**
 * Canister ID this actor will communicate with.
 */
export declare const canisterId: string;

/**
 * Options for creating a new actor.
 */
export declare interface CreateActorOptions {
  agent?: Agent;
  agentOptions?: HttpAgentOptions;
  actorOptions?: ActorConfig;
}

/**
 * Creates an actor for interacting with the DIP721 canister.
 * @param canisterId - The ID of the canister
 * @param options - Optional configuration for the actor/agent
 * @returns The actor subclass for DIP721 service
 */
export declare function createActor(
  canisterId: string | Principal,
  options?: CreateActorOptions
): Promise<ActorSubclass<_SERVICE>>;

/**
 * Convenience function to create the default DIP721 actor (connected to this canister).
 */
export declare function getActor(): Promise<ActorSubclass<_SERVICE>>;
