import { BigInt, Bytes } from '@graphprotocol/graph-ts';
import {
  BasketId as BasketIdEvent,
  RebalanceBasket as RebalanceBasketEvent,
} from '../generated/Game/Game';
import { BasketId, Player } from '../generated/schema';

export function handleBasketId(event: BasketIdEvent): void {
  let basket = new BasketId(event.params.basketId.toString());
  basket.owner = event.params.owner;
  basket.vault = event.params.vaultNumber.toString();
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
