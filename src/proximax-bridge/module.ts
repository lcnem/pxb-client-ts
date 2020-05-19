import { CosmosSDK } from "cosmos-client";
import { StdTx } from "cosmos-client/x/auth";
import { UnpegReq, RequestInvitationReq, Params } from "./types";
import Axios from "axios";

export function parametersGet(sdk: CosmosSDK) {
  return Axios.get<Params>(`${sdk.url}/proximax_bridge/parameters`);
}

export function unpegPost(sdk: CosmosSDK, req: UnpegReq) {
  return sdk.instancifyObjectWithoutAminoJSON<StdTx>(
    StdTx,
    Axios.post(`${sdk.url}/proximax_bridge/unpeg`, req)
  );
}

export function requestInvitationPost(sdk: CosmosSDK, req: RequestInvitationReq) {
  return sdk.instancifyObjectWithoutAminoJSON<StdTx>(
    StdTx,
    Axios.post(`${sdk.url}/proximax_bridge/request_invitation`, req)
  );
}
