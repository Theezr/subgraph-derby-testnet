import {
  BasketId as BasketIdEvent,
  PushProtocolAllocations as PushProtocolAllocationsEvent,
  PushedAllocationsToController as PushedAllocationsToControllerEvent,
  Transfer as TransferEvent
} from "../generated/Race/Race"
import {
  BasketId,
  PushProtocolAllocations,
  PushedAllocationsToController,
  Transfer
} from "../generated/schema"


export function handleBasketId(event: BasketIdEvent): void {
  let entity = new BasketId(
    event.params.owner.concatI32(event.params.basketId.toI32())
  )
  entity.owner = event.params.owner
  entity.basketId = event.params.basketId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
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
