import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  logStore,
} from 'matchstick-as/assembly/index';
import { Address, BigInt } from '@graphprotocol/graph-ts';
import { handleBasketId, handleRebalanceBasket } from '../src/game';
import { createBasketIdEvent, createRebalanceBasketEvent } from './game-utils';

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe('Testing game Events', () => {
  beforeAll(() => {
    const owner = Address.fromString('0x0000000000000000000000000000000000000001');
    const basketId = BigInt.fromI32(123);
    const vaultNumber = BigInt.fromI32(2);
    const newBasketIdEvent = createBasketIdEvent(owner, basketId, vaultNumber);
    handleBasketId(newBasketIdEvent);
  });

  afterAll(() => {
    clearStore();
  });

  describe('Handle BasketId Event', () => {
    test('Player created and stored', () => {
      const owner = Address.fromString('0x0000000000000000000000000000000000000001');

      assert.entityCount('Player', 1);
      assert.fieldEquals('Player', owner.toHexString(), 'id', owner.toHexString());
    });

    test('BasketId created and stored', () => {
      const owner = Address.fromString('0x0000000000000000000000000000000000000001');
      const basketId = '123';

      assert.entityCount('BasketId', 1);

      assert.fieldEquals('BasketId', basketId, 'owner', owner.toHexString());
      assert.fieldEquals('BasketId', basketId, 'basketId', basketId);
      assert.fieldEquals('BasketId', basketId, 'vaultNumber', '2');
      assert.fieldEquals('BasketId', basketId, 'redeemedRewards', '0');
      assert.fieldEquals('BasketId', basketId, 'unredeemedRewards', '0');
    });
  });

  describe('Handle RebalanceBasket Event', () => {
    beforeAll(() => {
      const basketId = BigInt.fromI32(123);
      const rebalancingPeriod = BigInt.fromI32(2);
      const unredeemedRewards = BigInt.fromI32(20_000);
      const redeemedRewards = BigInt.fromI32(10_000);
      const newRebalanceBasketEvent = createRebalanceBasketEvent(
        basketId,
        rebalancingPeriod,
        unredeemedRewards,
        redeemedRewards,
      );
      handleRebalanceBasket(newRebalanceBasketEvent);
      logStore();
    });

    test('Adjust BasketId entity', () => {
      const basketId = '123';

      assert.fieldEquals('BasketId', basketId, 'rebalancingPeriod', '2');
      assert.fieldEquals('BasketId', basketId, 'unredeemedRewards', '20000');
      assert.fieldEquals('BasketId', basketId, 'redeemedRewards', '10000');
    });
  });
});
