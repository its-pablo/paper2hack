// ==UserScript==
// @name         paper2hack
// @description  Modding utility/menu for paper.io
// @version      0.1.2
// @author       its-pablo
// @match        https://paper-io.com/
// @icon         https://paper-io.com/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    let head = document.getElementsByTagName('head')[0];
    let ui = document.createElement('script')
    ui.setAttribute('src', '//code.jquery.com/ui/1.13.1/jquery-ui.js')
    //head.appendChild(ui)
    let overlayHTML = `
<div id="box">
    <button class="ou" id="accordian">paper2hack v1</button>
    <div class="ou" id="box2">

        <section><label>Scroll to zoom</label><input id="zooming" type="checkbox"></section>
        <section><label>Debug menu</label><input id="debugCtx" type="checkbox"></section>
        <section>
        <div class="dropdown"><p>Skin (hover)</p>
          <div class="dropdown-content"><p id="skinbtn1">No Skin</p><p id="skinbtn2"><img src="https://paper-io.com/newpaperio/images/skin-01-big.png"><br>Nyan Cat</p><p id="skinbtn3"><img src="https://paper-io.com/newpaperio/images/skin-02-big.png"><br>Watermelon</p><p id="skinbtn4">Pac Man Ghost</p><p id="skinbtn5"><img src="https://paper-io.com/newpaperio/images/skin-04-big.png" /><br />Pizza</p><p id="skinbtn6"><img src="https://paper-io.com/newpaperio/images/skin-05-big.png" /><br />Minion</p><p id="skinbtn7">Fred Fazbear</p><p id="skinbtn8">Spiderman</p></div>
          <div class="dropdown-content1"><p id="skinbtn9">TeleTubby</p><p id="skinbtn10"><img src="https://paper-io.com/newpaperio/images/skin-09-big.png" /><br>Unicorn</p><p id="skinbtn12"><img src="https://paper-io.com/newpaperio/images/skin-11-big.png"><br>Heart</p><p id="skinbtn11"><img src="https://paper-io.com/newpaperio/images/skin-10-big.png"/><br>Rainbow Heart</p><p id="skinbtn13"><img src="https://paper-io.com/newpaperio/images/bigBat.png" /><br>Bat</p><p id="skinbtn14">Sushi</p><p id="skinbtn15">Cash</p><p id="skinbtn16">Cake</p></div>
          <div class="dropdown-content2"><p id="skinbtn17">Pool Floaty</p><p id="skinbtn18">Tank</p><p id="skinbtn19">Ladybug</p><p id="skinbtn22">Christmas Tree</p><p id="skinbtn20"><img src="https://paper-io.com/newpaperio/images/burgerBig.png"><br>Cheeseburger</p><p id="skinbtn21"><img src="https://paper-io.com/newpaperio/images/orangeBig.png"><br>Orange</p><p id="skinbtn23">Present</p><p id="skinbtn24">Snowman</p></div>
          <div class="dropdown-content3"><p id="skinbtn25"><img src="https://paper-io.com/newpaperio/images/cupid_60.png"><br>Cupid</p><p id="skinbtn26"><img src="https://paper-io.com/newpaperio/images/thanos60.png"><br>Thanos</p><p id="skinbtn28">Reaper</p><p id="skinbtn27"><img src="https://paper-io.com/newpaperio/images/capAmerica.png"><br>Captain America</p><p id="skinbtn29">Pennywise</p><p id="skinbtn30">Joker</p><p id="skinbtn31">Batman</p><p id="skinbtn32">Geralt</p></div>
          <div class="dropdown-content4"><p id="skinbtn33">Covid-19</p><p id="skinbtn34">Doctor</p><p id="skinbtn35">Sanitizer</p><p id="skinbtn36"><img src="https://paper-io.com/newpaperio/images/mask60.png"><br>Stay Safe Mask</p><p id="skinbtn37">Cyberpunk</p><p id="skinbtn38">Chess Piece</p><p id="skinbtn39">Yoda</p></div>
        </section>
        <section><label>Speed</label><input id="unitSpeed" type="number"></section>
        <section><label>Arena Size</label><input id="arenaSize" type="number"></section>
        <section><label>Quad Size</label><input id="quadSize" type="number"></section>
        <section><label>Bots count</label><input id="botsCount" type="number"></section>
        <section><div class="dropdown"><button class="dropbtn" id="buttonUnlock">Unlock all skins</button></section>
        <section><div class="dropdown"><button class="dropbtn" id="button play">Start Game</button></section>
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
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border: 5px solid #121414;
}

.dropdown-content1 {
  display: none;
  position: absolute;
  left: 170px;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border: 5px solid #121414;
}

.dropdown-content2 {
  display: none;
  position: absolute;
  left: 340px;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border: 5px solid #121414;
}

.dropdown-content3 {
  display: none;
  position: absolute;
  left: 510px;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border: 5px solid #121414;
}

.dropdown-content4 {
  display: none;
  position: absolute;
  left: 680px;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border: 5px solid #121414;
}

.dropdown-content p {
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content1 p {
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content2 p {
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content3 p {
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content4 p {
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.custom-button p {
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content p:hover {background-color: #121414;}

.dropdown-content1 p:hover {background-color: #121414;}

.dropdown-content2 p:hover {background-color: #121414;}

.dropdown-content3 p:hover {background-color: #121414;}

.dropdown-content4 p:hover {background-color: #121414;}

.custom-button p:hover {background-color: #121414;}

.dropdown:hover .dropdown-content {display: block; background-color: #242829;}

.dropdown:hover .dropdown-content1 {display: block; background-color: #242829;}

.dropdown:hover .dropdown-content2 {display: block; background-color: #242829;}

.dropdown:hover .dropdown-content3 {display: block; background-color: #242829;}

.dropdown:hover .dropdown-content4 {display: block; background-color: #242829;}

.dropdown:hover .dropbtn {background-color: #121414;}
</style>
`
    //$('#box').draggable()
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
    function get(x) { return document.getElementById(x) };


    // Setting up the html div
    let overlay = document.createElement("div");
    overlay.innerHTML = overlayHTML;
    document.body.appendChild(overlay);

    // Getting variables from div by id's
    let acc = get("accordian"),
        sb1 = get("skinbtn1"),
        sb2 = get("skinbtn2"),
        sb3 = get("skinbtn3"),
        sb4 = get("skinbtn4"),
        sb5 = get("skinbtn5"),
        sb6 = get("skinbtn6"),
        sb7 = get("skinbtn7"),
        sb8 = get("skinbtn8"),
        sb9 = get("skinbtn9"),
        sb10 = get("skinbtn10"),
        sb11 = get("skinbtn11"),
        sb12 = get("skinbtn12"),
        sb13 = get("skinbtn13"),
        sb14 = get("skinbtn14"),
        sb15 = get("skinbtn15"),
        sb16 = get("skinbtn16"),
        sb17 = get("skinbtn17"),
        sb18 = get("skinbtn18"),
        sb19 = get("skinbtn19"),
        sb20 = get("skinbtn20"),
        sb21 = get("skinbtn21"),
        sb22 = get("skinbtn22"),
        sb23 = get("skinbtn23"),
        sb24 = get("skinbtn24"),
        sb25 = get("skinbtn25"),
        sb26 = get("skinbtn26"),
        sb27 = get("skinbtn27"),
        sb28 = get("skinbtn28"),
        sb29 = get("skinbtn29"),
        sb30 = get("skinbtn30"),
        sb31 = get("skinbtn31"),
        sb32 = get("skinbtn32"),
        sb33 = get("skinbtn33"),
        sb34 = get("skinbtn34"),
        sb35 = get("skinbtn35"),
        sb36 = get("skinbtn36"),
        sb37 = get("skinbtn37"),
        sb38 = get("skinbtn38"),
        sb39 = get("skinbtn39"),
        sb40 = get("skinbtn40"),
        buttonplay = get("button play"),
        hackroyale = get("hackedRoyale"),
        testchange = get("testChange");


    //button functions

    //WARNING: Skins 31-34 will not work

    //first menu


    sb1.onclick = function () {
        document.cookie = "skin=skin_00"
        location.reload();
    }
    sb2.onclick = function () {
        document.cookie = "skin=skin_01"
        location.reload();
    }
    sb3.onclick = function () {
        document.cookie = "skin=skin_02"
        location.reload();
    }
    sb4.onclick = function () {
        document.cookie = "skin=skin_03"
        location.reload();
    }
    sb5.onclick = function () {
        document.cookie = "skin=skin_04"
        location.reload();
    }
    sb6.onclick = function () {
        document.cookie = "skin=skin_05"
        location.reload();
    }
    sb7.onclick = function () {
        document.cookie = "skin=skin_06"
        location.reload();
    }
    sb8.onclick = function () {
        document.cookie = "skin=skin_07"
        location.reload();
    }
    sb9.onclick = function () {
        document.cookie = "skin=skin_08"
        location.reload();
    }


    //second menu


    sb10.onclick = function () {
        document.cookie = "skin=skin_09"
        location.reload();
    }
    sb11.onclick = function () {
        document.cookie = "skin=skin_10"
        location.reload();
    }
    sb12.onclick = function () {
        document.cookie = "skin=skin_11"
        location.reload();
    }
    sb13.onclick = function () {
        document.cookie = "skin=skin_12"
        location.reload();
    }
    sb14.onclick = function () {
        document.cookie = "skin=skin_13"
        location.reload();
    }
    sb15.onclick = function () {
        document.cookie = "skin=skin_14"
        location.reload();
    }
    sb16.onclick = function () {
        document.cookie = "skin=skin_15"
        location.reload();
    }
    sb17.onclick = function () {
        document.cookie = "skin=skin_16"
        location.reload();
    }


    //third menu

    sb18.onclick = function () {
        document.cookie = "skin=skin_17"
        location.reload();
    }
    sb19.onclick = function () {
        document.cookie = "skin=skin_18"
        location.reload();
    }
    sb20.onclick = function () {
        document.cookie = "skin=skin_19"
        location.reload();
    }
    sb21.onclick = function () {
        document.cookie = "skin=skin_20"
        location.reload();
    }
    sb22.onclick = function () {
        document.cookie = "skin=skin_21"
        location.reload();
    }
    sb23.onclick = function () {
        document.cookie = "skin=skin_22"
        location.reload();
    }
    sb24.onclick = function () {
        document.cookie = "skin=skin_23"
        location.reload();
    }
    sb25.onclick = function () {
        document.cookie = "skin=skin_24"
        location.reload();
    }


    //fourth menu


    sb26.onclick = function () {
        document.cookie = "skin=skin_25"
        location.reload();
    }
    sb27.onclick = function () {
        document.cookie = "skin=skin_26"
        location.reload();
    }
    sb28.onclick = function () {
        document.cookie = "skin=skin_27"
        location.reload();
    }
    sb29.onclick = function () {
        document.cookie = "skin=skin_28"
        location.reload();
    }
    sb30.onclick = function () {
        document.cookie = "skin=skin_29"
        location.reload();
    }
    sb31.onclick = function () {
        document.cookie = "skin=skin_30"
        location.reload();
    }
    sb32.onclick = function () {
        document.cookie = "skin=skin_35"
        location.reload();
    }
    sb33.onclick = function () {
        document.cookie = "skin=skin_36"
        location.reload();
    }


    //fifth menu


    sb34.onclick = function () {
        document.cookie = "skin=skin_37"
        location.reload();
    }
    sb35.onclick = function () {
        document.cookie = "skin=skin_38"
        location.reload();
    }
    sb36.onclick = function () {
        document.cookie = "skin=skin_39"
        location.reload();
    }
    sb37.onclick = function () {
        document.cookie = "skin=skin_40"
        location.reload();
    }
    sb38.onclick = function () {
        document.cookie = "skin=skin_42" //41 breaks
        location.reload();
    }
    sb39.onclick = function () {
        document.cookie = "skin=skin_43"
        location.reload();
    }
    buttonplay.onclick = function () {
        game_start();

    }

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
    document.getElementById("unitSpeed").value = paper2.configs.paper2_classic.unitSpeed;
    document.getElementById("arenaSize").value = paper2.configs.paper2_classic.arenaSize;
    document.getElementById("quadSize").value = paper2.configs.paper2_classic.quadSize;
    document.getElementById("botsCount").value = paper2.configs.paper2_classic.botsCount;
    document.getElementById("box").addEventListener("input", function () {
        paper2.configs.paper2_classic.unitSpeed = document.getElementById("unitSpeed").value;
        paper2.configs.paper2_classic.arenaSize = document.getElementById("arenaSize").value;
        paper2.configs.paper2_classic.quadSize = document.getElementById("quadSize").value;
        paper2.configs.paper2_classic.botsCount = document.getElementById("botsCount").value;

    })

})();
