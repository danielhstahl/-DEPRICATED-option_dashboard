| [Linux][lin-link] | [Codecov][cov-link] |
| :---------------: | :-----------------: |
| ![lin-badge]      | ![cov-badge]        |

[lin-badge]: https://travis-ci.org/phillyfan1138/option_dashboard.svg?branch=master "Travis build status"
[lin-link]:  https://travis-ci.org/phillyfan1138/option_dashboard "Travis build status"
[cov-badge]: https://codecov.io/gh/phillyfan1138/option_dashboard/branch/master/graph/badge.svg
[cov-link]:  https://codecov.io/gh/phillyfan1138/option_dashboard

# Option Dashboard

This is the client side dashboard application for an option pricing dashboard.

## Dependencies

The dashboard is dependent on [levy-functions](https://github.com/phillyfan1138/levy-functions) which are on AWS lambda.  


## Roadmap

Currently, the dashboard is simply a calculator for options on an asset which follows an extended CGMY process. For more information, see the [levy-functions](https://github.com/phillyfan1138/levy-functions) repo especially [index.md](https://github.com/phillyfan1138/levy-functions/blob/master/index.md).

In a future state, we want the following:

* Add tabs for American options (using FSTS)
* ~~Have a "simple" and "advanced" view~~ [Complete](https://github.com/phillyfan1138/option_dashboard/commit/5bba9ab7ed50cc03b20662591789d887fe4f066f)
* ~~Add "Greeks" (at least delta, maybe gamma and theta)~~ [Complete](https://github.com/phillyfan1138/option_dashboard/commit/c8a8174aea080c8d95d2ae76e74f5ed616accd42)
* ~~Add calibration (mark to market)~~ [Complete](https://github.com/phillyfan1138/option_dashboard/commit/607d51b93f45b5d75fe6e08ae758b5d38429d5d3)
* Add data feeds?

## Plugin features

* Inside this repo, run `node newModel [modelname]`
* Edit `./src/Models/[modelname].js`.  This should include adding functions to convert back and forth between CGMY parameters.
* Run `./generator/buildCode.js`.  This will update `./src/modelSkeleton.js`.