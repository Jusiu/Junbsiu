/**
 * Agent authentication — mirrors Member Delegation docs:
 * https://docs.terminal3.io/developers/adk/get-started/member-delegation
 *
 * Agent key MUST be a separate claim from the tenant key.
 * Run:  export AGENT_KEY="0x..." && npm run agent:auth
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

const agentKey = process.env.AGENT_KEY!;
if (!agentKey) {
  console.error(
    "Set AGENT_KEY to a SECOND key from the claim page (do not reuse T3N_API_KEY).",
  );
  process.exit(1);
}

if (process.env.T3N_API_KEY && process.env.T3N_API_KEY === agentKey) {
  console.error(
    "Refusing to run: AGENT_KEY must not equal T3N_API_KEY (docs: never reuse tenant key for an agent).",
  );
  process.exit(1);
}

const wasmComponent = await loadWasmComponent();
const agentAddress = eth_get_address(agentKey);

const agentClient = new T3nClient({
  trustAnchor: await fetchTrustedManifest("testnet"),
  wasmComponent,
  handlers: {
    EthSign: metamask_sign(agentAddress, undefined, agentKey),
  },
});

await agentClient.handshake();
const agentDidResult = await agentClient.authenticate(
  createEthAuthInput(agentAddress),
);
const agentDid = agentDidResult.value;

console.log("Agent connected as:", agentDid);
console.log("Agent address:", agentAddress);
console.log(
  "Next: register public card via scripts/register-agent.sh (t3n CLI) — see Register a Public Agent docs.",
);
