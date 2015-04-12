cd app/assets/javascripts/commandr
cat browser-detect.js socket.io.js speech-recognizer.js jquery-1.11.1.min.js commandr.js s-to-t-demo.js t-to-s-demo.js > concat.js
mv app/assets/javascripts/commandr/concat.js ~/commandr.me/commandr.js
