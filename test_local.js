// ==UserScript==
// @name         ShadowBootstrap
// @namespace    http://tampermonkey.net/
// @author       poma23324
// @version      0.0.1
// @icon         https://www.google.com/s2/favicons?sz=64&domain=getbootstrap.com
// @description  Set of examples for ShadowBootstrap
// @match        *://*/*
// @run-at context-menu
// @grant        none
// ==/UserScript==


// biome-ignore lint/complexity/useArrowFunction: <explanation>
(async function () {
  "use strict";

  await ShadowBootstrap.init();

  ShadowBootstrap.add(new CenteredWindow().hide());
  ShadowBootstrap.add(new FloatingButton());
  const rButton = new RightSideMovableButton();
  rButton.onclick(() => {
    const popup = new SBPopUp("Finished");
    ShadowBootstrap.add(popup);
    popup.show();
  });
  ShadowBootstrap.add(rButton);

  console.log(ShadowBootstrap.get(FloatingButton).rootEl);
})();
