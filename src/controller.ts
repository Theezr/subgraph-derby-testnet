import { AddProtocol as AddProtocolEvent } from '../generated/Controller/Controller';
import { Protocol, Vault } from '../generated/schema';

export function handleAddProtocol(event: AddProtocolEvent): void {
  let vault = Vault.load(event.params.vaultNumber.toString());
  if (!vault) {
    vault = new Vault(event.params.vaultNumber.toString());
    vault.vaultNumber = event.params.vaultNumber;
    vault.name = `Derby_${event.params.vaultNumber}`;
    vault.save();
  }

  let protocol = new Protocol(`${event.params.vaultNumber}-${event.params.protocolNumber}`);
  protocol.name = event.params.name;
  protocol.vault = event.params.vaultNumber.toString();
  protocol.provider = event.params.provider;
  protocol.protocolLPToken = event.params.protocolLPToken;
  protocol.underlying = event.params.underlying;
  protocol.govToken = event.params.govToken;
  protocol.protocolNumber = event.params.protocolNumber;

  protocol.blockNumber = event.block.number;
  protocol.blockTimestamp = event.block.timestamp;
  protocol.transactionHash = event.transaction.hash;

  protocol.save();
}
