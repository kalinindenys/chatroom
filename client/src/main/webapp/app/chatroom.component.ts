import {Component}              from 'angular2/core';

@Component({
  selector: 'chatroom',
  template: `
    <div class="container">
        <div id="header" class="page-header">
            <h1>Chatroom</h1>
            <p>Welcome to chatroom!</p>
        </div>

        <div id="content">
            <button id="signIn" class="btn btn-default">Sign in</button>
            <button id="signUp" class="btn btn-default">Sign up</button>
        </div>

    </div>
  `
})

export class ChatroomComponent {
  
}