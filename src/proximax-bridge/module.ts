import { CosmosSDK, codec } from "cosmos-client";
import { StdTx } from "cosmos-client/x/auth";
import { UnpegReq, RequestInvitationReq, Params } from "./types";
import Axios, { AxiosPromise } from "axios";

export function parametersGet(sdk: CosmosSDK) {
  return sdk.wrapResponseWithHeight(
    Axios.get<Params>(`${sdk.url}/proximax_bridge/parameters`),
  );
}

export function unpegPost(sdk: CosmosSDK, req: UnpegReq) {
  return Axios.post(`${sdk.url}/proximax_bridge/unpeg`, req).then((res) => {
    res.data = codec.fromJSONString(JSON.stringify(res.data));
    return res;
  }) as AxiosPromise<StdTx>;
}

export function requestInvitationPost(
  sdk: CosmosSDK,
  req: RequestInvitationReq,
) {
  return Axios.post(`${sdk.url}/proximax_bridge/request_invitation`, req).then(
    (res) => {
      res.data = codec.fromJSONString(JSON.stringify(res.data));
      return res;
    },
  ) as AxiosPromise<StdTx>;
}
