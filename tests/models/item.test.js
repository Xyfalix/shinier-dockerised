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

describe("insert", () => {
  it("create a new item and access its variables successfully", async () => {
    await Item.create(newItemData);

    const insertedItem = await Item.findOne({ itemId: "123457" });
    const savedItem = await insertedItem.save();
    expect(savedItem._id).toBeDefined();
    expect(savedItem.itemId).toBe(newItemData.itemId);
    expect(savedItem.setTotal).toBe(newItemData.setTotal);
  });
});
