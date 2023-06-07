import {
  BasketId as BasketIdEvent,
  PushProtocolAllocations as PushProtocolAllocationsEvent,
  PushedAllocationsToController as PushedAllocationsToControllerEvent,
  RebalancedBasket as RebalancedBasketEvent,
  Transfer as TransferEvent
} from "../generated/Game/Game"
import {
  BasketId,
  Player,
  PushProtocolAllocations,
  PushedAllocationsToController,
  RebalancedBasket,
  Transfer
} from "../generated/schema"


export function handleBasketId(event: BasketIdEvent): void {
  let basket = new BasketId(
   event.params.owner.concatI32(event.params.basketId.toI32())
  )
  basket.owner = event.params.owner
  basket.basketId = event.params.basketId

  basket.blockNumber = event.block.number
  basket.blockTimestamp = event.block.timestamp
  basket.transactionHash = event.transaction.hash

  let player = Player.load(event.params.owner);
  if(!player) {
    player = new Player(event.params.owner)
    player.save()
  }

  basket.save()
}

export function handlePushProtocolAllocations(
  event: PushProtocolAllocationsEvent
): void {
  let entity = new PushProtocolAllocations(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.chain = event.params.chain
  entity.vault = event.params.vault
  entity.deltas = event.params.deltas

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePushedAllocationsToController(
  event: PushedAllocationsToControllerEvent
): void {
  let entity = new PushedAllocationsToController(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.vaultNumber = event.params.vaultNumber
  entity.deltas = event.params.deltas

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRebalancedBasket(event: RebalancedBasketEvent): void {
  let entity = new RebalancedBasket(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.basketId = event.params.basketId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
