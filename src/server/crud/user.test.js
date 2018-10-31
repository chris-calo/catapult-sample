import userOps from './user';

const ops = userOps;

describe('userOps.validate', () => {
  it("should ensure existence of required input properties", () => {
    throw new Error("fail");
  });

  it("should ensure firstName is a valid String", () => {
    throw new Error("fail");
  });

  it("should ensure lastName is a valid String", () => {
    throw new Error("fail");
  });

  it("should ensure email is a valid email", () => {
    throw new Error("fail");
  });

  it("should ensure password is a valid String", () => {
    throw new Error("fail");
  });
});

describe('userOps.create', () => {
  it("should validate the input object", () => {
    throw new Error("fail");
  });

  it("should insert new rows, if valid", () => {
    throw new Error("fail");
  });

  it("should fail if email element already exists", () => {
    throw new Error("fail");
  });
});

describe('userOps.extendSession', () => {
  it("should validate the input object", () => {
    throw new Error("fail");
  });

  it("should increase the session length, if possible", () => {
    throw new Error("fail");
  });
});
