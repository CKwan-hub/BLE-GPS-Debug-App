/* @jsx m */
import m from 'mithril';
import { Title } from '../components/items/title';
import { Screen } from '../components/objects/screen';
import { Panel } from '../components/objects/panel';
import { Dropdown } from '../components/items/dropdown';
import { Button } from '../components/items/button';
import { Input } from '../components/items/input';

export const Main = () => {
  let titleString = 'Beacon Debug App';
  let screenInfo = '';
  let panel1Content = '';
  let panel2Content = '';

  return {
    oninit: (vnode) => {
      screenInfo = (
        <div>
          <p id="message">Preparing...</p>
          <div>
            <b>Beacon List:</b>
          </div>
          <div id="found-beacons"></div>

          <div id="debug">
            <b>Debug List:</b>
          </div>
          <div id="1"></div>
          <div id="2"></div>
          <div id="3"></div>
          <div id="4"></div>
          <div id="5"></div>
          <div id="6">
            Distance Approx is in Feet <br /> Have had poor performance with
            BlueCharm{' '}
          </div>
          <div id="7">
            Calc is built w/ evothings.eddystone.calculateAccuracy()
          </div>
          <div id="8">Tune by +/- from param txPower - Set to "4" (4dBm)</div>
          <div id="9">
            41dBm is signal loss occuring over 1m, value subbed from txPower
          </div>
        </div>
      );
      panel1Content = (
        <div>
          {m(Dropdown, {})}
          {m(Input, {})}
          {m(Button, {})}
        </div>
      );
      panel2Content = <div>Save options and write functions here</div>;

      (function () {
        // Dictionary of beacons.
        var beacons = {};

        // evothings.scriptsLoaded()

        // Timer that displays list of beacons.
        var timer = null;

        function onDeviceReady() {
          // Start tracking beacons!
          setTimeout(startScan, 500);

          // Timer that refreshes the display.
          timer = setInterval(updateBeaconList, 500);
        }

        function onBackButtonDown() {
          document.getElementById('1').innerHTML = 'SCAN STOPPED';
          evothings.eddystone.stopScan();
          navigator.app.exitApp();
        }

        function startScan() {
          showMessage('Scan in progress.');
          evothings.ble.startScan(
            function (beacon) {
              // Update beacon data.
              beacon.timeStamp = Date.now();
              beacons[beacon.address] = beacon;
            },
            function (error) {
              showMessage('Eddystone scan error: ' + error);
            }
          );
        }

        // Map the RSSI value to a value between 1 and 100.
        function mapBeaconRSSI(rssi) {
          if (rssi >= 0) return 1; // Unknown RSSI maps to 1.
          if (rssi < -100) return 100; // Max RSSI
          return 100 + rssi;
        }

        function getSortedBeaconList(beacons) {
          var beaconList = [];
          for (var key in beacons) {
            beaconList.push(beacons[key]);
          }
          beaconList.sort(function (beacon1, beacon2) {
            return mapBeaconRSSI(beacon1.rssi) < mapBeaconRSSI(beacon2.rssi);
          });
          return beaconList;
        }

        function updateBeaconList() {
          removeOldBeacons();
          displayBeacons();
        }

        function removeOldBeacons() {
          var timeNow = Date.now();
          for (var key in beacons) {
            // Only show beacons updated during the last 60 seconds.
            var beacon = beacons[key];
            if (beacon.timeStamp + 60000 < timeNow) {
              delete beacons[key];
            }
          }
        }

        function displayBeacons() {
          document.getElementById('1').innerHTML = '1 in "displayBeacons()"';
          var html = '';
          var sortedList = getSortedBeaconList(beacons);
          for (var i = 0; i < sortedList.length; ++i) {
            var beacon = sortedList[i];
            var htmlBeacon =
              '<p>' +
              htmlBeaconName(beacon) +
              // +	htmlBeaconURL(beacon)
              // +	htmlBeaconNID(beacon)
              // +	htmlBeaconBID(beacon)
              // +	htmlBeaconEID(beacon)
              // +	htmlBeaconVoltage(beacon)
              // +	htmlBeaconTemperature(beacon)
              htmlBeaconProx(beacon) +
              htmlBeaconRSSI(beacon) +
              '</p>';
            html += htmlBeacon;
          }
          document.querySelector('#found-beacons').innerHTML = html;
        }

        function htmlBeaconName(beacon) {
          document.getElementById('2').innerHTML =
            'beaconName() firing' + beacon.name;
          var name = beacon.name || 'no name';
          return '<strong>' + name + '</strong><br/>';
        }

        function htmlBeaconVoltage(beacon) {
          document.getElementById('3').innerHTML =
            'beaconVoltage() firing' + beacon.voltage;
          return beacon.voltage ? 'Voltage: ' + beacon.voltage + '<br/>' : '';
        }

        function htmlBeaconTemperature(beacon) {
          document.getElementById('4').innerHTML =
            'beaconTemp() firing' + beacon.temperature;
          return beacon.temperature && beacon.temperature != 0x8000
            ? 'Temperature: ' + beacon.temperature + '<br/>'
            : '';
        }

        function htmlBeaconRSSI(beacon) {
          return beacon.rssi ? 'RSSI: ' + beacon.rssi + '<br/>' : '';
        }

        function htmlBeaconProx(beacon) {
          var distance = evothings.eddystone.calculateAccuracy(4, beacon.rssi);
          var distFeet = distance * 3.28084;
          return 'Distance (Ft): ' + distFeet + '<br/>';
        }

        function uint8ArrayToString(uint8Array) {
          function format(x) {
            var hex = x.toString(16);
            return hex.length < 2 ? '0' + hex : hex;
          }

          var result = '';
          for (var i = 0; i < uint8Array.length; ++i) {
            result += format(uint8Array[i]) + ' ';
          }
          return result;
        }

        function showMessage(text) {
          document.querySelector('#message').innerHTML = text;
        }

        // This calls onDeviceReady when Cordova has loaded everything.
        document.addEventListener('deviceready', onDeviceReady, false);

        // Add back button listener (for Android).
        document.addEventListener('backbutton', onBackButtonDown, false);
      })();

      // TODO: Bind this to button
      //   var app = {
      //     // Application Constructor
      //     initialize: function () {
      //       document.addEventListener(
      //         'deviceready',
      //         this.onDeviceReady.bind(this),
      //         false
      //       );
      //     },

      //     // deviceready Event Handler
      //     //
      //     // Bind any cordova events here. Common events are:
      //     // 'pause', 'resume', etc.
      //     onDeviceReady: function () {
      //       this.receivedEvent('deviceready');
      //     },

      //     // Update DOM on a Received Event
      //     receivedEvent: function (id) {
      //       var parentElement = document.getElementById(id);
      //       var listeningElement = parentElement.querySelector('.listening');
      //       var receivedElement = parentElement.querySelector('.received');

      //       listeningElement.setAttribute('style', 'display:none;');
      //       receivedElement.setAttribute('style', 'display:block;');

      //       console.log('Received Event: ' + id);
      //     },
      //   };

      //   app.initialize();
    },
    view: (vnode) => {
      return (
        <div class="container">
          {m(Title, { info: titleString })}
          {m(Screen, {
            class: 'screen-parent',
            id: 'screen-parent',
            contentClass: 'screen-content',
            contentID: 'screen-content',
            content: screenInfo,
          })}
          <div class="panel-container">
            {m(Panel, {
              class: 'panel1-parent',
              id: 'panel1-parent',
              parentClass: 'panel1-content',
              parentID: 'panel1-content',
              content: panel1Content,
            })}
            {m(Panel, {
              class: 'panel2-parent',
              id: 'panel2-parent',
              parentClass: 'panel2-content',
              parentID: 'panel2-content',
              content: panel2Content,
            })}
          </div>
        </div>
      );
    },
  };
};
