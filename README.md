# pxb-client-ts

## Install

```shell
npm install --save pxb-client
```

## Example

### Peg

```typescript
import { proximax } from "pxb-client/proximax";

// get unsigned tx
const unsignedTx = proximax.peg(...);

// sign

// broadcast

```

### Unpeg

```typescript
import { CosmosSDK, AccAddress, PrivKeySecp256k1 } from "cosmos-client";
import { auth, StdTx } from "cosmos-client/x/auth";
import { proximax_bridge } from "pxb-client/proximax-bridge";

const sdk = new CosmosSDK(hostURL, chainID);

// get account info
const privKeyBuffer = await sdk.generatePrivKeyFromMnemonic(mnemonic);
const privKey = new PrivKeySecp256k1(privKeyBuffer);
const fromAddress = AccAddress.fromPublicKey(
  privKey.getPubKey().toBuffer()
);
const account = await auth
  .accountsAddressGet(sdk, fromAddress)
  .then((res) => res.data);

// get unsigned tx
const unsignedStdTx = await proximax_bridge
  .unpeg(sdk, { ... })
  .then((res) => res.data);

// sign
const signedStdTx = auth.signStdTx(
  sdk,
  privKey,
  unsignedStdTx,
  account.account_number,
  account.sequence,
);

// broadcast
const result = await auth.txsPost(sdk, signedStdTx, "sync").then((res) => res.data);
```
