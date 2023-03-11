chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  let body = document.getElementsByClassName('a3s')[0]
  console.log(body.textContent); // added console.log statement
  if (request.action == "get_email_body") {
    sendResponse({body: body.textContent});
  }
});