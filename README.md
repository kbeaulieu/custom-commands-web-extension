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
### Redo search with google (`Alt+G`)
Supports `duckduckgo.com` and `startpage.com`.

## Future Commands
- `Alt+C` Change current cookie store id for the default one (reopen current tab in a containerless tab).
  [](https://gitlab.com/mjanetmars/switch-container/blob/master/switch_container.js)
- `Ctrl+Alt+LeftClick` to open link in a new tab without container. Is `LeftClick` a valid key?
