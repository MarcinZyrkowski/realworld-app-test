## Description
Test automation project for realworld-app
(should be cloned and run separately -
[realworld-app](https://github.com/MarcinZyrkowski/realworld-app) )

## App url
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