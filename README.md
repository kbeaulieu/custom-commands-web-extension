# Custom Commands Web Extension 
A single Web Extension defining custom commands

## TODOs
- Add webpack (or something else) to be able to split main.ts file
    - Change `tsconfig.json` `compilerOptions.module` to `commonjs`
    - Change `scripts/build.sh`
    - Add `build:prod` scripts with a `tsconfig.prod.json` file
- Add tslint (or eslint?)
- Add support for Google Chrome

## Commands
### Redo search with google
Supports `duckduckgo.com` and `startpage.com`.
