import { Account, NetworkType, TransactionHttp } from "tsjs-xpx-chain-sdk";
import { proximax } from "./proximax";

test("peg", async () => {
  const account = Account.createFromPrivateKey("", NetworkType.TEST_NET);
  const unsignedTx = proximax.peg("", [], "", NetworkType.TEST_NET);

  const signedTx = account.sign(unsignedTx, {});
  const http = new TransactionHttp("");
  const res = await http.announce(signedTx).toPromise();
});
