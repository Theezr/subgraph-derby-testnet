import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  logStore,
} from 'matchstick-as/assembly/index';
import { BigInt, Address } from '@graphprotocol/graph-ts';
import { Protocol } from '../generated/schema';
import { AddProtocol as AddProtocolEvent } from '../generated/Controller/Controller';
import { handleAddProtocol, handleAddVault } from '../src/controller';
import { createAddVaultEvent, createProtocolEvent } from './controller-utils';

describe('Testing Controller events', () => {
  beforeAll(() => {
    let name = 'ETH_yearn_usdc';
    let vaultNumber = BigInt.fromI32(10);
    let provider = Address.fromString('0x0000000000000000000000000000000000000001');
    let protocolLPToken = Address.fromString('0x0000000000000000000000000000000000000002');
    let underlying = Address.fromString('0x0000000000000000000000000000000000000003');
    let govToken = Address.fromString('0x0000000000000000000000000000000000000004');
    let protocolNumber = BigInt.fromI32(2);
    let newProtocolEvent = createProtocolEvent(
      name,
      vaultNumber,
      provider,
      protocolLPToken,
      underlying,
      govToken,
      protocolNumber,
    );
    handleAddProtocol(newProtocolEvent);

    let vaultName = 'Derby_USDC_LB_10';
    let newAddVaultEvent = createAddVaultEvent(vaultNumber, vaultName);
    handleAddVault(newAddVaultEvent);

    let newAddVaultEvent2 = createAddVaultEvent(BigInt.fromI32(1), 'Derby_USDC_LB_1');
    handleAddVault(newAddVaultEvent2);
    logStore();
  });

  afterAll(() => {
    clearStore();
  });

  test('Protocol created and stored', () => {
    assert.entityCount('Protocol', 1);

    assert.fieldEquals('Protocol', '10-2', 'network', 'ETH');
    assert.fieldEquals('Protocol', '10-2', 'protocol', 'yearn');
    assert.fieldEquals('Protocol', '10-2', 'name', 'ETH_yearn_usdc');
    assert.fieldEquals('Protocol', '10-2', 'coin', 'usdc');
    assert.fieldEquals('Protocol', '10-2', 'vault', '10');
    assert.fieldEquals(
      'Protocol',
      '10-2',
      'provider',
      '0x0000000000000000000000000000000000000001',
    );
    assert.fieldEquals(
      'Protocol',
      '10-2',
      'protocolLPToken',
      '0x0000000000000000000000000000000000000002',
    );
    assert.fieldEquals(
      'Protocol',
      '10-2',
      'underlying',
      '0x0000000000000000000000000000000000000003',
    );
    assert.fieldEquals(
      'Protocol',
      '10-2',
      'govToken',
      '0x0000000000000000000000000000000000000004',
    );
    assert.fieldEquals('Protocol', '10-2', 'protocolNumber', '2');
  });

  test('Vault created and stored', () => {
    assert.entityCount('Vault', 2);

    assert.fieldEquals('Vault', '10', 'name', 'Derby_USDC_LB_10');
    assert.fieldEquals('Vault', '10', 'vaultNumber', '10');
    assert.fieldEquals('Vault', '10', 'network', 'ETH');
    assert.fieldEquals('Vault', '10', 'protocol', 'Derby');
    assert.fieldEquals('Vault', '10', 'coin', 'USDC');
    assert.fieldEquals('Vault', '10', 'category', 'Lending Borrowing');
  });
});
