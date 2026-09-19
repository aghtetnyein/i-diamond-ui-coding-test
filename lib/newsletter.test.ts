import assert from "node:assert/strict";
import { test } from "node:test";
import { newsletterSchema } from "./newsletter.ts";

const isValid = (email: unknown) => newsletterSchema.safeParse({ email }).success;

test("accepts well-formed addresses and trims whitespace", () => {
  assert.equal(isValid("first.last+tag@sub.example.com"), true);
  assert.equal(newsletterSchema.parse({ email: "  a@b.co " }).email, "a@b.co");
});

test("rejects malformed addresses", () => {
  for (const email of ["", "foo", "foo@", "@bar.com", "foo@bar", "foo @bar.com", null]) {
    assert.equal(isValid(email), false, String(email));
  }
});
