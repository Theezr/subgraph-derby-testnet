import { newMockEvent } from 'matchstick-as';
import { ethereum, Address, BigInt } from '@graphprotocol/graph-ts';
import { BasketId, RebalanceBasket, Transfer } from '../generated/Game/Game';

export function createBasketIdEvent(
  owner: Address,
  basketId: BigInt,
  vaultNumber: BigInt,
  name: string,
): BasketId {
  let basketIdEvent = changetype<BasketId>(newMockEvent());

  basketIdEvent.parameters = new Array();

  basketIdEvent.parameters.push(
    new ethereum.EventParam('owner', ethereum.Value.fromAddress(owner)),
  );
  basketIdEvent.parameters.push(
    new ethereum.EventParam('basketId', ethereum.Value.fromUnsignedBigInt(basketId)),
  );
  basketIdEvent.parameters.push(
    new ethereum.EventParam('vaultNumber', ethereum.Value.fromUnsignedBigInt(vaultNumber)),
  );
  basketIdEvent.parameters.push(new ethereum.EventParam('name', ethereum.Value.fromString(name)));

  return basketIdEvent;
}

export function createRebalanceBasketEvent(
  basketId: BigInt,
  rebalancingPeriod: BigInt,
  unredeemedRewards: BigInt,
  redeemedRewards: BigInt,
): RebalanceBasket {
  let rebalancedBasketEvent = changetype<RebalanceBasket>(newMockEvent());

  rebalancedBasketEvent.parameters = new Array();

  rebalancedBasketEvent.parameters.push(
    new ethereum.EventParam('basketId', ethereum.Value.fromUnsignedBigInt(basketId)),
  );
  rebalancedBasketEvent.parameters.push(
    new ethereum.EventParam(
      'rebalancingPeriod',
      ethereum.Value.fromUnsignedBigInt(rebalancingPeriod),
    ),
  );
  rebalancedBasketEvent.parameters.push(
    new ethereum.EventParam(
      'unredeemedRewards',
      ethereum.Value.fromUnsignedBigInt(unredeemedRewards),
    ),
  );
  rebalancedBasketEvent.parameters.push(
    new ethereum.EventParam('redeemedRewards', ethereum.Value.fromUnsignedBigInt(redeemedRewards)),
  );

  return rebalancedBasketEvent;
}

export function createTransferEvent(from: Address, to: Address, tokenId: BigInt): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent());

  transferEvent.parameters = new Array();

  transferEvent.parameters.push(new ethereum.EventParam('from', ethereum.Value.fromAddress(from)));
  transferEvent.parameters.push(new ethereum.EventParam('to', ethereum.Value.fromAddress(to)));
  transferEvent.parameters.push(
    new ethereum.EventParam('tokenId', ethereum.Value.fromUnsignedBigInt(tokenId)),
  );

  return transferEvent;
}
