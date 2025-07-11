
let container=document.querySelector(".container");
let prompt=document.querySelector("#prompt");
let btn=document.querySelector("#btn")
let chatContainer=document.querySelector(".chat-container")
let userMessage=null;

let Api_Url=`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCXuC7Xtox_6IHlHvdIJFsGZqDNHQcLNlc`

function createChatBox(html,className){
 let div=document.createElement("div")
 div.classList.add(className)
 div.innerHTML=html
 return div
}
async function getApiResponse(aiChatBox){
  let textElement=aiChatBox.querySelector(".text")
try {
  let response= await fetch(Api_Url,{
    method:"POST",
    headers:{"Content-Type": "application/json"},
    body:JSON.stringify({
      contents:[
        {
          "role":"user",
          "parts":[{text:userMessage}]
        }
      ]
    })
  })
  let data=await response.json();
 let apiResponse=data?.candidates[0].content.parts[0].text;
textElement.innerText=apiResponse
} catch (error) {
  console.log(error)
}finally{
  aiChatBox.querySelector(".loading").style.display="none"
}
}
function showLoading(){
  let html=`<div class="img">
          <img src="chatbot.webp" alt="robot" width="50" />
        </div>
        <p class="text">
         
        </p>
        <img  class="loading" src="loading.webp" alt="loading" height="50">`
         let aiChatBox=createChatBox(html,"ai-chat-box")
         chatContainer.appendChild(aiChatBox)
         getApiResponse(aiChatBox);
      
        
}

btn.addEventListener("click",()=>{
  userMessage=prompt.value.trim();
  if(userMessage==""){
    container.style.display="flex"
  }else{
       container.style.display="none"
  }
  if(!userMessage)return;

  let html=` <div class="img">
          <img src="person.jpg" alt="user" width="50" />
        </div>
        <p class="text"></p>`;
      let userChatBox=createChatBox(html,"user-chat-box")
      userChatBox.querySelector(".text").innerText=userMessage;
      chatContainer.appendChild(userChatBox)
      prompt.value=""
      setTimeout(showLoading,500)
      
})