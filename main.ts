import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: one line, one joke, no setup paragraph, no punchline on a
// second line. It lands because it is a single, instantly visual scene
// (cat knocks phone off table) with a reversal in the second half: the
// cat's look pins the blame on the human, which is exactly the kind of
// smug-cat behaviour every cat owner recognises. Short, specific, and
// the blame-flip is the punchline, so the line works on first read.
const joke =
  "My cat knocked my phone off the table, then looked at me like I was the one who dropped it.";

// Gate validation: the bounty accepts a single line of 1-200 characters.
// Reject control characters (char codes below 32, plus DEL) so the entry
// stays one clean printable line.
if (joke.length < 1 || joke.length > 200) {
  throw new Error(`entry length ${joke.length} is outside the 1-200 gate`);
}
for (let i = 0; i < joke.length; i++) {
  const code = joke.charCodeAt(i);
  if (code < 32 || code === 127) {
    throw new Error(`entry contains control character ${code} at index ${i}`);
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", joke, "utf8");

// Write-back verification: read the file straight back and confirm it
// matches the intended text byte for byte before finishing.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== joke) {
  throw new Error("write-back verification failed: entry.txt differs from joke");
}
