import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  BasketId,
  RebalancedBasket,
  Transfer
} from "../generated/Game/Game"


export function createBasketIdEvent(
  owner: Address,
  basketId: BigInt,
  vaultNumber: BigInt
): BasketId {
  let basketIdEvent = changetype<BasketId>(newMockEvent())

  basketIdEvent.parameters = new Array()

  basketIdEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  basketIdEvent.parameters.push(
    new ethereum.EventParam(
      "basketId",
      ethereum.Value.fromUnsignedBigInt(basketId)
    )
  )
  basketIdEvent.parameters.push(
    new ethereum.EventParam(
      "vaultNumber",
      ethereum.Value.fromUnsignedBigInt(vaultNumber)
    )
  )

  return basketIdEvent
}

export function createRebalancedBasketEvent(
  basketId: BigInt
): RebalancedBasket {
  let rebalancedBasketEvent = changetype<RebalancedBasket>(newMockEvent())

  rebalancedBasketEvent.parameters = new Array()

  rebalancedBasketEvent.parameters.push(
    new ethereum.EventParam(
      "basketId",
      ethereum.Value.fromUnsignedBigInt(basketId)
    )
  )

  return rebalancedBasketEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}
