# Tesloop

**Tesloop** is the application for both piloting trips and creating booking for trips.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy to the App Stores.

### Prerequisities

+ [Node (>4.0) and NPM](https://nodejs.org/en/) <br>
+ [Android SDK](https://facebook.github.io/react-native/docs/android-setup.html) <br>
+ [Xcode](https://developer.apple.com/xcode/download/) <br>
+ [Facebook SDK](https://developers.facebook.com/docs/ios/getting-started) `Download and unzip to ~/Documents/FacebookSDK`
+ [watchman](https://facebook.github.io/watchman/docs/install.html) `brew install watchman`
+ [React-Native](https://facebook.github.io/react-native/docs/getting-started.html)
`sudo npm install -g react-native-cli`

### Installing


Clone this repository

```
git clone https://github.com/Tesloop/TesloopApp.git
```

Install Node Packages

```
npm install
```

Configuration settings are found in `src/config/index.js`, you may  need to change the serverURL.

#### iOS
Open `ios/Tesloop.xcodeproj` <br>
*Locally* <br>
Set the Device Profile (Xcode) to iPhone5 and use `Cmd+R` to run. <br>
*On Device* <br>
Set the jsCodeLocation in `ios/Tesloop/AppDelegate.m` to your local IP address. <br>
Set the Device Profile (Xcode) to iPhone and use `Cmd+R` to run the simulator. <br>
#### Android
*Locally* <br>
[Create and start an Android emulator](https://facebook.github.io/react-native/docs/android-setup.html) and run `react-native run-android` <br>
*On Device* <br>
Run `adb reverse tcp:8081 tcp:8081` and `react-native run-android`

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [React Native](https://facebook.github.io/react-native/)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/tesloop/TesloopApp/tags).

## Authors

* **Jordan Garside** - *Initial work* - [JordanGarside](https://github.com/JordanGarside)

See also the list of [contributors](https://github.com/tesloop/TesloopApp/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* blank
# TesloopAppPublic
