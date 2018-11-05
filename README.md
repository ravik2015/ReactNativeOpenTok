# ReactNativeOpenTok


Requirements:
react-native >=0.49.3
Supported OpenTok SDK version:

OpenTok SDK 2.13.+
Table of contents
Installation
API Reference
Components
Usage
Installation
React native OpenTok SDK depends on native OpenTok SDK implementations. You need to integrate OpenTok SDK into your existing application. Following steps needs to be done in order to have library working correctly:

Get your API_KEY by creating developer account on https://tokbox.com/developer/

Add library using yarn 📦 (or npm):

yarn add react-native-opentok
iOS
Install CocoaPods on your computer.
Within you application ios/ directory please run pod init.
Replace content within your brand-new Podfile with:
source 'https://github.com/CocoaPods/Specs.git'

platform :ios, '9.0'

target '<YOUR_PROJECT_NAME>' do
  node_modules_path = '../node_modules'

  pod 'yoga', path: "#{node_modules_path}/react-native/ReactCommon/yoga/yoga.podspec"
  pod 'React', path: "#{node_modules_path}/react-native"

  pod 'RNOpenTok', path: "#{node_modules_path}/react-native-opentok/ios"
end

post_install do |installer|
  installer.pods_project.targets.each do |target|
    if target.name == "React"
      target.remove_from_project
    end
  end
end
Run pod install.
Open <YOUR_PROJECT_NAME>.xcworkspace file (you'll need to use it as a starting file from now on).
Add OPENTOK_API_KEY key to your Info.plist:
<key>OPENTOK_API_KEY</key>
<string>YOUR_API_KEY</string>
<key>NSCameraUsageDescription</key>
<string>${PRODUCT_NAME} Camera Usage</string>
<key>NSMicrophoneUsageDescription</key>
<string>${PRODUCT_NAME} Microphone Usage</string>
Run the project 🎉.
Android
Run react-native link.
Edit your android/build.gradle file and update allprojects section:
allprojects {
    repositories {
        ...
        // -------------------------------------------------
        // Add this below the existing maven property above
        // -------------------------------------------------
        maven {
            url "http://tokbox.bintray.com/maven"
        }
    }
}
Add OPENTOK_API_KEY to your AndroidManifest.xml(within <application> tag):
<meta-data android:name="OPENTOK_API_KEY" android:value="YOUR_OPENTOK_API_KEY" />
Run the project 🎉.
API Reference
setApiKey(apiKey: string): void
Override Api key.

OpenTok.setApiKey('YOUR_API_KEY');
connect(sessionId: string, token: string): Promise<boolean | Error>
Connects to choosen session.

const connectToSession = async () => {
  try {
    await OpenTok.connect('YOUR_SESSION_ID', 'YOUR_TOKEN');
  } catch (e) {
    console.log(e)
  }
}
disconnect(sessionId: string): void
Disconnects from chosen session.

OpenTok.disconnect('YOUR_SESSION_ID');
disconnectAll(): void
Disconnects all available sessions.

OpenTok.disconnectAll();
sendSignal(sessionId: string, type: string, message: string): Promise<boolean | Error>
Send signal to chosen session.

const connectToSession = async () => {
  try {
    await OpenTok.connect('YOUR_SESSION_ID', 'YOUR_TOKEN');
  } catch (e) {
    console.log(e)
  }
}
events
Constants for events thrown in app. Available values:

ON_SIGNAL_RECEIVED
ON_SESSION_CONNECTION_CREATED
ON_SESSION_CONNECTION_DESTROYED
ON_SESSION_DID_CONNECT
ON_SESSION_DID_DISCONNECT
ON_SESSION_DID_FAIL_WITH_ERROR
ON_SESSION_STREAM_CREATED
ON_SESSION_STREAM_DESTROYED
ERROR_NO_SCREEN_CAPTURE_VIEW
ON_ARCHIVE_STARTED_WITH_ID
ON_ARCHIVE_STOPPED_WITH_ID
ON_SESSION_DID_BEGIN_RECONNECTING
ON_SESSION_DID_RECONNECT
on(name: string, callback: Function)
Event listener, for events listed above.

OpenTok.on(OpenTok.events.ON_SIGNAL_RECEIVED, e => console.log(e));
removeListener(name: string): void
Removes listener.

OpenTok.removeListener(OpenTok.events.ON_SIGNAL_RECEIVED);
Components
Publisher
Component used for publishing the video to the stream.

Available props:

sessionId: string - ID of the session (you need to connect it before using this component).
onPublishStart?: Function - Invoked when publishing starts. Optional.
onPublishStop?: () => void - Invoked when publishing stops. Optional.
onPublishError?: () => void - Invoked when publish error occurs. Optional.
mute?: boolean - This props tells Publisher if should publish audio as well or not. Optional. Defaults to false.
video?: boolean - This props tells Publisher if should publish video as well or not. Optional. Defaults to true.
videoScale?: string - Whether the video should scale to fill the frame or fit into the frame.
zOrderMediaOverlay?: boolean - On android, calls SurfaceView.setZOrderMediaOverlay. Optional. Defaults to true.
cameraDirection?: string - Whether the camera should face front (towards screen) or back (away from screen).
screenCapture?: boolean - Stream screen if true instead of camera.
screenCaptureSettings?: { fps?: number } - Screen sharing settings.
fps?: number - Specify frames per second for a stream (default: 15).
every View property.
Available methods:

switchCamera(): switches to the next camera. Goes back to first one when out of cameras. Calling this will overwrite cameraDirection.
import { Publisher } from 'react-native-opentok'
<Publisher
  style={{ height: 100, width: 200 }}
  sessionId={sessionId}
  onPublishStart={() => { console.log('started')}}
/>
Subscriber
Component used for subscribing to the stream.

Available props:

sessionId: string - ID of the session (you need to connect it before using this component).
onSubscribeStart?: Function - Invoked when stream starts. Optional.
onSubscribeStop?: () => void - Invoked when stream stops. Optional.
onSubscribeError?: () => void - Invoked when subscribing error occurs. Optional.
mute?: boolean - This props tells Subscriber if should subscribe audio as well or not. Optional. Defaults to false.
video?: boolean - This props tells Subscriber if should subscribe video as well or not. Optional. Defaults to true.
videoScale?: string - Whether the video should scale to fill the frame or fit into the frame.
zOrderMediaOverlay?: boolean - On android, calls SurfaceView.setZOrderMediaOverlay. Optional. Defaults to true.
every View property.
import { Subscriber } from 'react-native-opentok'

<Subscriber
  style={{ height: 100, width: 200 }}
  sessionId={sessionId}
  onSubscribeStart={() => { console.log('started')}}
/>
ScreenCapture
Component used for capturing a stream of it's children for screen sharing.

Everything inside this component will be streamed as long as <Publisher> has screenCapture prop set to true.

Available props:

every View property except nativeID.
import { Publisher, ScreenCapture } from 'react-native-opentok';

<ScreenCapture>
  {/* some children */}
</ScreenCapture>
<Publisher screenCapture>
Usage
Simply import the library and use methods/components listed above.

import OpenTok from 'react-native-opentok';
