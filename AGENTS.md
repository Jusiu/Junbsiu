# Building with Terminal 3 ADK

Follow this order. Do not jump to contract code before authenticated connection works.

## Confirm basics
1. Claim API key + credits: https://go.terminal3.io/adk-community (shown once).
2. Agents need a **separate** key + credits from the same claim page — never reuse tenant `T3N_API_KEY`.
3. Prefer plain Node/`tsx` over bundlers for first connect (WASM rough edges).

## Scaffold
```bash
npm init -y
npm pkg set type=module
npm install @terminal3/t3n-sdk@5.2.0 tsx
export T3N_API_KEY="..."
```

## Connect first (Quickstart)
Use `setEnvironment("testnet")`, `loadWasmComponent()`, `fetchTrustedManifest("testnet")`, `T3nClient`, `handshake()`, `authenticate(createEthAuthInput(address))`. Always read DID from session.

## Contract code is a sibling Rust crate
Clone `https://github.com/Terminal-3/z-tenant-flight.git` as a sibling — do not nest inside the Node app.

## Known pitfalls
- Missing `"type": "module"` → top-level await fails
- Missing `trustAnchor` → T3nClient throws
- Hardcoded DID → tenant not found
- Agent key reuse → InsufficientCreditError
- Outbound HTTP without member-delegation grant → host/http.egress_denied
- Paste code at shell instead of into a file → bash syntax errors; use `<< 'EOF'`

## References
- Quickstart: https://docs.terminal3.io/developers/adk/get-started/quickstart
- Register public agent: https://docs.terminal3.io/developers/agents/register-agent
- Member Delegation: https://docs.terminal3.io/developers/adk/get-started/member-delegation
- Full skill file: https://docs.terminal3.io/developers/adk/support/ai-coding-assistants
- Common errors: https://docs.terminal3.io/developers/adk/tips/common-errors
