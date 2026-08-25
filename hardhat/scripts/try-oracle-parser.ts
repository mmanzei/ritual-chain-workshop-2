import {
  parseOracleResponse,
  isFreshResponse,
  formatOracleResponse,
} from "./lib/oracle-parser";

const response =
  parseOracleResponse(
    "4215",
    "1000",
  );

const currentTime = 1060n;

console.log(
  "Parsed response:",
);

console.log(
  formatOracleResponse(response),
);

console.log("");

console.log(
  "Current time:",
  currentTime.toString(),
);

console.log(
  "Fresh:",
  isFreshResponse(
    response,
    currentTime,
    300n,
  ),
);

console.log("");

console.log(
  "This is only a small parser",
);

console.log(
  "for understanding the data flow.",
);
