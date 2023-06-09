
document.addEventListener("DOMContentLoaded", async function() {
  document.getElementById("copy").addEventListener("click",async function(){
   
      let text = document.getElementsByClassName('myText')[0];
      if(text){await navigator.clipboard.writeText(text.textContent);}
      else{await navigator.clipboard.writeText(null);}
      console.log(text.textContent)
      console.log('Content copied to clipboard');
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {action: "reply",data: text.textContent})
      })
      
  })
    document.querySelector("#generate-response").addEventListener("click", async function() {
      
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "get_email_body"}, function(response) {
          document.querySelector("#response").textContent = 'generating...';
            console.log(response)
          var emailBody = response.body;
          var apiKey = "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";
          var apiUrl = "https://api.openai.com/v1/completions";
          var headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiKey
          };
          var inputRequest=document.getElementById('input')
          console.log(inputRequest.value)
          if(inputRequest.value){
            console.log(inputRequest.value != "")
            var data = {
              "prompt": "email:" + emailBody + ". end email," + "can you give me suggestion to respond to the email ," + inputRequest.value +  "\n\nQ:",
              "max_tokens": 300,
              "model":"text-davinci-003",
              "temperature": 0.7,
            };
          }else{
          var data = {
            "prompt": "can you respond to this email for me: " +  emailBody + "\n\nQ:",
            "max_tokens": 300,
            "model":"text-davinci-003",
            "temperature": 0.7,
          };
          }
          fetch(apiUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(data => {
            var responseText = data.choices[0].text.trim();
            document.querySelector("#response").textContent = responseText;
            console.log(data)
          })
          .catch(error => {
            console.error(error);
          });
         
        });
        
      });
      
    });
  });

  
