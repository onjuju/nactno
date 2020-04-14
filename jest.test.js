test("test common matcher", () => {
  expect(2 + 2).toBe(4);
  expect(2 + 2).not.toBeLessThan(4);
  expect("nick").toMatch(/ic/);
});

test("test boolean matcher", () => {
  expect(2 + 2).toBeTruthy();
  expect("").toBeFalsy();
});

test("test numbers matcher", () => {
  expect([1, 2, 3]).toContain(2);
  expect([1, 2, 3]).not.toContain(4);
});

test("test obj matcher", () => {
  expect({ name: "nick" }).toStrictEqual({ name: "nick" });
});
