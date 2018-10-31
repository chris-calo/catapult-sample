import distanceCRUD from './distance';
import { dateFactory, distanceData } from './data';

const crud = distanceCRUD;

describe('distanceCRUD.validate', () => {
  it("should ensure existence of required input properties", () => {
  });

  it("should ensure daysAgo is a valid Number", () => {
  });

  it("should ensure location is a valid String", () => {
  });

  it("should ensure meters is a valid Number", () => {
  });
});

describe('distanceCRUD.create', () => {
  it("should validate the input object", () => {
  });

  it("should insert new rows, if valid", () => {
  });

  it("should fail if daysAgo element already exists", () => {
  });
});

describe('distanceCRUD.read', () => {
  it("should handle ID-based requests", () => {
  });

  it("should ensure the received ID is a valid row identifier", () => {
  });

  it("should provide an option to return all items", () => {
  });
});

describe('distanceCRUD.update', () => {
  it("should ensure the received ID is a valid row identifier", () => {
  });

  it("should validate the input object", () => {
  });

  it("should update the object at a valid row", () => {
  });
});

describe('distanceCRUD.delete', () => {
  it("should ensure the received ID is a valid row identifier", () => {
  });

  it("should delete the object at the valid row", () => {
  });
});
