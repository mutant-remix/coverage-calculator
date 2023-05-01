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
- Gather the required files
    - Make the data directory
    ```
    mkdir data
    ```
    - Download unicode data
    ```
    wget https://raw.githubusercontent.com/googlefonts/emoji-metadata/main/emoji_15_0_ordering.json -P ./data/
    ```
    - Download Inter font
    ```
    wget https://github.com/rsms/inter/releases/download/v3.19/Inter-3.19.zip -P data/
    unzip ./data/Inter-3.19.zip -d ./data/inter
    mv ./data/inter/Inter\ Hinted\ for\ Windows/Desktop/Inter-SemiBold.ttf ./data/inter.ttf
    rm -rf ./data/inter ./data/Inter-3.19.zip
    ```
    - Copy Mutant remix data
    ```
    cp ../out/test_json/mtnt_test.json ./data/
    ```

- Install dependencies
```
yarn
```

- Run
```
yarn start
```
