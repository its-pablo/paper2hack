// ==UserScript==
// @name         paper2hack
// @description  Modding utility/menu for paper.io
// @version      0.1.10
// @author       its-pablo
// @match        https://paper-io.com
// @match        https://paper-io.com/teams/
// @match        https://paperanimals.io
// @match        https://amogus.io
// @require      https://cdn.jsdelivr.net/npm/lil-gui@0.17
// @icon         https://paper-io.com/favicon.ico
// @grant        none
// ==/UserScript==

window.addEventListener('load', function () {
  "use strict";
  window.api = {
      get config(){
          if(location === ("https://paper-io.com/teams/" || "https://paperanimals.io" || "https://amogus.io")){
              return paperio2api.config
          } else {
              return paper2.currentConfig
          }
      },
      get game(){
          if(location === ("https://paper-io.com/teams/" || "https://paperanimals.io" || "https://amogus.io")){
              return paperio2api.game
          } else {
              return paper2.game
          }
      }
  }
  let ETC = {
      "Adblock": false,
      "Reset": function(){gui.reset()},
      "Scroll to zoom": false,
      "Debug": api.game.debug && api.game.debugGraph,
      "Speed": api.config.unitSpeed,
      "Skin (requires refresh)": "",
      "_skins": [],
  }
  shop.btnsData.forEach(i => {
      if(i.useId === Cookies.get('skin')){
          ETC["Skin (requires refresh)"] = i.name
      }
  })
  shop.btnsData.forEach(i => {ETC._skins.push(i.name)})
  function scrollE(e) {
      if (e.deltaY > 0) {
          if (paper2.currentConfig.maxScale > 0.45) {
              paper2.currentConfig.maxScale -= 0.2
          }
      } else if (e.deltaY < 0) {
          if (paper2.currentConfig.maxScale < 4.5) {
              paper2.currentConfig.maxScale += 0.2
          }
      }
  }
  let GUI = lil.GUI
  let gui = new GUI({title: "paper2hack beta v0.1.9"})
  gui.add(ETC, "Speed", 1, 500, 5)
  gui.add(ETC, "Skin (requires refresh)", ETC._skins).onChange(v => {
      let id;
      shop.btnsData.forEach(i => {
          if(i.name === v){
              id = i.useId
          }
      })
      Cookies.set('skin', id)
      location.reload()
  })
  gui.add(ETC, "Adblock").onFinishChange(value => {
      if(value === false){
          for (const element of document.getElementsByTagName("iframe")){
              element.style.display = "block"
          }
      } else {
          for (const element of document.getElementsByTagName("iframe")){
              element.style.display = "hidden"
          }
      }
  })

  gui.add(ETC, "Scroll to zoom").onFinishChange(value => {
      if(value === true){
          window.addEventListener("wheel", scrollE)
      } else {
          window.removeEventListener("wheel", scrollE)
      }
  })
  gui.add(ETC, "Reset")
  /*Last things*/
  gui.load(localStorage.getItem("paper2hack"))
  gui.onFinishChange(e => {
      localStorage.setItem("paper2hack", gui.save())
  })
}, false);
