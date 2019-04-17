/*
 * This is the backend for a Telegram bot that helps to power up and down GCP VM using Compute API.
 * First register a bot with Telegram bot father, take note of the bot token.
 * Next use webhook to make Telegram bot forward all messages to this Cloud Function endpoint.
 * Use this backend script to trigger the necessary actions and respond to the bot.
 */

const request = require('request-promise-native');
const Compute = require('@google-cloud/compute');
const compute = Compute();

const zone = compute.zone("asia-southeast1-a");
const vm = zone.vm("vnc-server");

const token = "<fill in you telegram bot token>";
const master_id = "<fill in your own chat id>";
var bot_msg = "Thank you for your message. Sorry you do not have sufficient permission to use this bot. Please contact my master.";

function create_resp(msg, id) {
  return {
    uri: `https://api.telegram.org/bot${token}/sendMessage`,
    json: true,
    body: {text: msg, chat_id: id}
  }
}

exports.gcpRemoteControl = function gcpRemoteControl(req, res) {
  
  var {message:{chat, text}} = req.body;
  console.log(chat);
  console.log(text);
  
  // check request authorised
  if (chat.id == master_id) {
    
    // start vnc server
    if (text.toLowerCase() == "/on") {
      vm.start(function(err, operation, apiResponse) {
        if ("status" in apiResponse) {
          request.post( create_resp(apiResponse.status, master_id) );
        }
      });
      bot_msg = "VNC server powering up ...";
    
    // stop vnc server
    } else if (text.toLowerCase() == "/off") {
      vm.stop(function(err, operation, apiResponse) {
        if ("status" in apiResponse) {
          request.post( create_resp(apiResponse.status, master_id) );
        }
      });
      bot_msg = "VNC server powering down ...";
    
    // check vnc server status
    } else if (text.toLowerCase() == "/status") {
      vm.get(function(err, vm, apiResponse) {
        if ("status" in apiResponse) {
          request.post( create_resp(apiResponse.status, master_id) );
        }
      });
      bot_msg = "VNC Status ...";

    // any other message response
    } else {
      bot_msg = "Sorry master, I did not understand your command. Please try again";
    }
  
  // unauthorised messages
  } else {
    var spy_msg = "ID: " + chat.id + " '" + chat.username + "' " + chat.first_name + " messaged your humble servant: '" + text + "'"
    request.post( create_resp(spy_msg, master_id) );
  }
  
  // default response
  res.send( 
    request.post( create_resp(bot_msg, chat.id) )
  );
};
