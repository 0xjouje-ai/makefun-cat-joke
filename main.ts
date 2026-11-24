import { mkdirSync, writeFileSync } from "node:fs";

const joke =
  "My cat knocked my phone off the table, then looked at me like I was the one who dropped it.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", joke, "utf8");
