# Task 1. Caesar cipher CLI tool

## Description

**CLI tool that will encode and decode a text by [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)**.

## Install

```bash
npm install or npm i
```

### Example: 
```bash
node index.js -a encode -s 7 -i ./input.txt  -o ./output.txt
```

### CLI tool accepts options:
```bash
  -s, --shift: an shift number
  -i, --input: an input file direction
  -o, --output: an output file direction
  -a, --action: an action type encode/decode
```
All options is **required** to correct work CLI tool.
