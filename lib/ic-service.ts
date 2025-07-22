import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

// Define the interface for the backend canister
export interface ScanResult {
  score: number;
  summary: string;
  risks: string[];
}

export interface SusBotBackend {
  analyze_address: (address: string) => Promise<ScanResult>;
}

// Candid interface definition
const idlFactory = ({ IDL }: any) => {
  const ScanResult = IDL.Record({
    'score' : IDL.Nat8,
    'summary' : IDL.Text,
    'risks' : IDL.Vec(IDL.Text),
  });
  return IDL.Service({
    'analyze_address' : IDL.Func([IDL.Text], [ScanResult], []),
  });
};

// Configuration - UPDATE THIS WITH YOUR ACTUAL DEPLOYED CANISTER ID
const CANISTER_ID = process.env.NEXT_PUBLIC_SUSBOT_BACKEND_CANISTER_ID || 'iyj2d-giaaa-aaaai-atkxq-cai';
const HOST = process.env.NEXT_PUBLIC_IC_HOST || 'https://ic0.app';

// Create the agent and actor
let agent: HttpAgent;
let actor: SusBotBackend;

export const initializeAgent = async (): Promise<void> => {
  try {
    // Create HTTP agent
    agent = new HttpAgent({
      host: HOST,
    });

    // For local development, fetch root key (not needed for IC mainnet)
    if (HOST.includes('127.0.0.1') || HOST.includes('localhost')) {
      await agent.fetchRootKey().catch(err => {
        console.warn('Unable to fetch root key. Check to ensure that your local replica is running');
        console.error(err);
      });
    }

    // Create the actor
    actor = Actor.createActor<SusBotBackend>(idlFactory, {
      agent,
      canisterId: Principal.fromText(CANISTER_ID),
    });

    console.log('IC Agent initialized successfully for canister:', CANISTER_ID);
  } catch (error) {
    console.error('Failed to initialize IC agent:', error);
    throw error;
  }
};

// Service methods
export const susBot = {
  async analyzeAddress(address: string): Promise<ScanResult> {
    try {
      if (!actor) {
        await initializeAgent();
      }

      console.log('Calling analyze_address with:', address);
      const result = await actor.analyze_address(address);
      console.log('Backend response:', result);

      return result;
    } catch (error) {
      console.error('Error calling analyze_address:', error);
      throw new Error(`Failed to analyze address: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Health check method
  async healthCheck(): Promise<boolean> {
    try {
      if (!actor) {
        await initializeAgent();
      }
      
      // Try to call the backend with a test address
      await actor.analyze_address('0x0000000000000000000000000000000000000000');
      return true;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
};

// Auto-initialize on module load
if (typeof window !== 'undefined') {
  initializeAgent().catch(console.error);
} 