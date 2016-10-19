(function (){
  window.onload = function(){
    var msgbox = document.getElementById("msgs");
    var form = document.getElementById("form");
    var send_msg = document.getElementById("send_msg");
    var ws = new WebSocket('ws://' + window.location.host + "/websocket");

    ws.onopen = function() { 
      console.log("connection opened");
    }
    ws.onclose = function() { 
      console.log("connection closed");
    }
    ws.onmessage = function(m) {
      var li = document.createElement("li");
      li.textContent = m.data;
      msgbox.insertBefore(li, msgbox.firstChild);
    }

    send_msg.onclick = function(){
      send_msg.value = ""; 
    }

    form.onsubmit = function(){
      ws.send(send_msg.value);
      send_msg.value = "";
      return false;
    }
  }
})();
