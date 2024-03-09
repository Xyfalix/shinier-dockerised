const mongoose = require("mongoose");
const Item = require("../../models/item");
const db = require("../../setup/db");

const newItemData = {
  itemId: "123457",
  itemName: "TestItem2",
  itemPrice: 6.9,
  itemRarity: "Rare Holo",
  itemImage: "https://images.pokemontcg.io/sm115/63.png",
  setName: "Test Set",
  setNumber: 1,
  setTotal: 100,
  availableStock: 5,
};

beforeAll(async () => {
  await db.setUp();
});

afterEach(async () => {
  await db.dropCollections();
});

afterAll(async () => {
  await db.dropDatabase();
});

describe("item model", () => {
  it("create a new item and access its variables successfully", async () => {
    await Item.create(newItemData);

    const insertedItem = await Item.findOne({ itemId: "123457" });
    const savedItem = await insertedItem.save();
    expect(savedItem._id).toBeDefined();
    expect(savedItem.itemId).toBe(newItemData.itemId);
    expect(savedItem.setTotal).toBe(newItemData.setTotal);
  });

  // you should not be able to key in values in the field that do not match its required type
  // Do take note that MongoDB has type coercion in the form of casting and will attempt to force values into the correct type if its possible
  it("create item with wrong type for required field should fail", async () => {
    const itemWithWrongType = { ...newItemData, setTotal: "rectangle" };
    let err;
    // Attempt to save item with the wrong type to db
    try {
      const newItemWithWrongType = await Item.create(itemWithWrongType);
      await newItemWithWrongType.save();
    } catch (error) {
      err = error;
    }
    // Expect validation error
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.setTotal).toBeDefined();
  });
});
