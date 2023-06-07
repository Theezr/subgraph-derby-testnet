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
import { handleBasketId } from "../src/race"
import {  createBasketIdEvent } from "./race-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {

  beforeAll(() => {
    const owner = Address.fromString("0x0000000000000000000000000000000000000001")
    const basketId = BigInt.fromI32(123)
    const newBasketIdEvent = createBasketIdEvent(owner, basketId)
    handleBasketId(newBasketIdEvent)
    logStore();
  })

  afterAll(() => {
    clearStore()
  })

  test("BasketId created and stored", () => {
    assert.entityCount("BasketId", 1)
    const owner = Address.fromString("0x0000000000000000000000000000000000000001")
    const basketId = BigInt.fromI32(123)
    const id = owner.concatI32(basketId.toI32()).toHexString();
    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
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
  })
})
