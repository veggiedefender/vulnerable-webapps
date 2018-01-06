var form = document.getElementById('loginForm');
var input = document.getElementById('password');
var message = document.getElementById('message');

form.onsubmit = function(e) {
  e.preventDefault();
  var password = input.value;
  message.innerHTML = '';
  tryPassword(password, function(success) {
    showSuccess(success);
    input.value = '';
  });
};

function showSuccess(success) {
  var div = document.createElement('div');
  div.innerText = success ? 'WELCOME BACK!' : 'INCORRECT';
  div.classList.add('message');
  div.classList.add(success ? 'success' : 'failure');
  message.appendChild(div);
}

function tryPassword(password, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/login', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ password: password }));
  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE) {
      var success = JSON.parse(xhr.responseText);
      callback(success);
    }
  }
}
