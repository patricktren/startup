import React from 'react';

import '../css/main.css';

export function Index(props) {
  return (
      <main class="main-login">
        <section>
            <h3>Username (Email):</h3>
            <input class="input-txt" type="text" name="" id=""/>
            <p></p>
            <h3>Password:</h3>
            <input class="input-txt" type="text" name="" id=""/>
            <p></p>
            <button class="btn btn-green">Login</button>
            <button class="btn btn-green">Create</button>
        </section>
        <section>
            <img src="gpt-notes-example.PNG" alt="gpt-notes-example" width="500" class="img-hero"/>
        </section>
    </main>
  );
}
