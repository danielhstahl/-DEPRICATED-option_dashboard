# Option Dashboard

This is the client side dashboard application for an option pricing dashboard.

## Dependencies

The dashboard is dependent on [levy-functions](https://github.com/phillyfan1138/levy-functions) which are on AWS lambda.  

## Roadmap

Currently, the dashboard is simply a calculator for options on an asset which follows an extended CGMY process. For more information, see the [levy-functions](https://github.com/phillyfan1138/levy-functions) repo especially [index.md](https://github.com/phillyfan1138/levy-functions/blob/master/index.md).

In a future state, we want the following:

* Add tabs for American options (using FSTS)
* Have a "simple" and "advanced" view
* Add "Greeks" (at least delta, maybe gamma and theta)
* Add calibration (mark to market)
* Add data feeds?