# Contributing to EzBackend

By contributing to EzBackend, you acknowledge the following:

1. You are awesome 🎉👍
2. You are a hero 💖🦸
3. You are a tech genius 💻👨🏽‍💻

## Code of Conduct

When participating in the project please follow the [code of conduct](./CODE_OF_CONDUCT.md). Please report unacceptable behaviour to we.are.kapydev@gmail.com

## Getting Started

Start by running `yarn` to install all the necessary dependencies

And run `yarn build:full` to setup your development environment

Running `yarn` in the monorepo root also gives a common list of commands that will be useful for development

After implementing your changes you can run `yarn test` in the monorepo root to ensure that no breaking changes were introduced

## Developing

To develop on EzBackend you will need to link your EzBackend project to the EzBackend monorepo

Start by creating a new project. Yarn is recommended since the monorepo uses yarn.

```
npx ezbackend init <my-project-name> --yarn
```

Next, within the `EzBackend monorepo`, you have to link all the packages that you wish to develop on, for example:

```
cd packages/core
yarn link
cd ../common
yarn link
cd ../auth
yarn link
cd ../cors
yarn link
cd ../db-ui
yarn link
cd ../openapi
yarn link
cd ../utils
yarn link
```

You will need to link all used EzBackend packages to prevent dependency mismatches

In the new EzBackend project you created with `npx ezbackend init`, you can link it to the monorepo packages.

```
yarn link @ezbackend/core @ezbackend/utils @ezbackend/common @ezbackend/auth @ezbackend/cors @ezbackend/db-ui @ezbackend/openapi
```

Finally, after all these are done you can run the ezbackend project with `yarn start` and build the part of the EzBackend monorepo you need with the interactive `yarn build` in the `monorepo root`.

## Asking Questions

You can ask questions on our [discord](https://discord.gg/S4gTjYjkuG)

## How can I contribute

### Reporting Bugs

You can report bugs with the default template [here](https://github.com/kapydev/ezbackend/issues/new?assignees=&labels=&template=bug_report.md&title=)

### Requesting Features

You can request a feature with the default template [here](https://github.com/kapydev/ezbackend/issues/new?assignees=&labels=&template=feature_request.md&title=)

### Pull Requests

Pull requests to improve the codebase or fix bugs are welcome! Just ensure that they pass all tests.
