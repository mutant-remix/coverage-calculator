# Mutant Remix unicode coverage
A tool to measure unicode coverage of the emoji pack and generate a markdown table and an image

This generates:
- `coverage.md` - a markdown table of every emoji and whether it exists in the pack
- `coverage.svg` - a pretty progress bar
- `coverage.json` - a JSON file containing the coverage stats

## Prerequisites
- Node.js
- Yarn (npm if you're a masochist)

## Usage
```
mkdir data
wget https://raw.githubusercontent.com/googlefonts/emoji-metadata/main/emoji_15_0_ordering.json -P data/
cp ../out/test_json/mtnt_test.json data/
```

```
yarn
yarn start
```
