/**
 * Tenant Quickstart — mirrors
 * https://docs.terminal3.io/developers/adk/get-started/quickstart
 *
 * Run:  export T3N_API_KEY="0x..." && npm run quickstart
 */
import {
  T3nClient,
  setEnvironment,
  loadWasmComponent,
  fetchTrustedManifest,
  eth_get_address,
  metamask_sign,
  createEthAuthInput,
} from "@terminal3/t3n-sdk";

setEnvironment("testnet");

const T3N_API_KEY = process.env.T3N_API_KEY!;
if (!T3N_API_KEY) {
  console.error(
    "Set T3N_API_KEY from https://go.terminal3.io/adk-community (key is shown once).",
  );
  process.exit(1);
}

const wasmComponent = await loadWasmComponent();
const address = eth_get_address(T3N_API_KEY);

const t3n = new T3nClient({
  trustAnchor: await fetchTrustedManifest("testnet"),
  wasmComponent,
  handlers: {
    EthSign: metamask_sign(address, undefined, T3N_API_KEY),
  },
});

await t3n.handshake();
const did = await t3n.authenticate(createEthAuthInput(address));
const tenantDid = did.value;

console.log("Connected as:", tenantDid);
console.log("Address:", address);
console.log("Keep t3n + tenantDid in scope for later walkthrough steps (see docs).");
