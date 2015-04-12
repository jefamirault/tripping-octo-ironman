/**
 * Copyright 2014 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*global $:false */

'use strict';

$(document).ready(function() {

  // Only works on Chrome
  if (!$('body').hasClass('chrome')) {
    $('.unsupported-overlay').show();
  }

  // UI
  var micButton = $('.micButton'),
    micText = $('.micText'),
    transcript = $('#text'),
    errorMsg = $('.errorMsg');

  // Service
  var recording = false,
    speech = new SpeechRecognizer({
      ws: 'http://commandr.mybluemix.net/',
      model: 'WatsonModel'
    });
  speech.start();

  speech.onstart = function() {
    console.log('demo.onstart()');
    recording = true;
    micButton.addClass('recording');
    micText.text('Press again when finished');
    errorMsg.hide();
    transcript.show();

    // Clean the paragraphs
    transcript.empty();
    $('<p></p>').appendTo(transcript);
  };

  speech.onerror = function(error) {
    console.log('demo.onerror():', error);
    recording = false;
    micButton.removeClass('recording');
    displayError(error);
  };

  speech.onend = function() {
    console.log('demo.onend()');
    recording = false;
    micButton.removeClass('recording');
    micText.text('Press to start speaking');
  };

  speech.onresult = function(data) {
    //console.log('demo.onresult()');
    showResult(data);
  };

  var parseMatched = false;

  function showResult(data) {
    // console.log(data);
    //if there are transcripts
    if (data.results && data.results.length > 0) {

      //if is a partial transcripts
      if (data.results.length === 1 ) {
        var paragraph = transcript.children().last(),
          text = data.results[0].alternatives[0].transcript || '';
          text = text.trim();
          $('.commander-spoken').text(text); 
          Commandr.alertUberListeners(text);
          if(data.results[0].final) {
            Commandr.alertFinalListeners(text);
          }
          if(!parseMatched && Commandr.parse(text)){
            parseMatched = true;
          } else if(data.results[0].final){
            parseMatched = false;
          }
      }
    }
    transcript.show();
  }

  function displayError(error) {
    var message = error;
    try {
      var errorJson = JSON.parse(error);
      message = JSON.stringify(errorJson, null, 2);
    } catch (e) {
      message = error;
    }

    errorMsg.text(message);
    errorMsg.show();
    transcript.hide();
  }

  function _error(xhr) {
    $('.loading').hide();
    displayError('Error processing the request, please try again.');
  }

  function transcriptAudio(audio) {
    $('.loading').show();
    $('.error').hide();
    transcript.hide();
    $('.url-input').val(audio);
    $('.upload-form').hide();
    // Grab all form data
    $.ajax({
      url: 'http://commandr.mybluemix.net/',
      type: 'POST',
      data: $('.upload-form').serialize(),
      success: showAudioResult,
      error: _error
    });
  }

});
