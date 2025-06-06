// ==UserScript==
// @name         ShadowBootstrap
// @namespace    http://tampermonkey.net/
// @author       poma23324
// @version      0.0.3
// @icon         https://www.google.com/s2/favicons?sz=64&domain=getbootstrap.com
// @description  Set of examples for ShadowBootstrap
// @require      https://cdn.jsdelivr.net/gh/roman-smolnyk/js-shadow-bootstrap@v0.1.3/shadow-bootstrap.js
// @require      https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js
// @match        *://*/*
// @run-at context-menu
// @grant        none
// ==/UserScript==

function missing(name) {
  throw new Error(`Missing: ${name}`);
}

class CenteredWindow extends SBWin {
  constructor(hide = false) {
    const htmlString = `
      <div
        class="settings-container d-flex justify-content-center align-items-center vw-100 vh-100"
        style="pointer-events: none"
      >
        <div class="settings card shadow" style="pointer-events: auto">
          <div class="card-header p-0 ps-2 d-flex justify-content-between align-items-center">
            <span>Settings</span>
            <button class="settings-close-btn btn btn-sm btn-light rounded" type="button">
              <!-- <i class="bi bi-x"></i> -->
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg>
            </button>
          </div>
          <div class="card-body px-4">
            <form>
              <div class="mb-3">
                <label class="form-label" for="settingsEmail">Email address</label>
                <input id="settingsEmail" class="form-control" type="email" name="email" placeholder="Enter email" />
              </div>
              <div class="mb-3">
                <label class="form-label" for="settingsPassword">Password</label>
                <input id="settingsPassword" class="form-control" type="password" name="password" placeholder="Password" />
              </div>
              <div class="d-flex justify-content-end">
                <button class="btn btn-primary" type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
    super(htmlString);
  }

  async init() {
    this.getEl("form").addEventListener("submit", async (e) => {
      console.log("submit");
      e.preventDefault();
      e.stopPropagation();

      const formData = new FormData(e.target); // 'event.target' refers to the form element

      // Iterate over the form data
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
    });

    this.getEl(".settings-close-btn").addEventListener("click", async () => {
      console.log("close");
      this.hide();
    });
  }
}

class FloatingButton extends SBWin {
  constructor(hide = false) {
    const htmlString = `
      <div class="floating-button-container position-fixed bottom-0 end-0" style="pointer-events: auto">
        <button class="floating-button-btn btn btn-primary rounded-circle m-3 z-3 w-3 h-3" style="width: 60px; height: 60px; font-size: 24px">
          <!-- <i class="bi bi-plus-lg"></i> -->
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
</svg>
        </button>
      </div>
    `;
    super(htmlString);
  }

  async init() {
    this.getEl(".floating-button-btn").addEventListener("click", async (e) => {
      console.log("click");
      e.preventDefault();
      e.stopPropagation();

      // document.body.style.backgroundColor = "lightblue";
      ShadowBootstrap.get(CenteredWindow).show();
    });
  }
}

// biome-ignore lint/complexity/useArrowFunction: <explanation>
(async function () {
  "use strict";

  await ShadowBootstrap.init();

  ShadowBootstrap.add(new CenteredWindow().hide());
  ShadowBootstrap.add(new FloatingButton());
  ShadowBootstrap.add(new RightSideMovableButton());

  console.log(ShadowBootstrap.get(FloatingButton).rootEl);
})();
