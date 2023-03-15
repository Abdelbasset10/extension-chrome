chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  let body = document.getElementsByClassName('a3s')[0]
  console.log(body.textContent); // added console.log statement
  let message=0
  let data=''
  if (request.action == "get_email_body") {
    sendResponse({body: body.textContent});
    message=0
  }
  else if (request.action == "reply") {
    
    data=request.data// "Hello from popup!"
    message=1
  }
  if(message === 1){
  console.log("///////////////")
  console.log(data)
  console.log("///////////////")
  let button = document.querySelector('.ams.bkH')

  button.click()
 
  }
});
