export type OracleResponse = {
  value: bigint;
  timestamp: bigint;
};

export function parseOracleValue(
  input: string,
): bigint {
  const value = input.trim();

  if (!value) {
    throw new Error(
      "oracle value is empty",
    );
  }

  if (!/^\d+$/.test(value)) {
    throw new Error(
      `invalid oracle value: ${value}`,
    );
  }

  return BigInt(value);
}

export function parseTimestamp(
  input: string,
): bigint {
  const value = input.trim();

  if (!/^\d+$/.test(value)) {
    throw new Error(
      `invalid timestamp: ${value}`,
    );
  }

  return BigInt(value);
}

export function parseOracleResponse(
  value: string,
  timestamp: string,
): OracleResponse {
  return {
    value: parseOracleValue(value),
    timestamp: parseTimestamp(timestamp),
  };
}

export function isFreshResponse(
  response: OracleResponse,
  currentTime: bigint,
  maxAge: bigint,
): boolean {
  if (currentTime < response.timestamp) {
    return false;
  }

  return (
    currentTime - response.timestamp <=
    maxAge
  );
}

export function formatOracleResponse(
  response: OracleResponse,
): string {
  return [
    `value=${response.value}`,
    `timestamp=${response.timestamp}`,
  ].join(", ");
}
