// ==UserScript==
// @name         paper2hack beta
// @description  Modding utility/menu for paper.io
// @version      0.1.2
// @author       its-pablo
// @match        https://paper-io.com
// @icon         https://paper-io.com/favicon.ico
// @grant        none
// ==/UserScript==

window.addEventListener("load", function () {
    'use strict';
    //setup
    let head = document.getElementsByTagName('head')[0];
    let game = location.url === "https://paper-io.com/teams/" ? paperio2api.game : paper2.game
    let config = location.url === "https://paper-io.com/teams/" ? paperio2api.config : paper2.currentConfig
    let startGame = location.url === "https://paper-io.com/teams/" ? paperio2api.startGame() : game_start()
    let overlayHTML = `
<div id="box">
    <button class="ou" id="accordian">paper2hack v1</button>
    <div class="ou" id="box2">

        <section><label>Scroll to zoom</label><input id="zooming" type="checkbox"></section>
        <section><label>Debug menu</label><input id="debugCtx" type="checkbox"></section>
        <section>
        <p>Skin (hover)</p><div class="dropdown"></div>
        </section>
        <section><label>Speed</label><input id="unitSpeed" type="number"></section>
        <section><label>Arena Size</label><input id="arenaSize" type="number"></section>
        <section><label>Quad Size</label><input id="quadSize" type="number"></section>
        <section><label>Bots count</label><input id="botsCount" type="number"></section>
        <section><label>Change name</label><input id="nameChange" type="text"></section>
        <section><div class="dropdown"><button class="dropbtn" id="buttonUnlock">Unlock all skins</button></section>
        <section><div class="dropdown"><button class="dropbtn" id="button play" onclick="game_start()">Start Game</button></section>
        <section><sub>You can hide the menu with Ctrl+B</sub></section>
     </div>
</div>

<style>
#box {
    z-index: 10;
    position: absolute;
    top: 256px;
    left: 7px;
    overflow: visible;
    }
#box img {
    width: 20%
}
#box2 input {
width: 20%;
cursor: auto;
}
#box2 {
    padding: 10px;
    margin-bottom: 5px;
    display: grid;}
section {
    display: flex;
    justify-content: space-between;margin:5px;}
.ou {
    background-color: #363c3d;
    letter-spacing: 2px;

    font-weight: bold;
    font-size: 13px;
    font-family: 'Open Sans', sans-serif;
    color:white;}
p { text-align: center;border-bottom:1px solid white;}
#ytlink { border:0;}
#ytlink a{ color:lime;}
#accordian {
    width: 100%;
    border:0;}
label { font-weight: bold;}
input {
    margin-top: auto;
    margin-bottom: auto;
    transform: scale(1.3);}
input:hover { cursor: pointer;}
input:focus { box-shadow: 0 0 10px #9ecaed;}
input[type=checkbox] { outline:none;}
input[type=radio] { border-top: auto;}
input[type=color] { width: 50px;}

.dropbtn {
  background-color: #242829;
  color: white;
  font-size: 16px;
  border: none;
  padding: 8px;
}

.dropdown {
  position: relative;
  display: none;
}

.dropdown:hover {
  display: inline-block;
}
</style>
`
    function tog(item) { if (item === true) { item = false } else { item = true } }
    let skins = [
        {
            name: "No skin",
            icon: null,
            id: "skin_00"
        },
        {
            name: "Nyan cat",
            icon: "skin-01-big.png",
            id: "skin_01"
        },
        {
            name: "Watermelon",
            icon: "skin-02-big.png",
            id: "skin_02"
        },
        {
            name: "Pac man ghost",
            icon: "skin-03-big.png",
            id: "skin_03"
        },
        {
            name: "Pizza",
            icon: "skin-04-big.png",
            id: "skin_04"
        },
        {
            name: "Minion",
            icon: "skin-05-big.png",
            id: "skin_05"
        },
        {
            name: "Fred Fazbaer",
            icon: "skin-06-big.png",
            id: "skin_06"
        },
        {
            name: "Spider-man",
            icon: "skin-07-big.png",
            id: "skin_07"
        },
        {
            name: "Teletubby",
            icon: "skin-08-big.png",
            id: "skin_08"
        },
        {
            name: "Unicorn",
            icon: "skin-09-big.png",
            id: "skin_09"
        },
        {
            name: "Rainbow heart",
            icon: "skin-10-big.png",
            id: "skin_10"
        },
        {
            name: "Heart",
            icon: "skin-11-big.png",
            id: "skin_11"
        },
        {
            name: "Bat",
            icon: "bigBat.png",
            id: "skin_12"
        },
        {
            name: "Sushi",
            icon: "bigBat.png",
            id: "skin_13"
        },
        {
            name: "Cash",
            icon: "bigBat.png",
            id: "skin_14"
        },
        {
            name: "Cake",
            icon: "bigBat.png",
            id: "skin_15"
        },
        {
            name: "Pool Floaty",
            icon: "bigBat.png",
            id: "skin_16"
        },
        {
            name: "Tank",
            icon: "bigBat.png",
            id: "skin_17"
        },
        {
            name: "Ladybug",
            icon: "bigBat.png",
            id: "skin_18"
        },
        {
            name: "Cheeseburger",
            icon: "burgerBig.png",
            id: "skin_19"
        },
        {
            name: "Orange",
            icon: "orangeBig.png",
            id: "skin_20"
        },
        {
            name: "Christmas Tree",
            icon: "orangeBig.png",
            id: "skin_21"
        },
        {
            name: "Present",
            icon: "orangeBig.png",
            id: "skin_22"
        },
        {
            name: "Snowman",
            icon: "orangeBig.png",
            id: "skin_23"
        },
        {
            name: "Cupid",
            icon: "cupid_60.png",
            id: "skin_24"
        },
        {
            name: "Thanos",
            icon: "thanos60.png",
            id: "skin_25"
        },
        {
            name: "Captain America",
            icon: "capAmerica.png",
            id: "skin_26"
        },
        {
            name: "Reaper",
            icon: "orangeBig.png",
            id: "skin_27"
        },
        {
            name: "Pennywise",
            icon: "orangeBig.png",
            id: "skin_28"
        },
        {
            name: "Joker",
            icon: "orangeBig.png",
            id: "skin_29"
        },
        {
            name: "Batman",
            icon: "orangeBig.png",
            id: "skin_30"
        },
        {
            name: "Geralt",
            icon: "orangeBig.png",
            id: "skin_35"
        },
        {
            name: "Covid-19",
            icon: "orangeBig.png",
            id: "skin_36"
        },
        {
            name: "Doctor",
            icon: "orangeBig.png",
            id: "skin_37"
        },
        {
            name: "Sanitizer",
            icon: "orangeBig.png",
            id: "skin_38"
        },
        {
            name: "Stay Safe Mask",
            icon: "mask60.png",
            id: "skin_39"
        },
        {
            name: "Cyberpunk",
            icon: "orangeBig.png",
            id: "skin_40"
        },
        {
            name: "Chess Piece",
            icon: "orangeBig.png",
            id: "skin_41"
        },
        {
            name: "Yoda",
            icon: "orangeBig.png",
            id: "skin_42"
        },
    ]
    skins.forEach(function(stuff, i){
        let drpdwn = document.getElementsByClassName("dropdown")[0];
        let el = document.createElement("p")
        el.innerHTML += `<img src="/newpaperio/images/${stuff.icon}"><br />${stuff.name}`
        drpdwn.appendChild(el)
        skins[i].element = el;
    })

    // Setting up the html div
    let overlay = document.createElement("div");
    overlay.innerHTML = overlayHTML;
    document.body.appendChild(overlay);
    //$('#box').draggable()

    //Hide/show menu with keyboard shortcut for streamers
    document.onkeydown = function (e) {
        if (e.ctrlKey && e.which == 66) {
            if (document.getElementById("box").style.display == "none") {
                document.getElementById("box").style.display = "block"
            } else {
                document.getElementById("box").style.display = "none"
            }
        }
    };

    document.getElementById("debugCtx").addEventListener("input", function (e) {
        if (document.getElementById("debugCtx").checked) {
            paper2.game.debug = false;
            paper2.game.debugGraph = false;
        } else {
            paper2.game.debug = true;
            paper2.game.debugGraph = true;
        }
    })

    document.getElementById("buttonUnlock").addEventListener("click", function (e) {
        paperio_challenges.greenGoblin = true;
        paperio_challenges.doctorquest = true;
        paperio_challenges.matrix = true;
        paperio_challenges.impostor = true;
        paperio_challenges.c1 = true;
        paperio_challenges.doge = true;
        paperio_challenges.c27 = true; //pennywise
        paperio_challenges.kill300 = true; //joker
        paperio_challenges.kill50 = true; //reaper
        this.remove()
    })
    //Zooming in or out function
    window.addEventListener('wheel', function (event) {
        if (event.deltaY > 0) {
            if (window.paper2.configs.paper2_classic.maxScale > 0.45) {
                window.paper2.configs.paper2_classic.maxScale -= 0.2;
            }
        } else if (event.deltaY < 0) {
            if (window.paper2.configs.paper2_classic.maxScale < 4.5) {
                window.paper2.configs.paper2_classic.maxScale += 0.2;
            }
        }
    });
    function randInt(min, max) {return Math.floor(Math.random() * (max - min + 1) + min)}

    document.getElementById("unitSpeed").value = paper2.configs.paper2_classic.unitSpeed;
    document.getElementById("arenaSize").value = paper2.configs.paper2_classic.arenaSize;
    document.getElementById("quadSize").value = paper2.configs.paper2_classic.quadSize;
    document.getElementById("botsCount").value = paper2.configs.paper2_classic.botsCount;
    document.getElementById("box").addEventListener("input", function () {
        paper2.configs.paper2_classic.unitSpeed = document.getElementById("unitSpeed").value;
        paper2.configs.paper2_classic.arenaSize = document.getElementById("arenaSize").value;
        paper2.configs.paper2_classic.quadSize = document.getElementById("quadSize").value;
        paper2.configs.paper2_classic.botsCount = document.getElementById("botsCount").value;
        paper2.game.units.forEach(function(item){item.name = document.getElementById("nameChange").value})
    })

});
