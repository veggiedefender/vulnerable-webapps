$(document).ready(function() {
  var socket = new WebSocket('ws://' + location.host);

  // cache these selectors
  var messages = $('#messages');
  var text = $('#text');
  var number = $('#number');

  socket.onmessage = function(event) {
    var data = JSON.parse(event.data);
    switch (data.type) {
      case 'message':
        messages.append(html(data));
        window.scrollTo(0,document.body.scrollHeight);
        break;
      case 'online':
        number.text(data.number);
        break;
    }
  }

  function heartbeat() {
    socket.send(JSON.stringify({ type: 'heartbeat' }));
  }

  socket.onopen = function() {
    setInterval(heartbeat, 10 * 1000);
    heartbeat();
  }

  function html(data) {
    return `
      <p class="message">
        <span class="name">${data.name}: </span>
        <span class="text">
          ${data.message}
        </span>
        <span class="time">${formatTime(data.timestamp)}</span>
      </p>
    `;
  }

  function formatTime(timestamp) {
    var date = new Date(timestamp);
    var hour = date.getHours() % 12;
    var minute = ('0' + date.getMinutes()).slice(-2);
    return `${hour}:${minute}`;
  }

  $(document).keypress(function(e) {
    if(e.which == 13) {
      send();
      e.preventDefault();
    }
  });
  $('#send').click(function() {
    send();
  });

  function send() {
    var message = text.val().trim();
    if (message) {
      socket.send(JSON.stringify({
        type: 'message',
        name: 'anon',
        message: message
      }));
      text.val('');
      text.focus();
    }
  }
});
