# pxb-client-ts

## Install

```shell
npm install --save pxb-client
```

## Example

### Peg

See [tsjs-xpx-chain-sdk](https://github.com/proximax-storage/tsjs-xpx-chain-sdk) for details.

```typescript
import { Account, NetworkType } from "tsjs-xpx-chain-sdk";
import { proximax } from "pxb-client/proximax";

const sender = Account.createFromPrivateKey(
    "",
    NetworkType.TEST_NET);

// get unsigned tx
const unsignedTx = proximax.peg(...);

// sign
const signedTx = account.sign(unsignedTx, ...);

// broadcast
const http = new TransactionHttp("");
const res = await http.announce(signedTx).toPromise();
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
  .unpegPost(sdk, { ... })
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
