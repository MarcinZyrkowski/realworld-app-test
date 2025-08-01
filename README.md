## project description

Test automation project for realworld-app
(should be cloned and run separately -
[realworld-app](https://github.com/MarcinZyrkowski/realworld-app) )

## service url

`http://localhost:3000`

## running tests

`npx playwright test` - run all tests on all environments ("dev" and "qa")

possible flags:
| flag | description |
| --- | --- |
| `--ui` | enables UI mode |
| `--headed` | enables headed mode, opened browser is visible |
| `--project=dev` | specifies project

flags could be mixed e.g.
`npx playwright test --ui --project=dev`

## reporting

After running tests you can find test reports under `./reports`. There are 3 types of reports:

- allure report
- html report
- json report

To open html report it is enough to open html file `index.html` in your browser.
To open allure report use command:
`npm run allure`

## debugging failed tests

For debbiging failed tests reports may be useful. However to utilize more detailed way of debbuing you can open trace:
`npx playwright show-trace {your_trace.zip}`

You can always add flag `--debug` to run live debugger e.g.
`npm playwright test --debug`

## formatting

To verify format issues use:
`npm run codecheck` - runs eslint and prettier

## adjusting node version

If you have different version of node than specified in `.nvmrc` use:
`nvm use` command in terminal after opening project.
