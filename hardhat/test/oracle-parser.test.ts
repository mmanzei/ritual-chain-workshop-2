import { expect } from "chai";

import {
  parseOracleValue,
  parseTimestamp,
  parseOracleResponse,
  isFreshResponse,
  formatOracleResponse,
} from "../scripts/lib/oracle-parser";

describe("oracle response parser", function () {
  it("parses a numeric value", function () {
    expect(
      parseOracleValue("4000"),
    ).to.equal(4000n);
  });

  it("handles surrounding spaces", function () {
    expect(
      parseOracleValue(" 4000 "),
    ).to.equal(4000n);
  });

  it("rejects an empty value", function () {
    expect(() =>
      parseOracleValue(""),
    ).to.throw();
  });

  it("rejects non numeric values", function () {
    expect(() =>
      parseOracleValue("4000 USD"),
    ).to.throw();
  });

  it("parses timestamps", function () {
    expect(
      parseTimestamp("1000"),
    ).to.equal(1000n);
  });

  it("creates an oracle response", function () {
    const response =
      parseOracleResponse(
        "4200",
        "1000",
      );

    expect(response.value)
      .to.equal(4200n);

    expect(response.timestamp)
      .to.equal(1000n);
  });

  it("accepts a fresh response", function () {
    const response =
      parseOracleResponse(
        "4200",
        "1000",
      );

    expect(
      isFreshResponse(
        response,
        1050n,
        100n,
      ),
    ).to.equal(true);
  });

  it("rejects an old response", function () {
    const response =
      parseOracleResponse(
        "4200",
        "1000",
      );

    expect(
      isFreshResponse(
        response,
        1200n,
        100n,
      ),
    ).to.equal(false);
  });

  it("formats the response", function () {
    const response =
      parseOracleResponse(
        "4200",
        "1000",
      );

    expect(
      formatOracleResponse(response),
    ).to.contain(
      "value=4200",
    );
  });
});
