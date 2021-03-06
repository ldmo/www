/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        var cordovaReady = new CustomEvent("cordovaReady");
        document.dispatchEvent(cordovaReady);
    }
};

app.initialize();

var loginURL = "https://mvs.online/loginTest/index.php";

$(document).on('cordovaReady', function(e){
    ctrl.init();
    $("#login-submit").click(function(e){
        e.preventDefault();
        $.post(loginURL, $('#loginForm').serialize(), function(data){
            console.log($('#loginForm').serialize());
            console.log(data);
            if(data=='1'){
                alert("Logged In");
            }else{
                alert("Wrong User or pass");
            }
        });
    });
});

var ctrl = {
    init: function(){
        console.log('ctrl init');
        $("#menu").mmenu({
            "navbar": {
                "title": '<h4>OnTheDoor</h4>',
                'add': false
            }
        }, {
         offCanvas: {
            pageSelector: "#wrapper"
         }
      });
        view.init();
    },
    giveMeAPage: function(target){
        var link = '';
        if(target=='index'){
            link += 'index.html';
        }
        else{
            link += 'templates/'+target+'.html';
        }
        console.log(link);
        $('content').load(link, function(){
            console.log('page '+link+' should have loaded');
        });  
    }
}
var view = {
    init: function(){
        this.listen();
    },
    listen: function(){
        $('.ajaxHandle').on('click', function(e) {
            e.preventDefault();
            console.log('alright still');
            var target = $(this).attr('data-target');
            location.hash = target;
            ctrl.giveMeAPage(target);
    })
    }
}

    



ctrl.init();








