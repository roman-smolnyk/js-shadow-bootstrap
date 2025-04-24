// ==UserScript==
// @name         ShadowBootstrap
// @namespace    http://tampermonkey.net/
// @author       poma23324
// @version      0.0.1
// @icon         https://www.google.com/s2/favicons?sz=64&domain=getbootstrap.com
// @description  Set of examples for ShadowBootstrap
// @require      https://cdn.jsdelivr.net/gh/roman-smolnyk/js-shadow-bootstrap@v0.0.1/shadow-bootstrap.js
// @match        *://*/*
// @grant        none
// ==/UserScript==



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
            <button class="settings-close-btn btn btn-sm btn-light rounded-circle" type="button">
              <i class="bi bi-x"></i>
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
    if (hide === true) {
      this.hide();
    }

    this.addEventListeners();
  }

  addEventListeners = () => {
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
  };
}

class FloatingButton extends SBWin {
  constructor(hide = false) {
    const htmlString = `
      <div class="floating-button-container position-fixed bottom-0 end-0" style="pointer-events: auto">
        <button class="floating-button-btn btn btn-primary rounded-circle m-3 z-3 w-3 h-3" style="width: 60px; height: 60px; font-size: 24px">
          <i class="bi bi-plus-lg"></i>
        </button>
      </div>
    `;
    super(htmlString);
    if (hide === true) {
      this.hide();
    }

    this.addEventListeners();
  }

  addEventListeners = () => {
    this.getEl(".floating-button-btn").addEventListener("click", async (e) => {
      console.log("click");
      e.preventDefault();
      e.stopPropagation();

      document.body.style.backgroundColor = "lightblue";
    });
  };
}

(async function () {
  "use strict";

  const shadowContainer = await ShadowBootstrap.init();

  shadowContainer.append(new CenteredWindow().rootEl);
  shadowContainer.append(new FloatingButton().rootEl);
  console.log(SBWin.get(FloatingButton).rootEl);
})();
