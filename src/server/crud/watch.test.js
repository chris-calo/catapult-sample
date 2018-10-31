import watchCRUD from './watch';
import { dateFactory, watchData } from './data';

const crud = watchCRUD;

describe('watchCRUD.validate', () => {
  it("should ensure existence of required input properties", () => {
  });

  it("should ensure location is a valid String", () => {
  });

  it("should ensure usageMS is a valid Number", () => {
  });

  it("should ensure ttfbMS is a valid Number", () => {
  });
});

describe('watchCRUD.create', () => {
  it("should validate the input object", () => {
  });

  it("should insert new rows, if valid", () => {
  });

  it("should fail if daysAgo element already exists", () => {
  });
});

describe('watchCRUD.read', () => {
  it("should handle ID-based requests", () => {
  });

  it("should ensure the received ID is a valid row identifier", () => {
  });

  it("should provide an option to return all items", () => {
  });
});

describe('watchCRUD.update', () => {
  it("should ensure the received ID is a valid row identifier", () => {
  });

  it("should validate the input object", () => {
  });

  it("should update the object at a valid row", () => {
  });
});

describe('watchCRUD.delete', () => {
  it("should ensure the received ID is a valid row identifier", () => {
  });

  it("should delete the object at the valid row", () => {
  });
});
