askIfSurveyStarted()

if(location.href.includes("click.cpx-research.com/?k=")) {
  surveyStarted = true
  chrome.runtime.sendMessage({ message: "surveyStarted", surveyUrl: location.href }, {}, function(response) {
    if(chrome.runtime.lastError) {
    } else {
    }
  });
}

var surveyStarted = false
//Guckt, ob ein Screenshot gemacht werden muss oder ob die Umfrage beendet ist, und die Redirect Daten vom Background Script da sind.
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if(request.message === "surveyStarted") {
        surveyStarted == true
      }

      if(request.message === "surveyStopped") {
        surveyStarted == false
      }

      if(request.message === "screenshot") {
        takeScreenshot()
      }

      return true
});

//Macht ein Screenshot von der Seite mit Html2Canvas
function takeScreenshot() {
  html2canvas(document.body).then(function(canvas) {
    sendScreenshot(canvas.toDataURL(), location.href)
  });
}

function sendScreenshot(screenshot, screenshotUrl) {
  var html = document.documentElement.innerHTML
  chrome.runtime.sendMessage({ message: "screenshotTaken", screenshot: screenshot, screenshotUrl: screenshotUrl, html: html }, {}, function(response) {
    if(chrome.runtime.lastError) {
    } else {
    }
  });
}


function askIfSurveyStarted () {
  chrome.runtime.sendMessage({ message: "hasSurveyStarted" }, {}, function(response) {
    if(response.started) {
      takeScreenshot()
    }
    if(chrome.runtime.lastError) {
    } else {
    }
  });
}
