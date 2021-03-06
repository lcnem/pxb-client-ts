import { ValAddress, Msg } from "cosmos-client";

export class MsgRequestInvitation extends Msg {
  constructor(
    public address: ValAddress,
    public mainchain_address: string,
    public new_cosigner_public_key: string,
    public first_cosigner_address: ValAddress
  ) {
    super();
  }

  /**
   *
   * @param value
   */
  public static fromJSON(value: any) {
    return new this(
      ValAddress.fromBech32(value.address),
      value.mainchain_address,
      value.new_cosigner_public_key,
      ValAddress.fromBech32(value.first_cosigner_address)
    );
  }
}
