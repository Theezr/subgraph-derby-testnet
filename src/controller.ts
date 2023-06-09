import {
  AddProtocol as AddProtocolEvent,
  AddVault as AddVaultEvent,
} from '../generated/Controller/Controller';
import { Protocol, Vault } from '../generated/schema';

export function handleAddProtocol(event: AddProtocolEvent): void {
  let protocol = new Protocol(`${event.params.vaultNumber}-${event.params.protocolNumber}`);
  const protocolInfo = event.params.name.split('_');
  protocol.name = event.params.name;
  protocol.network = protocolInfo[0];
  protocol.protocol = protocolInfo[1];
  protocol.coin = protocolInfo[2];

  protocol.vault = event.params.vaultNumber.toString();
  protocol.provider = event.params.provider;
  protocol.protocolLPToken = event.params.protocolLPToken;
  protocol.underlying = event.params.underlying;
  protocol.govToken = event.params.govToken;
  protocol.protocolNumber = event.params.protocolNumber;

  protocol.save();
}

export function handleAddVault(event: AddVaultEvent): void {
  let vault = Vault.load(event.params.vaultNumber.toString());
  if (!vault) {
    vault = new Vault(event.params.vaultNumber.toString());
    vault.vaultNumber = event.params.vaultNumber;
    vault.name = event.params.vaultName;

    const vaultInfo = event.params.vaultName.split('_');
    vault.network = 'ETH';
    vault.protocol = vaultInfo[0];
    vault.coin = vaultInfo[1];

    if (vaultInfo[2].toString() == 'LB') {
      vault.category = 'Lending Borrowing';
    }

    vault.save();
  }
}
