/*
 * Please see the included README.md file for license terms and conditions.
 */


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false, Media:false */



// This file contains your event handlers, the center of your application.
// NOTE: see app.initEvents() in init-app.js for event handler initialization code.

function myEventHandler() {
    "use strict";

    var ua = navigator.userAgent;
    var str;

    if (window.Cordova && dev.isDeviceReady.c_cordova_ready__) {
        str = "It worked! Cordova device ready detected at " + dev.isDeviceReady.c_cordova_ready__ + " milliseconds!";
    } else if (window.intel && intel.xdk && dev.isDeviceReady.d_xdk_ready______) {
        str = "It worked! Intel XDK device ready detected at " + dev.isDeviceReady.d_xdk_ready______ + " milliseconds!";
    } else {
        str = "Bad device ready, or none available because we're running in a browser.";
    }

    console.log(str);
}

function emulator() {
    alert('This app uses a third party Admob plugin. Please build app to test.');
}


// ...additional event handlers here...

function initAdMob() {
    "use strict";
    var fName = "initAdmob():";
    console.log(fName, "entry");
    try {
        if (window.plugins && window.plugins.AdMob) {
            //Login to https://apps.admob.com to get AD-UNIT-ID
            var ad_units = {
                ios: {
                    banner: 'ca-app-pub-3602356900147773/3699410564',
                    interstitial: 'ca-app-pub-3602356900147773/9841198962'
                },
                android: {
                    banner: 'ca-app-pub-3602356900147773/3699410564',
                    interstitial: 'ca-app-pub-3602356900147773/5176143768'
                },
                wp8: {
                    banner: 'ca-app-pub-8394522249550050/5928926928',
                    interstitial: 'ca-app-pub-8394522249550050/7405660121'
                }
            };
            var admobid = "";
            if (/(android)/i.test(navigator.userAgent)) {
                admobid = ad_units.android;
            } else if (/(iphone|ipad)/i.test(navigator.userAgent)) {
                admobid = ad_units.ios;
            } else {
                admobid = ad_units.wp8;
            }
            window.plugins.AdMob.setOptions({
                publisherId: admobid.banner,
                interstitialAdId: admobid.interstitial,
                bannerAtTop: false, // set to true, to put banner at top
                overlap: false, // set to true, to allow banner overlap webview
                offsetTopBar: false, // set to true to avoid ios7 status bar overlap
                isTesting: false, // receiving test ad
                autoShow: true // auto show interstitial ad when loaded
            });
            registerAdEvents();

        } else {
//            alert('This app uses a third party Admob plugin. Please build app to test.');
        }


    } catch (e) {
        console.log(fName, "catch, failure");
    }

    console.log(fName, "exit");
}


function createBanner() {
    "use strict";
    var fName = "createBanner():";
    console.log(fName, "entry");
    try {
        if (window.tinyHippos) {
            emulator();
            console.log(fName, "emulator alert");
        } else {

            window.plugins.AdMob.createBannerView();
        }
    } catch (e) {
        console.log(fName, "catch, failure");
    }

    console.log(fName, "exit");
}

function showBanner() {
    "use strict";
    var fName = "showBanner():";
    console.log(fName, "entry");
    try {
        if (window.tinyHippos) {
            emulator();
            console.log(fName, "emulator alert");
        } else {
            window.plugins.AdMob.showAd(true, function () {}, function (e) {
                alert(JSON.stringify(e));
            });
        }

    } catch (e) {
        console.log(fName, "catch, failure");
    }

    console.log(fName, "exit");
}

function hideBanner() {
    "use strict";
    var fName = "hideBanner():";
    console.log(fName, "entry");
    try {
        if (window.tinyHippos) {
            emulator();
            console.log(fName, "emulator alert");
        } else {
            window.plugins.AdMob.showAd(false);
        }

    } catch (e) {
        console.log(fName, "catch, failure");
    }

    console.log(fName, "exit");
}

function removeBanner() {
    "use strict";
    var fName = "removeBanner():";
    console.log(fName, "entry");
    try {
        if (window.tinyHippos) {
            emulator();
            console.log(fName, "emulator alert");
        } else {
            window.plugins.AdMob.destroyBannerView();
        }
    } catch (e) {
        console.log(fName, "catch, failure");
    }

    console.log(fName, "exit");
}

function createInterstitial() {
    "use strict";
    var fName = "createInterstitial():";
    console.log(fName, "entry");
    try {
        if (window.tinyHippos) {
            emulator();
            console.log(fName, "emulator alert");
        } else {
            window.plugins.AdMob.createInterstitialView();
        }
    } catch (e) {
        console.log(fName, "catch, failure");
    }

    console.log(fName, "exit");
}

function showInterstitial() {
    "use strict";
    var fName = "showInterstitial():";
    console.log(fName, "entry");
    try {
        if (window.tinyHippos) {
            emulator();
            console.log(fName, "emulator alert");
        } else {

            window.plugins.AdMob.showInterstitialAd(true, function () {}, function (e) {
                alert(JSON.stringify(e));
            });
        }
    } catch (e) {
        console.log(fName, "catch, failure");
    }

    console.log(fName, "exit");
}