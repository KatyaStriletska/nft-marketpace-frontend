import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory, canisterId } from "./index";


const initAgent = async () => {
  const agent = await HttpAgent.create({
    host: "http://localhost:4943", // або URL бекенду
  });

  // У development mode потрібно дозволити небезпечне підключення
  await agent.fetchRootKey();

  const backend = Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });

  return backend;
};

export const backend = await initAgent();
