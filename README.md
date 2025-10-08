# Random Password Generator (RPG.js)

Small, single-file password generator that works in both the browser and Node.js.

## What this project contains

- `RPG.js` — a simple password generator function and a small interactive front-end:
  - In the browser it uses `prompt` / `confirm` / `alert`.
  - In Node it falls back to `readline` so you can run it from the terminal.

## Features

- Generate a password with a requested length.
- Choose which character sets to include: lowercase, uppercase, numbers, symbols.
- Works in both browser and Node (no dependencies).
