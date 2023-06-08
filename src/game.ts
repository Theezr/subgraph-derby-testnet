import { BigInt, Bytes } from '@graphprotocol/graph-ts';
import {
  BasketId as BasketIdEvent,
  RebalanceBasket as RebalanceBasketEvent,
  Transfer as TransferEvent,
} from '../generated/Game/Game';
import { BasketId, Player, RebalanceBasket, Transfer } from '../generated/schema';

export function handleBasketId(event: BasketIdEvent): void {
  let basket = new BasketId(event.params.basketId.toString());
  basket.owner = event.params.owner;
  basket.vaultNumber = event.params.vaultNumber;
  basket.redeemedRewards = BigInt.fromI32(0);
  basket.unredeemedRewards = BigInt.fromI32(0);

  basket.blockNumber = event.block.number;
  basket.blockTimestamp = event.block.timestamp;
  basket.transactionHash = event.transaction.hash;

  let player = Player.load(event.params.owner);
  if (!player) {
    player = new Player(event.params.owner);
    player.save();
  }

  basket.save();
}

export function handleRebalanceBasket(event: RebalanceBasketEvent): void {
  let basket = BasketId.load(event.params.basketId.toString());
  if (!basket) return;

  basket.rebalancingPeriod = event.params.rebalancingPeriod;
  basket.unredeemedRewards = event.params.unredeemedRewards;
  basket.redeemedRewards = event.params.redeemedRewards;

  basket.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
