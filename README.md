# wakatime-mobile
Mobile app for WakaTime

Built using the [Ionic SDK](http://ionicframework.com/), to be cross-platform on iOS and Android

Right now, this has very minimal functionality:

* Account screen where you can enter your WakaTime API key, which is necessary for the app to access your WakaTime data
* Stats screen, displaying last 7 days for projects and languages

##Contributing

Contributors welcome!  Just follow the typical ["Fork & Pull"](https://help.github.com/articles/using-pull-requests/) GitHub collaborative model.

If you have ideas or questions just [open an issue](https://github.com/DavidFrahm/wakatime-mobile/issues/new).

## Up and running

After clone, run the following commands to set up the project:

To set up sass, install bower and npm dependencies, run ```ionic setup sass```
To restore cordova platforms and required plugins, run ```ionic state restore```
To avoid [spawn EACCES error](http://forum.ionicframework.com/t/how-to-fix-this-error-spawn-eacces/20490/4), run ```ionic hooks add```

Then [test in browser](http://ionicframework.com/docs/cli/test.html) and [run on your phone](http://ionicframework.com/docs/cli/run.html).

##License Info

[BSD License](LICENSE)
