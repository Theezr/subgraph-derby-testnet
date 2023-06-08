import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  logStore
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import {  handleBasketId } from "../src/game"
import { createBasketIdEvent } from "./game-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {

  beforeAll(() => {
    const owner = Address.fromString("0x0000000000000000000000000000000000000001")
    const basketId = BigInt.fromI32(123)
    const vaultNumber = BigInt.fromI32(2)
    const newBasketIdEvent = createBasketIdEvent(owner, basketId, vaultNumber)
    handleBasketId(newBasketIdEvent)
    logStore();
  })

  afterAll(() => {
    clearStore()
  })

  test("BasketId created and stored", () => {
    assert.entityCount("BasketId", 1)
    assert.entityCount("Player", 1)
    const owner = Address.fromString("0x0000000000000000000000000000000000000001")
    const basketId = BigInt.fromI32(123)
    const id = owner.concatI32(basketId.toI32()).toHexString();

    assert.fieldEquals(
      "BasketId",
      id,
      "owner",
      owner.toHexString()
    )
    assert.fieldEquals(
      "BasketId",
      id,
      "basketId",
      "123"
    )
    assert.fieldEquals(
      "BasketId",
      id,
      "vaultNumber",
      "2"
    )

    assert.fieldEquals(
      "Player",
      owner.toHexString(),
      "id",
      owner.toHexString()
    )
  })
})
