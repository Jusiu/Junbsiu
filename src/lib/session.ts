/**
 * Shared T3N session helpers — APIs from official Quickstart
 * and Member Delegation docs (@terminal3/t3n-sdk@5.2.0).
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

export type EnvName = "testnet" | "production";

export function resolveEnv(): EnvName {
  const raw = (process.env.T3N_ENV || "testnet").toLowerCase();
  if (raw === "production") return "production";
  if (raw === "sandbox") {
    // Community landing mentions sandbox; Quickstart docs use testnet.
    // Prefer testnet unless you know your claim targets sandbox.
    console.warn("T3N_ENV=sandbox requested; using setEnvironment/testnet trust path per Quickstart docs. Record the env you actually claimed against in your submission.");
  }
  return "testnet";
}

export async function connectWithKey(apiKey: string, label: string) {
  if (!apiKey) {
    throw new Error(
      `Missing ${label}. Claim a key at https://go.terminal3.io/adk-community (shown once) and export it in your shell.`,
    );
  }

  const env = resolveEnv();
  setEnvironment(env);

  const wasmComponent = await loadWasmComponent();
  const address = eth_get_address(apiKey);

  const client = new T3nClient({
    trustAnchor: await fetchTrustedManifest(env),
    wasmComponent,
    handlers: {
      EthSign: metamask_sign(address, undefined, apiKey),
    },
  });

  await client.handshake();
  const did = await client.authenticate(createEthAuthInput(address));
  const didValue = did.value;

  return { client, address, did: didValue, env };
}
