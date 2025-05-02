//created - 01-05-2025 ====================================================================================================
// PLAYER JS WITH HSL
//setup environment -------------------------------------------------------------------------------------------------------
let ENV_TYPES = [];
ENV_TYPES["DEV"] = "dev";
ENV_TYPES["STAGE"] = "stage";
ENV_TYPES["PROD"] = "prod";
ENV_TYPES["LOCAL"] = "local";
let ENVIRONMENT = ENV_TYPES["LOCAL"]; //DEFINA AQUI O AMBIENTE
let api_utl = "";
let scriptsUrl = "";

function loadEnvs() {
  if (ENVIRONMENT == ENV_TYPES["DEV"]) {
    api_utl = "https://dev-api.hostvsl.com.br/api/";
    scriptsUrl = "https://scriptdev.hostvsl.com.br/";
  }
  if (ENVIRONMENT == ENV_TYPES["STAGE"]) api_utl = "";
  if (ENVIRONMENT == ENV_TYPES["PROD"]) {
    api_utl = "https://api.hostvsl.com.br/api/";
    scriptsUrl = "https://script.hostvsl.com.br/";
  }
  if (ENVIRONMENT == ENV_TYPES["LOCAL"]) {
    api_utl = "http://localhost:3000/api/";
    scriptsUrl = "/";
  }
}
loadEnvs();
//-----------------------------------------------------------------------------------------------------------------------
//=======================================================================================================================
///styles and adds

const styles = `
      <style>
        * {
          font-family: Arial, Helvetica, sans-serif;
        }
        .progress::-webkit-progress-bar {
          background-color: #00000000;
        }
        .progress::-webkit-progress-value {
          background-color: var(--webkit-progress-value-bg-color, #2e2bf1);
        }
        .text-button {
          text-align: center;
        }

        .ActiveSound {
          font-size: 1.2rem;

          @media (max-width: 605px) {
            font-size: 1rem !important;
          }

          @media (max-width: 500px) {
            font-size: 0.7rem !important;
          }
        }


        .videoStarted {
          font-size: 1.2rem;

          @media (max-width: 605px) {
            font-size: 1rem !important;
          }

        }

        .control_Container {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          z-index: 1;
          justify-content: space-between;
          height: 100%;
          border-radius: 12px;
          -webkit-border-radius: 12px;
          -moz-border-radius: 12px;
        }

        .control_Container-Form {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          display: none;
          flex-direction: column;
          z-index: 1;
          justify-content: space-between;
          height: 100%;
          border-radius: 12px;
          -webkit-border-radius: 12px;
          -moz-border-radius: 12px;
        }

        .top_container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 10px 20px;
        }

        .control__title {
          color: #fff;
          font-size: 1.2rem;
        }

        .mid__container {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .control__box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-left: 20px;
          padding-bottom: 5px;
        }

        .inner__controls {
          display: flex;
          padding-top: 6px;
          padding-bottom: 3px;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .left__controls {
          display: flex;
          padding-top: 6px;
          align-items: center;
          gap: 1rem;
          width: 80%;
        }

        .second__control {
          display: flex;
          align-items: center;
        }

        @keyframes autoPlayPulseVSL {
          0% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes miniAutoPlayPulseVSL {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        @media (min-width: 760px) {
          #continueTitle {
            font-size: 1.8rem !important;
          }

          #continueText {
            font-size: 1rem !important;
          }

          #restartText {
            font-size: 1rem !important;
          }
        }

        @media (max-width: 700px) {
            #unmute {
            width: 45% !important;
            height: 45% !important;
          }
        }

        @media (min-width: 900px) {
          #continueTitle {
            font-size: 2rem !important;
          }

          #continueText {
            font-size: 1.125rem !important;
          }

          #restartText {
            font-size: 1.125rem !important;
          }

          #unmute {
            gap: 8% !important;
          }

          #unmute img {
            width: 37% !important;
          }

          .ActiveSound {
            font-size: 1.5rem;
          }

          .videoStarted {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 500px) {
          #continueTitle {
            font-size: 1rem !important;
          }

          #continueText {
            font-size: 0.8rem !important;
          }

          #restartText {
            font-size: 0.8rem !important;
          }

          .text-button {
            font-size: 0.85rem !important;
          }

          #unmute {
            width: 44% !important;
            height: 44% !important;
            gap: 10% !important;
          }

          #unmute img {
            width: 40% !important;
          }

          #aoVivoText {
            font-size: 0.75rem;
          }
        }

          @media (max-width: 420px) {
          #unmute {
            width: 50% !important;
            height: 50% !important;
            gap: 10% !important;
          }
        }

        @media (max-width: 375px) {
          #continueTitle {
            font-size: 0.8rem !important;
          }

          #continueText {
            font-size: 0.65rem !important;
          }

          #restartText {
            font-size: 0.65rem !important;
          }

          #aoVivoText {
            font-size: 0.6rem;
          }

          #unmute {
            width: 45% !important;
            height: 45% !important;
          }
        }

          @media (max-width: 270px) {
          #continueTitle {
            font-size: 0.8rem !important;
          }

          #continueText {
            font-size: 0.65rem !important;
          }

          #restartText {
            font-size: 0.65rem !important;
          }

          .text-button {
            font-size: 0.45rem !important;
          }

          #aoVivoText {
            font-size: 0.5rem;
          }
        }
      </style>
    `;
//=======================================================================================================================
//GLOBAL VARS============================================================================================================
window.globalState = {};
let globalState = {};
let videoUrl = "";
let videoId = "";
let videoInfo = {}
globalState.api = api_utl;
globalState.clientHostOrigin = window.location.origin;
const HlS = "https://cdn.jsdelivr.net/npm/hls.js@latest";
let isLeadTest = false;
let leadTestMainContentVideo = "";
let allowDomain = true;
globalState.clientHostOrigin = window.location.origin;

let state = {
  countControl: 0,
  notCountingAutoPlay: false,
  clickPlay: "",
  fakeBar: "",
  continueWLeftOff: "",
  circlePlay: "",
  iPhoneAutoPlay: "",
};

//------------------------------------------ELEMENTS---------------------------------------------------------------------
//VIDEO ELEMENT
const videoElement = document.querySelector("#video");
videoElement.style.display = "flex";
videoElement.style.flexDirection = "column";

const videoContainer = document.createElement("div");
videoContainer.className = "video-container";
videoContainer.style.display = "flex";
videoContainer.style.position = "relative";
let isAuto = false;

const playButton = document.getElementById('playButton');
videoContainer.append(videoElement);
document.body.append(videoContainer);

//-----------------------------------------------------------------------------------------------------------------------
//load video
(() => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  videoUrl = params.get("video");
  videoId = params.get("idvideo");
  console.log({ videoUrl })
  videoElement.controls = true
  videoUrl ? videoUrl : videoUrl = 'https://testvsl1.b-cdn.net/24b5b278-9505-4cb6-acb0-5ec5aa5987e3/ssssss/segment.m3u8';
  if (window.hls) {
    window.hls.loadSource(videoUrl);
    window.hls.attachMedia(videoElement);
    window.hls.on(window.Hls.Events.MANIFEST_PARSED, function () {        // Adicionar um ouvinte para o evento canplay
      videoElement.addEventListener('canplay', function () {
        videoElement.play().catch(function (error) {
          console.error('Erro ao tentar reproduzir:', error);
        });
      });
    });
  } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
    videoElement.src = videoUrl;
    videoElement.addEventListener('loadedmetadata', function () {
      videoElement.play().catch(function (error) {
        console.error('Erro ao tentar reproduzir:', error);
      });
    });
  } else {
    console.error('HLS não é suportado neste navegador.');
  }

})()
//load other stats
window.addEventListener("load", async function () {
  window.clicked = false;
  playButton.addEventListener('click', function () {
    playPauseVideo();
  });
  globalState.newSessionUserId = uuId()
  if (localStorage.getItem("lastSession")) {
    globalState.loadedSessionUserFromStorage = localStorage.getItem("lastSession")
  } else {
    globalState.loadedSessionUserFromStorage = globalState.newSessionUserId
    localStorage.setItem("lastSession", globalState.newSessionUserId)
  }
  window.domainData = await (await fetch("https://ipinfo.io?token=571af8f75fa0e9")).json();
  console.log("Domain Data: ", domainData)
  videoId = "b3f4389c-ca69-49f6-a2a8-9e00958e15ed"
  globalState.videoId = videoId
  if (videoId) {
    const dataVideo = await getVideo(videoId);
    videoInfo = dataVideo?.response;
    console.log({ videoInfo })
    allowDomain = !!dataVideo?.response?.video
    console.log({ allowDomain })
    const isMobile = window.innerWidth <= 500;
    const clientConnectData = {
      id_sessao: globalState?.newSessionUserId,
      id_video: globalState.videoId,
      browser: getBrowserName(),
      plataforma: isMobile ? "Celular" : "Desktop",
      view: true,
      lastSession: globalState?.loadedSessionUserFromStorage,
      connectionData: window.domainData,
    };

    console.log({ clientConnectData })
    await handleCreateMetric(clientConnectData)

    //============================ADD VIDEO STATS ===========================================================
    // let state = {
    //   countControl: 0,
    //   notCountingAutoPlay: false,
    //   clickPlay: localStorage.getItem("clickPlay"),
    //   fakeBar: sessionStorage.getItem("fakeBar"),
    //   continueWLeftOff: localStorage.getItem("time"),
    //   circlePlay: localStorage.getItem("circlePlay"),
    //   iPhoneAutoPlay: sessionStorage.getItem("iPhoneAutoPlay"),
    // };



    //====INTERFACE===========================================================================================

    const sound =
      "data:image/svg+xml;base64,ICAgIDxzdmcgdmVyc2lvbj0iMS4xIiBmaWxsPSIjRkZGRkZGIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIg0KICAgICAgICB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjQ2Ljc1cHgiIGhlaWdodD0iMzIuNTYzcHgiIHZpZXdCb3g9IjcuOTk5IDkuMDYyIDQ2Ljc1IDMyLjU2MyINCiAgICAgICAgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyA3Ljk5OSA5LjA2MiA0Ni43NSAzMi41NjMiIHhtbDpzcGFjZT0icHJlc2VydmUiDQogICAgPg0KICAgICAgPHN0eWxlPg0KICAgICAgICBALXdlYmtpdC1rZXlmcmFtZXMgQkxJTksgew0KICAgICAgICAgIDAlIHsgb3BhY2l0eTogMDsgfQ0KICAgICAgICAgIDMzJSB7IG9wYWNpdHk6IDE7IH0NCiAgICAgICAgICA2NiUgeyBvcGFjaXR5OiAxOyB9DQogICAgICAgICAgMTAwJSB7IG9wYWNpdHk6IDA7IH0NCiAgICAgICAgfQ0KDQogICAgICAgIEBrZXlmcmFtZXMgQkxJTksgew0KICAgICAgICAgIDAlIHsgb3BhY2l0eTogMDsgfQ0KICAgICAgICAgIDMzJSB7IG9wYWNpdHk6IDE7IH0NCiAgICAgICAgICA2NiUgeyBvcGFjaXR5OiAxOyB9DQogICAgICAgICAgMTAwJSB7IG9wYWNpdHk6IDA7IH0NCiAgICAgICAgfQ0KDQogICAgICAgIC5hbmltYXRpb24gLmJsaW5rXzEgew0KICAgICAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBCTElOSyAycyBpbmZpbml0ZTsNCiAgICAgICAgICBhbmltYXRpb246IEJMSU5LIDJzIGluZmluaXRlOw0KICAgICAgICAgIG9wYWNpdHk6IDA7DQogICAgICAgIH0NCg0KICAgICAgICAuYW5pbWF0aW9uIC5ibGlua18yIHsNCiAgICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogQkxJTksgMnMgaW5maW5pdGUgLjNzOw0KICAgICAgICAgIGFuaW1hdGlvbjogQkxJTksgMnMgaW5maW5pdGUgLjNzOw0KICAgICAgICAgIG9wYWNpdHk6IDA7DQogICAgICAgIH0NCg0KICAgICAgICAuYW5pbWF0aW9uIC5ibGlua18zIHsNCiAgICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogQkxJTksgMnMgaW5maW5pdGUgLjZzOw0KICAgICAgICAgIGFuaW1hdGlvbjogQkxJTksgMnMgaW5maW5pdGUgLjZzOw0KICAgICAgICAgIG9wYWNpdHk6IDA7DQogICAgICAgIH0NCg0KICAgICAgICAuYW5pbWF0aW9uIC5zbWFydHBsYXktc3ZnLWNvbG9yIHsNCiAgICAgICAgICBmaWxsOiAnI0ZGRkZGRicgIWltcG9ydGFudDsNCiAgICAgICAgfQ0KDQogICAgICAgIC5hbmltYXRpb24uYWRqdXN0YWJsZSB7DQogICAgICAgICAgYm9yZGVyOiA0cHggc29saWQgJyNGRkZGRkYnOw0KICAgICAgICB9DQogICAgICA8L3N0eWxlPg0KDQogICAgICA8ZyBjbGFzcz0iYWRqdXN0YWJsZSBmZyBhbmltYXRpb24iPg0KICAgICAgICA8cGF0aCBjbGFzcz0ic21hcnRwbGF5LXN2Zy1jb2xvciIgZD0iTTUzLjI0OSwzOS42MTZjLTAuMTg2LDAtMC4zNzEtMC4wNTEtMC41MzctMC4xNTdsLTQzLjUtMjcuNzVjLTAuNDY2LTAuMjk3LTAuNjAzLTAuOTE2LTAuMzA2LTEuMzgxYzAuMjk4LTAuNDY2LDAuOTE3LTAuNjAxLDEuMzgxLTAuMzA2bDQzLjUsMjcuNzVjMC40NjcsMC4yOTcsMC42MDQsMC45MTYsMC4zMDcsMS4zODFDNTMuOTAxLDM5LjQ1Myw1My41NzksMzkuNjE2LDUzLjI0OSwzOS42MTZ6Ij48L3BhdGg+DQogICAgICAgIDxwYXRoIGNsYXNzPSJibGlua18zIHNtYXJ0cGxheS1zdmctY29sb3IiIGQ9Ik00OC44OTYsMzMuNDY3bDEuNjk5LDEuMDg1YzMuNDk3LTcuNzkxLDIuMDczLTE3LjI3MS00LjMxMy0yMy42NTljLTAuMzkxLTAuMzkxLTEuMDIzLTAuMzkxLTEuNDE0LDBzLTAuMzkxLDEuMDIzLDAsMS40MTRDNTAuNTgxLDE4LjAxOSw1MS45MTMsMjYuNDYzLDQ4Ljg5NiwzMy40Njd6Ij48L3BhdGg+DQogICAgICAgIDxwYXRoIGNsYXNzPSJibGlua18zIHNtYXJ0cGxheS1zdmctY29sb3IiIGQ9Ik00Ni45MjYsMzYuOTU2Yy0wLjYxMiwwLjg2My0xLjI4NiwxLjY5NS0yLjA1OSwyLjQ2OWMtMC4zOTIsMC4zOTEtMC4zOTIsMS4wMjMsMCwxLjQxNGMwLjE5NCwwLjE5NSwwLjQ1LDAuMjkzLDAuNzA3LDAuMjkzYzAuMjU2LDAsMC41MTItMC4wOTgsMC43MDYtMC4yOTNjMC44NzgtMC44NzgsMS42NDItMS44MjQsMi4zMzMtMi44MDdMNDYuOTI2LDM2Ljk1NnoiPjwvcGF0aD4NCiAgICAgICAgPHBhdGggY2xhc3M9ImJsaW5rXzIgc21hcnRwbGF5LXN2Zy1jb2xvciIgZD0iTTQyLjU0MywyOS40MTVsMS43NzcsMS4xMzVjMS41NDUtNS4zMTUsMC4yMjktMTEuMjkzLTMuOTUzLTE1LjQ3NmMtMC4zOTItMC4zOTEtMS4wMjMtMC4zOTEtMS40MTQsMGMtMC4zOTIsMC4zOTEtMC4zOTIsMS4wMjMsMCwxLjQxNEM0Mi40NTQsMTkuOTg3LDQzLjYzOSwyNC45MjUsNDIuNTQzLDI5LjQxNXoiPjwvcGF0aD4NCiAgICAgICAgPHBhdGggY2xhc3M9ImJsaW5rXzIgc21hcnRwbGF5LXN2Zy1jb2xvciIgZD0iTTQxLDMzLjE3NGMtMC41NjMsMC45NC0xLjIzNSwxLjgzNy0yLjA0NywyLjY0NmMtMC4zOTEsMC4zOTItMC4zOTEsMS4wMjMsMCwxLjQxNGMwLjE5NSwwLjE5NSwwLjQ1MSwwLjI5MywwLjcwNywwLjI5M3MwLjUxMi0wLjA5OCwwLjcwNy0wLjI5M2MwLjkxNi0wLjkxNCwxLjY3Ni0xLjkyNCwyLjMxNy0yLjk4NEw0MSwzMy4xNzR6Ij48L3BhdGg+DQogICAgICAgIDxwYXRoIGNsYXNzPSJibGlua18xIHNtYXJ0cGxheS1zdmctY29sb3IiIGQ9Ik0zNS43NzEsMjUuMDk0bDIuMDAzLDEuMjc3YzAuMDEyLTAuMjAzLDAuMDI5LTAuNDA0LDAuMDI5LTAuNjA5YzAtMy4wNzktMS4yLTUuOTc0LTMuMzgxLTguMTUzYy0wLjM5MS0wLjM5MS0xLjAyMi0wLjM5MS0xLjQxNCwwYy0wLjM5MSwwLjM5MS0wLjM5MSwxLjAyMywwLDEuNDE0QzM0LjY1MiwyMC42NjYsMzUuNjEzLDIyLjgwMiwzNS43NzEsMjUuMDk0eiI+PC9wYXRoPg0KICAgICAgICA8cGF0aCBjbGFzcz0iYmxpbmtfMSBzbWFydHBsYXktc3ZnLWNvbG9yIiBkPSJNMzUuMDg0LDI5LjQwMWMtMC40NzQsMS4xNDUtMS4xNzIsMi4xOTctMi4wNzYsMy4xYy0wLjM5MSwwLjM5MS0wLjM5MSwxLjAyMywwLDEuNDE0YzAuMTk1LDAuMTk1LDAuNDUxLDAuMjkzLDAuNzA3LDAuMjkzYzAuMjU3LDAsMC41MTMtMC4wOTgsMC43MDctMC4yOTNjMS4wMDgtMS4wMDYsMS43OTUtMi4xNywyLjM2MS0zLjQzTDM1LjA4NCwyOS40MDF6Ij48L3BhdGg+DQogICAgICAgIDxwb2x5Z29uIGNsYXNzPSJzbWFydHBsYXktc3ZnLWNvbG9yIiBwb2ludHM9IjI4LjEyNCwyMC4yMTUgMjguMTI0LDE0Ljk5MSAyNC42MzUsMTcuOTkgICI+PC9wb2x5Z29uPg0KICAgICAgICA8cGF0aCBjbGFzcz0ic21hcnRwbGF5LXN2Zy1jb2xvciIgZD0iTTIwLjkyMSwyMC4zNjZoLTYuNDIzYy0wLjU1MywwLTEsMC41MDgtMSwxLjEzNXY4LjIyOWMwLDAuNjI3LDAuNDQ3LDEuMTM1LDEsMS4xMzVoNy4zNzVsNi4yNSw1Ljg3NVYyNC45NkwyMC45MjEsMjAuMzY2eiI+PC9wYXRoPg0KICAgICAgPC9nPg0KICAgIDwvc3ZnPg0KICA=";
    await appendScriptOnHead('https://kit.fontawesome.com/839085c966.js')
    await appendScriptOnHead('https://code.jquery.com/jquery-3.2.1.min.js')
    document.head.insertAdjacentHTML("beforeend", styles);
    document.head.appendChild(fontAwesomeScript);
    document.head.appendChild(jquery);
    //========================================================================================================
  }
});


//=========FUNCTIONS====================

async function appendScriptOnHead(url) {
  return new Promise((onFulfilled, onRejected) => {
    const script = document.createElement("script");
    let loaded;
    script.setAttribute("src", url);
    script.async = true;
    script.crossOrigin = "anonymous";
    script.onreadystatechange = script.onload = () => {
      if (!loaded) {
        onFulfilled(script);
      }
      loaded = true;
    };
    script.onerror = function () {
      console.error("Erro ao carregar script")
      onRejected(new Error("Erro ao carregar script"));
    };
    document.getElementsByTagName("head")[0].appendChild(script);
    return script
  });
}

async function appendScriptOnFooter(url) {
  return new Promise((onFulfilled, onRejected) => {
    const script = document.createElement("script");
    let loaded;
    script.setAttribute("src", url);
    script.async = true;
    script.onreadystatechange = script.onload = () => {
      if (!loaded) {
        onFulfilled(script);
      }
      loaded = true;
    };
    script.onerror = function () {
      console.error("Erro ao carregar script");
      onRejected(new Error("Erro ao carregar script"));
    };
    document.getElementsByTagName("body")[0].appendChild(script);
  });
}

function getBrowserName() {
  const userAgent = navigator.userAgent;

  if (userAgent.indexOf("Chrome") > -1) {
    return "Google Chrome";
  } else if (userAgent.indexOf("Firefox") > -1) {
    return "Mozilla Firefox";
  } else if (userAgent.indexOf("Safari") > -1) {
    return "Apple Safari";
  } else if (userAgent.indexOf("Edge") > -1) {
    return "Microsoft Edge";
  } else if (
    userAgent.indexOf("MSIE") > -1 ||
    userAgent.indexOf("Trident") > -1
  ) {
    return "Internet Explorer";
  } else {
    return "Navegador desconhecido";
  }
}

function uuId() {
  return (
    gerarStringAlfanumerica(8) +
    "-" +
    gerarStringAlfanumerica(4) +
    "-" +
    gerarStringAlfanumerica(4) +
    "-" +
    gerarStringAlfanumerica(4) +
    "-" +
    gerarStringAlfanumerica(12)
  );
}

function gerarStringAlfanumerica(tamanho) {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let resultado = "";
  for (let i = 0; i < tamanho; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    resultado += caracteres[indice];
  }
  return resultado;
}

function playPauseVideo() {
  const video = document.getElementById("video");
  video.muted = false;
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

//=========================API STRUCTURE============================================================

async function getVideo(videoId) {
  const api = await fetch(`${api_utl}videos/get-by-id/${videoId}`, {
    headers: {
      "Content-Type": "application/json",
      "x-client-ip-address": domainData ? domainData.ip : "",
      "x-client-host-origin": window.location.origin,
    },
  });
  const json = await api.json();
  return json;
}

async function setClick(data) {
  const API = globalState.api;
  const api = await fetch(`${API}metric/click`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await api.json();
  return json;
}
async function setThumbClick(idVideo, idSessao) {
  const API = globalState.api;
  const api = await fetch(`${API}metric/thumb-click`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(idVideo, idSessao),
  });
  const json = await api.json();
  return json;
}
async function handleSendCapture(data) {
  const API = globalState.api;
  const api = await fetch(`${API}capture/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await api.json();
  return json;
}

async function handleVideoLogin(data) {
  const API = globalState.api;
  const api = await fetch(`${API}capture/video-login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await api.json();
  return json;
}

async function handleCreateMetric(data) {
  const API = globalState.api;
  const res = await fetch(`${API}metric/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log("metrica Criada: ", res)
}
async function handleUpdateMetric(data) {
  const API = globalState.api;
  await fetch(`${API}metric/update`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
async function handleLasteUpdateMetric(data) {
  const API = globalState.api;
  await fetch(`${API}metric/update/last`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
//CREATE ELEMENTS============================================================================================================
//====
const createThumb = () => {
  const thumbPause = document.createElement("img");
  thumbPause.style.position = "absolute";
  thumbPause.style.zIndex = 1;
  thumbPause.id = "thumbPause";
  thumbPause.style.display = "none";
  thumbPause.style.top = 0;
  if (videoInfo?.haveBorder) {
    thumbPause.style.border = `4px solid ${videoInfo.borderColor}`;
  }
  if (videoInfo?.haveBorderRadius) {
    thumbPause.style.borderRadius = "12px";
  }
  if (videoInfo.haveButtonThumb) {
    createThumbButton();
  }
  thumbPause.style.width = "100%";
  thumbPause.style.height = "100%";
  thumbPause.src = videoInfo.thumb;
  thumbPause.style.cursor = "pointer";
  thumbPause.style.zIndex = 0;
  thumbPause.addEventListener("click", handlePlayPause);
  videoContainer.appendChild(thumbPause);
};
//====
const createAutoPlay = () => {
  const autoPlayFullContainerVideo = document.createElement("div");
  const autoPlayContainer = document.createElement("div");
  const formOnScreen = localStorage.getItem("formOnScreen");

  const imgSound = document.createElement("div");
  const superiorText = document.createElement("span");
  const inferiorText = document.createElement("span");

  isAuto = true;

  autoPlayFullContainerVideo.id = "unmute-container";
  autoPlayFullContainerVideo.style.display = "flex";
  autoPlayFullContainerVideo.style.width = "100%";
  autoPlayFullContainerVideo.style.height = "100%";
  autoPlayFullContainerVideo.style.position = "absolute";
  autoPlayFullContainerVideo.style.zIndex = 4;

  autoPlayContainer.id = "unmute";
  imgSound.style.mask = `url(${sound}) no-repeat center`;
  imgSound.style.backgroundColor = videoInfo.autoplayIconColor ?? "#fff";
  imgSound.style.maskSize = "contain";
  imgSound.style.width = "120px";
  imgSound.style.height = "120px";
  imgSound.id = "iconSound";
  imgSound.style.marginTop = 3;
  imgSound.style.marginBottom = 3;

  superiorText.textContent =
    videoInfo?.textSuperior !== ""
      ? videoInfo?.textSuperior
      : "Ative o som";
  inferiorText.textContent =
    videoInfo?.textInferior !== ""
      ? videoInfo?.textInferior
      : "Seu vídeo já começou";

  superiorText.className = "text-button ActiveSound";
  inferiorText.className = "text-button videoStarted";

  autoPlayContainer.style.border = `1px solid transparent`;
  if (videoInfo.haveBorderWhite) {
    autoPlayContainer.style.border = `1px solid #fff`;
  }

  autoPlayContainer.style.display = videoInfo.haveForm ? "none" : "flex";
  if (
    videoInfo.checkedCaptureTimer &&
    videoInfo.typeForm === "data-capture"
  ) {
    autoPlayContainer.style.display = "flex";
  }
  if (formOnScreen === true) autoPlayContainer.style.display = "none";
  autoPlayContainer.style.flexDirection = "column"; // Set the direction to column
  autoPlayContainer.style.justifyContent = "center";
  autoPlayContainer.style.alignItems = "center";
  autoPlayContainer.style.position = "absolute";
  autoPlayContainer.style.left = "50%";
  autoPlayContainer.style.top = "50%";
  autoPlayContainer.style.transform = "translate(-50%, -50%)";
  autoPlayContainer.style.backgroundColor = videoInfo?.cor;
  autoPlayContainer.style.color = videoInfo?.corText;
  autoPlayContainer.style.padding = "5px 20px";
  autoPlayContainer.style.borderRadius = "5px";
  autoPlayContainer.style.cursor = "pointer";
  autoPlayContainer.style.width = "38%"; // Set the width to 50% of the screen
  autoPlayContainer.style.height = "41%"; // Set the height to 40% of the screen
  autoPlayContainer.style.gap = "10%"; // Set the height to 40% of the screen
  autoPlayContainer.style.border = `1px solid transparent`;
  if (videoInfo.haveBorderWhite) {
    autoPlayContainer.style.border = `1px solid #fff`;
  }
  if (videoInfo.havePulse) {
    autoPlayContainer.style.animation = "autoPlayPulseVSL 1350ms infinite";
  }

  superiorText.style.color = videoInfo.corText;
  superiorText.style.fontWeight = 600;
  inferiorText.style.color = videoInfo.corText;
  inferiorText.style.fontWeight = 600;

  autoPlayContainer.appendChild(superiorText);
  autoPlayContainer.appendChild(imgSound);
  autoPlayContainer.appendChild(inferiorText);

  autoPlayFullContainerVideo.appendChild(autoPlayContainer);

  videoContainer.appendChild(autoPlayFullContainerVideo);

  if (!formOnScreen)
    autoPlayFullContainerVideo.addEventListener("click", function () {
      handleUnmuteRestart();
      sessionStorage.setItem("autoPlaySent", true);
    });
};
//====
const createAffiliateLogo = () => {
  const affiliateBox = document.createElement("a");
  const affiliateLogo = document.createElement("img");

  affiliateBox.href = videoInfo.urlAffiliate;
  affiliateBox.setAttribute("target", "_blank");
  affiliateBox.setAttribute("rel", "noopener noreferrer");

  affiliateLogo.src = "https://dev.hostvsl.com.br/assets/logo-4f3361a7.png";
  affiliateLogo.style.position = "absolute";
  affiliateLogo.style.width = "15%";
  affiliateLogo.style.height = "auto";
  affiliateLogo.style.maxWidth = "100%";
  affiliateLogo.style.maxHeight = "100%";
  affiliateLogo.style.textAlign = "center";
  affiliateLogo.style.overflow = "hidden";
  affiliateLogo.style.zIndex = "20";
  affiliateLogo.style.opacity = videoInfo.transparencyAffiliateLogo;

  switch (videoInfo.selectedAffiliateLogoPosition) {
    case "I_Meio":
      affiliateLogo.style.left = "50%";
      affiliateLogo.style.bottom = "12px";
      affiliateLogo.style.transform = "translateX(-50%)";
      break;
    case "S_Meio":
      affiliateLogo.style.left = "50%";
      affiliateLogo.style.top = "12px";
      affiliateLogo.style.transform = "translateX(-50%)";
      break;
    case "S_Esquerda":
      affiliateLogo.style.left = "12px";
      affiliateLogo.style.top = "10px";
      affiliateLogo.style.transform = "translateY(0)";
      break;
    case "S_Direita":
      affiliateLogo.style.right = "12px";
      affiliateLogo.style.top = "10px";
      affiliateLogo.style.transform = "translateY(0)";
      break;
    case "M_Esquerda":
      affiliateLogo.style.left = "12px";
      affiliateLogo.style.top = "50%";
      affiliateLogo.style.transform = "translateY(-50%)";
      break;
    case "M_Direita":
      affiliateLogo.style.right = "12px";
      affiliateLogo.style.top = "50%";
      affiliateLogo.style.transform = "translateY(-50%)";
      break;
    case "I_Esquerda":
      affiliateLogo.style.left = "12px";
      affiliateLogo.style.bottom = "12px";
      affiliateLogo.style.transform = "translateY(0)";
      break;
    case "I_Direita":
      affiliateLogo.style.right = "12px";
      affiliateLogo.style.bottom = "12px";
      affiliateLogo.style.transform = "translateY(0)";
      break;
  }

  affiliateBox.appendChild(affiliateLogo);
  videoContainer.appendChild(affiliateBox);
};

//====
const createLogoMark = () => {
  const logoMark = document.createElement("img");
  logoMark.src = videoInfo.logoImg;
  logoMark.style.position = "absolute";
  logoMark.style.width = "10%";
  logoMark.style.height = "auto";
  logoMark.style.maxHeight = "100%";
  logoMark.style.maxWidth = "100%";
  logoMark.style.textAlign = "center";
  logoMark.style.overflow = "hidden";
  logoMark.style.zIndex = "25";
  logoMark.style.cursor = "pointer";
  switch (videoInfo.selectedLogoPosition) {
    case "I_Meio":
      logoMark.style.left = "50%";
      logoMark.style.bottom = "12px";
      logoMark.style.transform = "translateX(-50%)";
      break;
    case "S_Meio":
      logoMark.style.left = "50%";
      logoMark.style.top = "12px";
      logoMark.style.transform = "translateX(-50%)";
      break;
    case "S_Esquerda":
      logoMark.style.left = "12px";
      logoMark.style.top = "10px";
      logoMark.style.transform = "translateY(0)";
      break;
    case "S_Direita":
      logoMark.style.right = "12px";
      logoMark.style.top = "10px";
      logoMark.style.transform = "translateY(0)";
      break;
    case "M_Esquerda":
      logoMark.style.left = "12px";
      logoMark.style.top = "50%";
      logoMark.style.transform = "translateY(-50%)";
      break;
    case "M_Direita":
      logoMark.style.right = "12px";
      logoMark.style.top = "50%";
      logoMark.style.transform = "translateY(-50%)";
      break;
    case "I_Esquerda":
      logoMark.style.left = "12px";
      logoMark.style.bottom = "12px";
      logoMark.style.transform = "translateY(0)";
      break;
    case "I_Direita":
      logoMark.style.right = "12px";
      logoMark.style.bottom = "12px";
      logoMark.style.transform = "translateY(0)";
      break;
  }
  logoMark.addEventListener("click", () => {
    window.open(videoInfo.urlLogo, "_blank");
  });
  videoContainer.appendChild(logoMark);
};
//====
const createVideo = async () => {
  if (!videoInfo) {
    return createCantRunVideoImage();
  }
  const videoElement = document.createElement("video");
  videoElement.style.width = "100%";
  videoElement.style.height = "100%";
  videoElement.setAttribute("crossorigin", "anonymous");
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  let lastProcessedTime = -1;

  const progress = () => {
    if (videoElement.paused == false && videoElement.muted == false) {
      const parsedCurrentTime =
        videoElement.currentTime < 1
          ? Math.floor(videoElement.currentTime)
          : Math.ceil(videoElement.currentTime);

      if (
        videoInfo?.mapedVideoTimes.includes(parsedCurrentTime) &&
        lastProcessedTime !== parsedCurrentTime
      ) {
        lastProcessedTime = parsedCurrentTime;

        const parsedTime =
          videoElement.currentTime > 1
            ? Math.ceil(videoElement.currentTime)
            : Math.floor(videoElement.currentTime);

        const lastData = {
          id_video: videoInfo.id_video,
          id_sessao: globalState?.newSessionUserId,
          currentTime: parsedTime,
          videoDuration: videoInfo.duration,
        };

        handleLasteUpdateMetric(lastData);
      }
    }
  };

  videoElement.poster = videoInfo?.frame;
  videoElement.id = "my-video";
  videoElement.controls = false;
  videoElement.preload = "metadata";
  videoElement.setAttribute("playsinline", "");
  videoElement.setAttribute("webkit-playsinline", "");

  if (
    !state.continueWLeftOff &&
    !state.notCountingAutoPlay &&
    videoInfo?.haveAutoPlay
  ) {
    videoElement.setAttribute("autoplay", "");
    videoElement.setAttribute("muted", "");
    videoElement.setAttribute("loop", "");
  }

  if (videoInfo.noneControlsMoreAutoplay) {
    videoElement.setAttribute("autoplay", "");
    videoElement.setAttribute("muted", "");
    videoElement.setAttribute("loop", "");
  }

  if (
    videoInfo.haveAutoPlay &&
    !videoInfo.customImage &&
    !state.continueWLeftOff &&
    !state.notCountingAutoPlay
  ) {
    if (!videoInfo.typesAutoplay) {
      if (!videoInfo.haveSmallTemplate) {
        createAutoPlay();
      } else if (videoInfo.haveSmallTemplate) {
        createSmallAutoPlay();
      }
    } else {
      switch (videoInfo.typesAutoplay) {
        case "autoPlay":
          createAutoPlay();
          break;
        case "small":
          createSmallAutoPlay();
          break;
        case "large":
          createLargeAutoPlay();
          break;
        case "transparent":
          createTransparentAutoPlay();
          break;
        case "blur":
          createEyeBlurAutoPlay();
          break;
        case "fullScreen":
          createFullScreenAutoPlay();
          break;
        case "animation":
          createAnimatedAutoPlay();
          break;
      }
    }
  }

  if (
    videoInfo.haveAutoPlay &&
    videoInfo.customImage &&
    !videoInfo.haveContinue
  ) {
    createCustomAutoPlay();
  }

  if (videoInfo?.haveAoVivo) {
    createAoVivo();
  }

  if (videoInfo.haveHeadline) {
    createHeadline();
  }

  if (videoInfo.haveAffiliateLink) {
    createAffiliateLogo();
  }

  if (videoInfo?.haveBorder) {
    videoElement.style.border = `4px solid ${videoInfo.borderColor}`;
  }
  if (videoInfo?.haveBorderRadius) {
    container.style.borderRadius = "12px";
    videoElement.style.borderRadius = "12px";
  }

  if (!isIOS) {
    if (!videoInfo.noneControlsMoreAutoplay) {
      videoElement.addEventListener("click", handlePlayPause);
    }
    videoElement.addEventListener("timeupdate", handleOnProgress);
    videoElement.addEventListener("timeupdate", progress);

    if (videoInfo.thumbFinal) {
      videoElement.addEventListener("ended", createFinalThumb);
    }

    videoElement.addEventListener("loadedmetadata", () => {
      const containerControls =
        document.getElementById("controls-container");

      if (containerControls)
        containerControls.addEventListener("mousemove", handleMouseMove);
    });
  }

  if (isMobile) {
    videoElement.addEventListener("touchstart", handleMouseMove);
  }

  videoElement.addEventListener("loadedmetadata", () => {
    videoElement.playbackRate = videoInfo.haveTurbo
      ? videoInfo.turboVelocity
      : 1;
  });

  const source = document.createElement("source");

  source.src = videoInfo?.video;
  source.type = "application/x-mpegURL";
  videoElement.appendChild(source);

  const player = videojs(videoElement);
  player.options_.loop = false;

  player?.ready(() => console.log("player inicializado"));

  if (isLeadTest) {
    player.options_.loop = false;
    player.on("ended", function () {
      player.dispose();
      videoInfo = leadTestMainContentVideo;
      createVideo();
    });
  }

  videoContainer.appendChild(videoElement);
  container.appendChild(videoContainer);

  if (videoInfo.logoImg) {
    createLogoMark();
  }

  if (videoInfo.thumb) {
    createThumb();
  }
  if (
    videoInfo.thumbInicio &&
    !state.continueWLeftOff &&
    !videoInfo.noneControlsMoreAutoplay
  ) {
    createInitialThumb();
  }

  if (
    videoInfo.haveControls &&
    !videoInfo.haveAutoPlay &&
    !videoInfo.noneControlsMoreAutoplay
  ) {
    createControls();
  }

  if (!videoInfo?.haveAutoPlay && !videoInfo?.haveControls) {
    createCirclePlay();
  }

  if (videoInfo.haveContinue) {
    if (state.continueWLeftOff) {
      switch (videoInfo.typesContinue) {
        case "":
          createContinueDefault();
          break;
        case "continueSmall":
          createContinueSmall();
          break;
      }
    }

    window.addEventListener("beforeunload", () => {
      if (videoElement.currentTime > 0) {
        if (videoInfo.haveAutoPlay && state.notCountingAutoPlay) {
          localStorage.setItem("time", videoElement.currentTime);
        }

        if (!videoInfo.haveAutoPlay) {
          localStorage.setItem("time", videoElement.currentTime);
        }
      }
    });
  }

  if (!videoInfo.haveContinue) {
    localStorage.removeItem("time");
  }

  if (videoInfo.haveDelayButton) {
    if (videoInfo.showAllTimeDelay) {
      createDelayButton();
    }
    if (!videoInfo.showAllTimeDelay) {
      sessionStorage.setItem("haveDelayButton", videoInfo.haveDelayButton);
      sessionStorage.setItem("initialDelay", videoInfo.initialDelay);
      sessionStorage.setItem("endDelay", videoInfo.endDelay);
    }
  }

  if (videoInfo.haveForm) {
    if (videoInfo.typeForm === "capture-password") {
      createFormPassword();
    }
    if (videoInfo.typeForm === "data-capture") {
      createForm();
    }
    if (!videoInfo.checkedCaptureTimer) {
      localStorage.setItem("formOnScreen", true);
      const circle = document.getElementById("circle");
      const formOnScreen = localStorage.getItem("formOnScreen");
      if (formOnScreen === "true" && circle) circle.style.display = "none";
    }
  }
};

//====
const handlePlayPause = async () => {
  const isMobile = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const formOnScreen = localStorage.getItem("formOnScreen");
  const videoElement = document.getElementById("my-video_html5_api");
  const thumbPause = document.getElementById("thumbPause");
  const thumbInitial = document.getElementById("thumbInitial");
  const thumbButton = document.getElementById("idThumb");
  const playElement = document.getElementById("icon_play");
  const pauseElement = document.getElementById("icon_pause");
  const circleElement = document.getElementById("circle");
  const circlePlay = document.getElementById("icon_play_control");
  const circlePause = document.getElementById("icon_pause_control");
  if (!formOnScreen) {
    if (isAuto) {
      //handleUnmuteRestart();
      // return;
    } else {
      await Promise.resolve(localStorage.getItem("clickPlay")).then(
        (resp) => {
          if (!resp) {
            if (!state.circlePlay) {
              const sendData = {
                id_video: videoInfo.id_video,
                id_sessao: globalState?.newSessionUserId,
                lastSession: globalState?.loadedSessionUserFromStorage,
                play: true,
              };
              sendData.clickButton = true;
              handleUpdateMetric(sendData);
              localStorage.setItem("clickPlay", true);
              setClicks(videoInfo.id_user);
            }
          }
        }
      );
    }

    if (!videoInfo.haveControls && videoInfo?.haveFakeBar) {
      await Promise.resolve(sessionStorage.getItem("fakeBar")).then(
        (res) => {
          if (!res) {
            if (!state.fakeBar) {
              sessionStorage.setItem("fakeBar", true);
              createFakeBar();

              // alert(videoElement.duration);
              if (isMobile) {
                videoElement.addEventListener(
                  "timeupdate",
                  handleOnProgress
                );
                videoElement.addEventListener("mousemove", handleMouseMove);
              }
            }
          }
        }
      );
    }

    if (videoElement?.paused) {
      videoElement.play();

      if (pauseElement) pauseElement.style.display = "none";
      if (circlePause) circlePause.style.display = "none";
      if (circlePlay) circlePlay.style.display = "block";
      if (playElement) playElement.style.display = "block";

      if (thumbInitial) thumbInitial.style.display = "none";

      if (videoInfo.thumb) {
        if (thumbPause) thumbPause.style.display = "none";
        if (thumbButton) {
          thumbButton.style.display = "none";
          thumbButton.style.cursor = "pointer";
        }
      }

      if (circleElement) circleElement.style.visibility = "hidden";
    } else {
      videoElement.pause();

      if (circleElement) circleElement.style.visibility = "visible";

      if (pauseElement) pauseElement.style.display = "none";
      if (circlePause) circlePause.style.display = "none";
      if (circlePlay) circlePlay.style.display = "block";
      if (playElement) playElement.style.display = "block";

      if (videoInfo.thumb) {
        if (thumbPause) thumbPause.style.display = "block";
        if (thumbButton) {
          thumbButton.style.display = "block";
          thumbButton.style.cursor = "pointer";
        }
      }

      if (videoInfo.thumbInicio) {
        if (thumbInitial) thumbInitial.style.display = "none";
      }
    }
  }
};

//====
const handlePlayPauseControl = async () => {
  const videoElement = document.getElementById("my-video_html5_api");
  const isMobile = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  const thumbPause = document.getElementById("thumbPause");
  const thumbButton = document.getElementById("idThumb");

  const thumbInitial = document.getElementById("thumbInitial");

  const playElement = document.getElementById("icon_play_control");
  const playElementBottom = document.getElementById(
    "icon_play_bottom_control"
  );
  const pauseElement = document.getElementById("icon_pause_control");
  const pauseElementBottom = document.getElementById(
    "icon_pause_bottom_control"
  );

  const circleControl = document.getElementById("circle_control");
  const durationElement = document.getElementById("duration");

  if (isAuto) {
    handleUnmuteRestart();
    return;
  } else {
    await Promise.resolve(localStorage.getItem("clickPlay")).then(
      (resp) => {
        if (!resp) {
          if (!state.clickPlay) {
            const sendData = {
              id_video: videoInfo.id_video,
              id_sessao: globalState?.newSessionUserId,
              lastSession: globalState?.loadedSessionUserFromStorage,
              play: true,
            };
            sendData.clickButton = true;
            handleUpdateMetric(sendData);
            localStorage.setItem("clickPlay", true);
            setClicks(videoInfo.id_user);
          }
        }
      }
    );
  }

  if (isMobile) {
    durationElement.textContent = formatTime(videoElement.duration);
    videoElement.addEventListener("timeupdate", handleOnProgress);
    videoElement.addEventListener("mousemove", handleMouseMove);
  }

  if (videoElement?.paused) {
    videoElement.play();

    if (videoInfo.thumb) {
      thumbPause.style.display = "none";

      if (thumbButton) {
        thumbButton.style.display = "none";
      }
    }

    if (videoInfo.haveAutoPlay) {
      if (circleControl) circleControl.style.display = "none";
    }

    if (thumbInitial) thumbInitial.style.display = "none";

    if (playElement) playElement.style.display = "none";
    if (playElementBottom) playElementBottom.style.display = "none";
    if (pauseElement) pauseElement.style.display = "block";
    if (pauseElementBottom) pauseElementBottom.style.display = "block";
  } else {
    videoElement.pause();

    if (videoInfo.thumb) {
      thumbPause.style.display = "block";

      if (thumbButton) {
        thumbButton.style.display = "block";
      }
    }

    if (videoInfo.haveAutoPlay) {
      if (circleControl) circleControl.style.display = "flex";
    }

    if (playElement) playElement.style.display = "block";
    if (playElementBottom) playElementBottom.style.display = "block";
    if (pauseElement) pauseElement.style.display = "none";
    if (pauseElementBottom) pauseElementBottom.style.display = "none";
  }
};

//====
const handleUnmuteRestart = async () => {
  const isMobile = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const containerControl = document.getElementById("container_controls");
  const unMuteButton = document.getElementById("unmute-container");
  const unMuteButtonSmall = document.getElementById("unSmall-container");
  const unMuteButtonCustom = document.getElementById("unmute-custom");
  const videoElement = document.getElementById("my-video_html5_api");
  const circlePlay = document.getElementById("icon_play_control");
  const circlePause = document.getElementById("icon_pause_control");
  const progressBar = document.getElementById("progress");

  const circlePlayBottom = document.getElementById(
    "icon_play_bottom_control"
  );
  const circlePauseBottom = document.getElementById(
    "icon_pause_bottom_control"
  );

  await Promise.resolve(localStorage.getItem("clickPlay")).then((resp) => {
    if (!resp) {
      if (!state.clickPlay) {
        const sendData = {
          id_video: videoInfo.id_video,
          id_sessao: globalState?.newSessionUserId,
          lastSession: globalState?.loadedSessionUserFromStorage,
          play: true,
        };
        sendData.clickButton = true;
        handleUpdateMetric(sendData);
        localStorage.setItem("clickPlay", true);
        setClicks(videoInfo.id_user);
      }
    }
  });

  isAuto = false;
  videoElement.currentTime = 0;
  videoElement.autoplay = false;
  videoElement.muted = false;
  videoElement.loop = false;
  videoElement.removeAttribute("autoplay");
  videoElement.removeAttribute("muted");
  videoElement.removeAttribute("loop");
  state.notCountingAutoPlay = true;

  if (videoInfo.haveAutoPlay) {
    if (unMuteButton) unMuteButton.remove();
    if (unMuteButtonSmall) unMuteButtonSmall.remove();
    if (unMuteButtonCustom) unMuteButtonCustom.remove();
    await Promise.resolve(localStorage.getItem("circlePlay")).then(
      (res) => {
        if (!res) {
          if (!state.circlePlay) {
            localStorage.setItem("circlePlay", true);
            createCirclePlay();
          }
        }
      }
    );
  }

  if (videoInfo.haveControls) {
    // createControls();
    if (circlePlay) circlePlay.style.display = "none";
    if (circlePause) circlePause.style.display = "block";

    if (circlePlayBottom) circlePlayBottom.style.display = "none";
    if (circlePauseBottom) circlePauseBottom.style.display = "block";
  }

  if (videoInfo.checkedCaptureTimer) {
    if (videoElement.currentTime < videoInfo.haveTim && containerControl) {
      containerControl.style.display = "flex";
    }
  }

  videoElement.play();

  if (!videoInfo.haveControls && videoInfo?.haveFakeBar) {
    await Promise.resolve(sessionStorage.getItem("fakeBar")).then((res) => {
      if (!res) {
        if (!state.fakeBar) {
          sessionStorage.setItem("fakeBar", true);
          createFakeBar();

          if (isMobile) {
            videoElement.addEventListener("timeupdate", handleOnProgress);
            videoElement.addEventListener("mousemove", handleMouseMove);
          }
        }
      }
    });
  }
};

//====
const handleMouseMove = async () => {
  const videoElement = document.querySelector("video");
  const controlElement = document.getElementById("container_controls");

  window.onbeforeunload = function (e) {
    sessionStorage.clear();
  };

  state.countControl = videoElement.currentTime + 3;
  if (controlElement) controlElement.style.visibility = "visible";
};

//====
const handleOnProgress = async () => {
  const videoElement = document.querySelector("video");
  const progressElement = document.getElementById("progress");
  const progressTracker = document.getElementById("progress_tracker");
  const timer = document.getElementById("timer");
  const form = document.getElementById("formCaptureSection");
  const containerControl = document.getElementById("container_controls");
  const circlePlay = document.getElementById("circle");
  const unmute = document.getElementById("unmute");
  const unmuteSmall = document.getElementById("unmute-small");
  const aoVivo = document.getElementById("aoVivo");
  const thumbFinal = document.getElementById("thumbFinal");

  if (videoInfo.haveAutoPlay && isAuto) {
    const bigThan10SecsVideo = videoElement.duration >= 10;
    const minorThanDuration = videoElement.duration - 1;

    if (bigThan10SecsVideo) {
      if (videoElement.currentTime >= 10) {
        videoElement.currentTime = 0;
      }
    } else {
      if (videoElement.currentTime >= minorThanDuration) {
        videoElement.currentTime = 0;
      }
    }
  }

  if (thumbFinal) {
    if (videoElement.currentTime < videoElement.duration) {
      thumbFinal.remove();
    }
  }

  if (videoInfo.haveRestart) {
    videoElement.addEventListener("ended", () => {
      videoElement.play();
    });
  }

  if (progressTracker) {
    const progress =
      (videoElement.currentTime / videoElement.duration) * 100;
    progressTracker.style.width = `${progress}%`;
  }
  if (timer) {
    timer.textContent = formatTime(videoElement.currentTime);
  }

  const formSent = sessionStorage.getItem("formSent");

  if (containerControl && videoElement?.currentTime > state.countControl) {
    containerControl.style.visibility = "hidden";
  }

  if (
    !formSent &&
    videoInfo.haveForm &&
    videoInfo.typeForm === "data-capture" &&
    videoInfo.checkedCaptureTimer &&
    videoElement?.currentTime >= videoInfo.haveTime
  ) {
    localStorage.setItem("formOnScreen", true);
    if (unmute && unmute.style.display === "flex") return null;
    if (unmuteSmall && unmuteSmall.style.display === "flex") return null;
    if (form) form.style.display = "flex";
    if (containerControl) containerControl.style.display = "none";
    if (circlePlay) circlePlay.style.display = "none";
    if (aoVivo) aoVivo.style.display = "none";
    videoElement.pause();
  }

  if (progressElement) {
    if (videoElement?.currentTime * 10 < videoElement?.duration * 0.5) {
      let progress = videoElement?.currentTime * 10;
      progressElement.value = progress;
      sessionStorage.setItem("atual", progress);
    } else {
      const currentAtual = Number(sessionStorage.getItem("atual"));

      let progress =
        currentAtual +
        videoElement?.currentTime +
        videoElement?.duration * 0.5;

      let duration =
        currentAtual +
        videoElement?.duration +
        videoElement?.duration * 0.5;

      progressElement.value = progress.toFixed(1);
      progressElement.max = duration.toFixed(1);
    }
  }
  const haveDelayButton = sessionStorage.getItem("haveDelayButton");
  if (haveDelayButton) {
    const delayInit = sessionStorage.getItem("initialDelay")?.split(":");
    const delayEnd = sessionStorage.getItem("endDelay")?.split(":");
    if (delayInit && delayEnd) {
      const delayInitSeconds =
        Number(delayInit[0]) * 60 + Number(delayInit[1]);

      const delayEndSeconds =
        Number(delayEnd[0]) * 60 + Number(delayEnd[1]);

      if (
        videoElement.currentTime >= delayInitSeconds &&
        videoElement.currentTime <= delayEndSeconds
      ) {
        if (!document.getElementById("delayButton")) {
          createDelayButton();
        }
      } else {
        if (document.getElementById("delayButton")) {
          document.getElementById("delayButton").remove();
        }
      }
    }
  }
};
//====
const handleMute = () => {
  const videoElement = document.getElementById("my-video_html5_api");
  const mutedElement = document.getElementById("icon_muted_bottom_control");
  const unmutedElement = document.getElementById(
    "icon_unmuted_bottom_control"
  );

  if (videoElement.muted) {
    videoElement.muted = false;
    mutedElement.style.display = "none";
    unmutedElement.style.display = "block";
  } else {
    videoElement.muted = true;
    mutedElement.style.display = "block";
    unmutedElement.style.display = "none";
  }
};

//====
const createCustomAutoPlay = () => {
  const formOnScreen = localStorage.getItem("formOnScreen");

  const autoPlayContainer = document.createElement("img");
  const autoPlayCustomContainer = document.createElement("div");

  autoPlayCustomContainer.id = "unmute-custom";
  autoPlayCustomContainer.style.display = "flex";
  autoPlayCustomContainer.style.width = "100%";
  autoPlayCustomContainer.style.height = "100%";
  autoPlayCustomContainer.style.position = "absolute";
  autoPlayCustomContainer.style.zIndex = 3;

  const imgSound = document.createElement("img");
  isAuto = true;
  autoPlayContainer.addEventListener("click", handleUnmuteRestart);

  autoPlayContainer.id = "unmute";
  autoPlayContainer.src = videoInfo.customImage;

  autoPlayContainer.style.border = `1px solid transparent`;
  if (videoInfo.haveBorderWhite) {
    autoPlayContainer.style.border = `1px solid #fff`;
  }

  autoPlayContainer.style.display = videoInfo.haveForm ? "none" : "flex";
  if (videoInfo.checkedCaptureTimer)
    autoPlayContainer.style.display = "flex";
  autoPlayContainer.style.flexDirection = "column"; // Set the direction to column
  autoPlayContainer.style.justifyContent = "space-evenly";
  autoPlayContainer.style.alignItems = "center";
  autoPlayContainer.style.position = "absolute";
  autoPlayContainer.style.left = "50%";
  autoPlayContainer.style.top = "50%";
  autoPlayContainer.style.transform = "translate(-50%, -50%)";
  autoPlayContainer.style.color = videoInfo?.corText;
  autoPlayContainer.style.borderRadius = "5px";
  autoPlayContainer.style.cursor = "pointer";
  autoPlayContainer.style.width = "40%"; // Set the width to 50% of the screen
  autoPlayContainer.style.height = "40%"; // Set the height to 40% of the screen
  autoPlayContainer.style.gap = "5%"; // Set the height to 40% of the screen
  autoPlayContainer.style.border = `1px solid transparent`;
  if (videoInfo.haveBorderWhite) {
    autoPlayContainer.style.border = `1px solid #fff`;
  }
  if (videoInfo.havePulse) {
    autoPlayContainer.style.animation = "autoPlayPulseVSL 1350ms infinite";
  }

  autoPlayContainer.appendChild(imgSound);
  autoPlayCustomContainer.appendChild(autoPlayContainer);

  videoContainer.appendChild(autoPlayCustomContainer);

  if (!formOnScreen)
    autoPlayCustomContainer.addEventListener("click", function () {
      handleUnmuteRestart();
      sessionStorage.setItem("autoPlaySent", true);
    });
};

//====
const createSmallAutoPlay = () => {
  const autoPlayFullContainerVideo = document.createElement("div");
  const autoPlayContainer = document.createElement("div");
  const imgSound = document.createElement("div");
  const superiorText = document.createElement("span");
  const formOnScreen = localStorage.getItem("formOnScreen");
  isAuto = true;

  autoPlayFullContainerVideo.id = "unSmall-container";
  autoPlayFullContainerVideo.style.display = "flex";
  autoPlayFullContainerVideo.style.width = "100%";
  autoPlayFullContainerVideo.style.height = "100%";
  autoPlayFullContainerVideo.style.position = "absolute";
  autoPlayFullContainerVideo.style.zIndex = 4;

  autoPlayContainer.id = "unmute-small";
  imgSound.style.mask = `url(${sound}) no-repeat center`;
  imgSound.style.maskSize = "contain";
  imgSound.style.width = "30px";
  imgSound.style.height = "30px";
  imgSound.style.backgroundColor = videoInfo.autoplayIconColor ?? "#fff";
  imgSound.id = "iconSound";
  imgSound.style.marginTop = 3;
  imgSound.style.marginBottom = 3;

  if (videoInfo.havePulse) {
    autoPlayContainer.style.animation =
      "miniAutoPlayPulseVSL 1350ms infinite";
  }

  superiorText.textContent =
    videoInfo?.textSuperior !== ""
      ? videoInfo?.textSuperior
      : "Clique para ouvir";

  superiorText.className = "text-button";

  autoPlayContainer.style.alignItems = "center";
  autoPlayContainer.style.position = "absolute";

  if (!videoInfo?.haveAoVivo) {
    autoPlayContainer.style.left = "3%";
  }
  if (videoInfo?.haveAoVivo) {
    autoPlayContainer.style.left = "auto";
    autoPlayContainer.style.right = "3%";
  }

  autoPlayContainer.style.display = videoInfo.haveForm ? "none" : "flex";
  if (videoInfo.checkedCaptureTimer)
    autoPlayContainer.style.display = "flex";
  autoPlayContainer.style.top = "5%";
  autoPlayContainer.style.backgroundColor = videoInfo?.cor;
  autoPlayContainer.style.color = videoInfo?.corText;
  autoPlayContainer.style.alignItems = "center";
  autoPlayContainer.style.padding = "0 10px";
  autoPlayContainer.style.borderRadius = "5px";
  autoPlayContainer.style.cursor = "pointer";
  autoPlayContainer.style.height = "36px";
  autoPlayContainer.style.zIndex = "15";
  autoPlayContainer.style.gap = "2%";
  autoPlayContainer.style.border = `1px solid transparent`;
  if (formOnScreen === true) {
    autoPlayContainer.style.display = "none";
  }

  if (videoInfo.haveBorderWhite) {
    autoPlayContainer.style.border = `1px solid #fff`;
  }

  superiorText.style.color = videoInfo.corText;
  superiorText.style.fontWeight = 500;
  superiorText.style.fontSize = "0.85rem";
  superiorText.style.minWidth = "105px";

  autoPlayContainer.appendChild(imgSound);
  autoPlayContainer.appendChild(superiorText);

  autoPlayFullContainerVideo.appendChild(autoPlayContainer);

  videoContainer.appendChild(autoPlayFullContainerVideo);

  if (!formOnScreen)
    autoPlayFullContainerVideo.addEventListener("click", function () {
      handleUnmuteRestart();
      sessionStorage.setItem("autoPlaySent", true);
    });
};

//====
const createLargeAutoPlay = () => {
  const formOnScreen = localStorage.getItem("formOnScreen");

  const autoPlayFullContainerVideo = document.createElement("div");

  autoPlayFullContainerVideo.id = "unmute-container";
  autoPlayFullContainerVideo.style.display = "flex";
  autoPlayFullContainerVideo.style.width = "100%";
  autoPlayFullContainerVideo.style.height = "100%";
  autoPlayFullContainerVideo.style.position = "absolute";
  autoPlayFullContainerVideo.style.cursor = "pointer";
  autoPlayFullContainerVideo.style.zIndex = 4;

  const largeAutoPlay = document.createElement("button");

  largeAutoPlay.id = "unmute-large";
  largeAutoPlay.style.backgroundColor =
    videoInfo?.videoInfo?.cor ?? "rgba(0, 170, 255, 0.46)";
  largeAutoPlay.style.color = "#fff";
  largeAutoPlay.style.border = videoInfo?.haveBorderWhite
    ? "1px solid #fff"
    : "none";
  largeAutoPlay.style.borderRadius = "5px";
  largeAutoPlay.style.cursor = "pointer";
  largeAutoPlay.style.height = "50%";
  largeAutoPlay.style.width = "40%";
  largeAutoPlay.style.display = "flex";
  largeAutoPlay.style.flexDirection = "column";
  largeAutoPlay.style.justifyContent = "center";
  largeAutoPlay.style.alignItems = "center";
  largeAutoPlay.style.position = "absolute";
  largeAutoPlay.style.top = "50%";
  largeAutoPlay.style.left = "50%";
  largeAutoPlay.style.transform = "translate(-50%, -50%)";
  largeAutoPlay.style.animation = videoInfo.havePulse
    ? "autoPlayPulseVSL 1350ms infinite"
    : "none";

  const playIcon = document.createElement("i");

  playIcon.id = "icon_play_large";
  playIcon.classList.add("fa-sharp");
  playIcon.classList.add("fa-regular");
  playIcon.classList.add("fa-circle-play");
  playIcon.style.fontSize = "6.25rem";
  playIcon.style.color = videoInfo.autoplayIconColor ?? "#fff";

  const textSpan = document.createElement("span");

  textSpan.id = "text_span_large";
  textSpan.style.fontSize = "1.125rem";
  textSpan.style.fontWeight = 600;
  textSpan.style.color = videoInfo.corText;
  textSpan.style.marginTop = "1.125rem";
  textSpan.textContent =
    videoInfo?.textInferior !== ""
      ? videoInfo?.textInferior
      : "Clique para ouvir";

  const largeAutoPlayStyle = document.createElement("style");

  const style = `
      @media (max-width: 550px) {
        #unmute-large {
          height: 50% !important;
          width: 40% !important;
        }

        #icon_play_large {
          font-size: 4.5rem !important;
        }

        #text_span_large {
          margin-top: 1rem !important;
          font-size: 1rem !important;
        }
      }

      @media (max-width: 400px) {
        #unmute-large {
          height: 55% !important;
          width: 50% !important;
        }

        #icon_play_large {
          font-size: 3.25rem !important;
        }

        #text_span_large {
          font-size: 1rem !important;
          margin-top: 0.8rem !important;
        }
      }

      @media (max-width: 300px) {
        #unmute-large {
          height: 60% !important;
          width: 55% !important;
        }

        #icon_play_large {
          font-size: 2.5rem !important;
        }

        #text_span_large {
          font-size: 0.8rem !important;
          margin-top: 0.8rem !important;
        }
      }

      @media (max-width: 240px) {
        #unmute-large {
          height: 65% !important;
          width: 60% !important;
        }

        #icon_play_large {
          font-size: 2rem !important;
        }

        #text_span_large {
          font-size: 0.7rem !important;
          margin-top: 0.7rem !important;
        }
      }
      `;

  largeAutoPlayStyle.innerHTML = style;
  document.head.appendChild(largeAutoPlayStyle);

  largeAutoPlay.appendChild(playIcon);
  largeAutoPlay.appendChild(textSpan);

  autoPlayFullContainerVideo.appendChild(largeAutoPlay);
  videoContainer.appendChild(autoPlayFullContainerVideo);

  if (!formOnScreen)
    autoPlayFullContainerVideo.addEventListener("click", function () {
      handleUnmuteRestart();
      sessionStorage.setItem("autoPlaySent", true);
    });
};

//====
const createTransparentAutoPlay = () => {
  const formOnScreen = localStorage.getItem("formOnScreen");

  const autoPlayFullContainerVideo = document.createElement("div");

  autoPlayFullContainerVideo.id = "unmute-container";
  autoPlayFullContainerVideo.style.display = "flex";
  autoPlayFullContainerVideo.style.width = "100%";
  autoPlayFullContainerVideo.style.height = "100%";
  autoPlayFullContainerVideo.style.position = "absolute";
  autoPlayFullContainerVideo.style.cursor = "pointer";
  autoPlayFullContainerVideo.style.zIndex = 4;

  const transparentAutoPlay = document.createElement("button");

  transparentAutoPlay.id = "unmute-transparent";
  transparentAutoPlay.style.backgroundColor = "transparent";
  transparentAutoPlay.style.color = "#fff";
  transparentAutoPlay.style.border = "none";
  transparentAutoPlay.style.borderRadius = "5px";
  transparentAutoPlay.style.cursor = "pointer";
  transparentAutoPlay.style.height = "35%";
  transparentAutoPlay.style.width = "45%";
  transparentAutoPlay.style.display = "flex";
  transparentAutoPlay.style.flexDirection = "column";
  transparentAutoPlay.style.justifyContent = "center";
  transparentAutoPlay.style.alignItems = "center";
  transparentAutoPlay.style.position = "absolute";
  transparentAutoPlay.style.top = "50%";
  transparentAutoPlay.style.left = "50%";
  transparentAutoPlay.style.transform = "translate(-50%, -50%)";
  transparentAutoPlay.style.animation = videoInfo.havePulse
    ? "autoPlayPulseVSL 1350ms infinite"
    : "none";

  const playIcon = document.createElement("i");

  playIcon.id = "icon_play_control";
  playIcon.classList.add("fa-solid");
  playIcon.classList.add("fa-play");
  playIcon.style.fontSize = "3.5rem";
  playIcon.style.color = videoInfo.autoplayIconColor ?? "#fff";
  playIcon.style.textShadow = "rgba(0, 0, 0, 0.7) 1px 1px 2px";

  const textSpan = document.createElement("span");

  textSpan.id = "text_span_transparent";
  textSpan.style.fontSize = "1.125rem";
  textSpan.style.fontWeight = 600;
  textSpan.style.color = videoInfo.corText;
  textSpan.style.marginTop = "1.25rem";
  textSpan.textContent =
    videoInfo?.textInferior !== ""
      ? videoInfo?.textInferior
      : "Seu vídeo já começou";
  textSpan.style.textShadow = "rgba(0, 0, 0, 0.7) 1px 1px 2px";

  const transparentAutoPlayStyle = document.createElement("style");

  const style = `
        @media (max-width: 480px) {
          #icon_play_control {
            font-size: 3rem !important;
          }

          #text_span_transparent {
            font-size: 0.95rem !important;
          }
        }
      `;

  transparentAutoPlayStyle.innerHTML = style;
  document.head.appendChild(transparentAutoPlayStyle);

  transparentAutoPlay.appendChild(playIcon);
  transparentAutoPlay.appendChild(textSpan);

  autoPlayFullContainerVideo.appendChild(transparentAutoPlay);
  videoContainer.appendChild(autoPlayFullContainerVideo);

  if (!formOnScreen)
    autoPlayFullContainerVideo.addEventListener("click", function () {
      handleUnmuteRestart();
      sessionStorage.setItem("autoPlaySent", true);
    });
};

//====
const createEyeBlurAutoPlay = () => {
  const formOnScreen = localStorage.getItem("formOnScreen");

  const autoPlayFullContainerVideo = document.createElement("div");

  autoPlayFullContainerVideo.id = "unmute-container";
  autoPlayFullContainerVideo.style.display = "flex";
  autoPlayFullContainerVideo.style.width = "100%";
  autoPlayFullContainerVideo.style.height = "100%";
  autoPlayFullContainerVideo.style.position = "absolute";
  autoPlayFullContainerVideo.style.cursor = "pointer";
  autoPlayFullContainerVideo.style.zIndex = 30;

  const eyeBlurAutoPlay = document.createElement("button");

  eyeBlurAutoPlay.id = "unmute-eyeblur";
  eyeBlurAutoPlay.style.backgroundColor = "rgba(0, 0, 0, 0.25)";
  eyeBlurAutoPlay.style.backdropFilter = "blur(10px)";
  eyeBlurAutoPlay.style.color = "#fff";
  eyeBlurAutoPlay.style.border = "none";
  eyeBlurAutoPlay.style.borderRadius = "5px";
  eyeBlurAutoPlay.style.cursor = "pointer";
  eyeBlurAutoPlay.style.height = "100%";
  eyeBlurAutoPlay.style.width = "100%";
  eyeBlurAutoPlay.style.display = "flex";
  eyeBlurAutoPlay.style.flexDirection = "column";
  eyeBlurAutoPlay.style.justifyContent = "center";
  eyeBlurAutoPlay.style.alignItems = "center";

  const playIcon = document.createElement("i");

  playIcon.id = "icon_play_control";
  playIcon.classList.add("fa-regular");
  playIcon.classList.add("fa-eye-slash");
  playIcon.style.fontSize = "3rem";
  playIcon.style.color = videoInfo.autoplayIconColor ?? "#fff";

  const titleSpan = document.createElement("span");

  titleSpan.id = "title_span_eyeBlur";
  titleSpan.style.fontSize = "1.25rem";
  titleSpan.style.maxWidth = "70%";
  titleSpan.style.fontWeight = 500;
  titleSpan.style.color = videoInfo.corText;
  titleSpan.style.marginTop = "1rem";
  titleSpan.style.animation = videoInfo.havePulse
    ? "3500ms ease 0s infinite normal none running pulseTextVSL"
    : "none";
  titleSpan.textContent =
    videoInfo?.textSuperior !== ""
      ? videoInfo?.textSuperior
      : "Conteúdo Sensível";

  const textSpan = document.createElement("span");

  textSpan.id = "text_span_eyeBlur";
  textSpan.style.fontSize = "1.025rem";
  textSpan.style.maxWidth = "70%";
  textSpan.style.color = videoInfo.corText;
  textSpan.style.marginTop = "0.5rem";
  textSpan.style.animation = videoInfo.havePulse
    ? "3500ms ease 0s infinite normal none running pulseTextVSL"
    : "none";
  textSpan.textContent =
    videoInfo?.textInferior !== ""
      ? videoInfo?.textInferior
      : "Este vídeo apresenta conteúdo que os grandes produtores não querem que você assista!";

  const eyeBlurAutoPlayStyle = document.createElement("style");

  const style = `
        @media (min-width: 820px) {
          #icon_play_control {
            font-size: 4rem !important;
          }

          #title_span_eyeBlur {
            font-size: 1.425rem !important;
          }

          #text_span_eyeBlur {
            font-size: 1.125rem !important;
          }
        }

        @media (max-width: 480px) {
          #icon_play_control {
            font-size: 2.25rem !important;
          }

          #title_span_eyeBlur {
            font-size: 1rem !important;
          }

          #text_span_eyeBlur {
            font-size: 0.85rem !important;
            max-width: 80% !important;
          }
        }

        @media (max-width: 390px) {
          #icon_play_control {
            font-size: 2em !important;
          }

          #title_span_eyeBlur {
            font-size: 0.85rem !important;
          }

          #text_span_eyeBlur {
            font-size: 0.65rem !important;
            max-width: 80% !important;

          }
        }

        @keyframes pulseTextVSL {
          0% {
           transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `;

  eyeBlurAutoPlayStyle.innerHTML = style;
  document.head.appendChild(eyeBlurAutoPlayStyle);

  eyeBlurAutoPlay.appendChild(playIcon);
  eyeBlurAutoPlay.appendChild(titleSpan);
  eyeBlurAutoPlay.appendChild(textSpan);

  autoPlayFullContainerVideo.appendChild(eyeBlurAutoPlay);
  videoContainer.appendChild(autoPlayFullContainerVideo);

  if (!formOnScreen)
    autoPlayFullContainerVideo.addEventListener("click", function () {
      handleUnmuteRestart();
      sessionStorage.setItem("autoPlaySent", true);
    });
};

//====
const createFullScreenAutoPlay = () => {
  const formOnScreen = localStorage.getItem("formOnScreen");

  const autoPlayFullContainerVideo = document.createElement("div");

  autoPlayFullContainerVideo.id = "unmute-container";
  autoPlayFullContainerVideo.style.display = "flex";
  autoPlayFullContainerVideo.style.width = "100%";
  autoPlayFullContainerVideo.style.height = "100%";
  autoPlayFullContainerVideo.style.position = "absolute";
  autoPlayFullContainerVideo.style.cursor = "pointer";
  autoPlayFullContainerVideo.style.zIndex = 30;

  const fullScreenAutoPlay = document.createElement("button");

  fullScreenAutoPlay.id = "unmute-fullscreen";
  fullScreenAutoPlay.style.backgroundColor = videoInfo?.cor;
  fullScreenAutoPlay.style.backdropFilter = "blur(10px)";
  fullScreenAutoPlay.style.color = "#fff";
  fullScreenAutoPlay.style.border = "none";
  fullScreenAutoPlay.style.borderRadius = "5px";
  fullScreenAutoPlay.style.cursor = "pointer";
  fullScreenAutoPlay.style.height = "100%";
  fullScreenAutoPlay.style.width = "100%";
  fullScreenAutoPlay.style.display = "flex";
  fullScreenAutoPlay.style.flexDirection = "column";
  fullScreenAutoPlay.style.justifyContent = "center";
  fullScreenAutoPlay.style.alignItems = "center";

  const playIcon = document.createElement("img");

  playIcon.src = "https://script.evideovsl.com.br/imgs/sound.svg";
  playIcon.style.width = "10%";
  playIcon.id = "iconSound";
  playIcon.style.margin = "1rem 0";
  playIcon.style.animation = videoInfo.havePulse
    ? "3500ms ease 0s infinite normal none running pulseTextVSL"
    : "none";

  const titleSpan = document.createElement("span");

  titleSpan.id = "title_span_fs";
  titleSpan.style.fontSize = "1.5rem";
  titleSpan.style.maxWidth = "70%";
  titleSpan.style.fontWeight = 500;
  titleSpan.style.color = videoInfo.corText;
  titleSpan.style.marginTop = "1rem";
  titleSpan.style.animation = videoInfo.havePulse
    ? "3500ms ease 0s infinite normal none running pulseTextVSL"
    : "none";
  titleSpan.textContent =
    videoInfo?.textSuperior !== ""
      ? videoInfo?.textSuperior
      : "Seu vídeo já começou";

  const textSpan = document.createElement("span");

  textSpan.id = "text_span_fs";
  textSpan.style.fontSize = "1.25rem";
  textSpan.style.maxWidth = "70%";
  textSpan.style.color = videoInfo.corText;
  textSpan.style.marginTop = "0.5rem";
  textSpan.style.animation = videoInfo.havePulse
    ? "3500ms ease 0s infinite normal none running pulseTextVSL"
    : "none";
  textSpan.textContent =
    videoInfo?.textInferior !== ""
      ? videoInfo?.textInferior
      : "Ative o som";

  const fullScreenAutoPlayStyle = document.createElement("style");

  const style = `
        @media (max-width: 480px) {
          #icon_play_control {
            font-size: 3rem !important;
          }

          #text_span_eyeBlur {
            font-size: 0.95rem !important;
          }
        }

        @keyframes pulseTextVSL {
          0% {
           transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `;

  fullScreenAutoPlayStyle.innerHTML = style;
  document.head.appendChild(fullScreenAutoPlayStyle);

  fullScreenAutoPlay.appendChild(titleSpan);
  fullScreenAutoPlay.appendChild(playIcon);
  fullScreenAutoPlay.appendChild(textSpan);

  autoPlayFullContainerVideo.appendChild(fullScreenAutoPlay);
  videoContainer.appendChild(autoPlayFullContainerVideo);

  if (!formOnScreen)
    autoPlayFullContainerVideo.addEventListener("click", function () {
      handleUnmuteRestart();
      sessionStorage.setItem("autoPlaySent", true);
    });
};

//====
const createAnimatedAutoPlay = () => {
  const formOnScreen = localStorage.getItem("formOnScreen");

  const autoPlayFullContainerVideo = document.createElement("div");

  autoPlayFullContainerVideo.id = "unmute-container";
  autoPlayFullContainerVideo.style.display = "flex";
  autoPlayFullContainerVideo.style.width = "100%";
  autoPlayFullContainerVideo.style.height = "100%";
  autoPlayFullContainerVideo.style.position = "absolute";
  autoPlayFullContainerVideo.style.cursor = "pointer";
  autoPlayFullContainerVideo.style.zIndex = 30;

  const fullScreenAutoPlay = document.createElement("button");

  fullScreenAutoPlay.id = "unmute-animated";
  fullScreenAutoPlay.style.backgroundColor = videoInfo?.cor;
  fullScreenAutoPlay.style.backdropFilter = "blur(10px)";
  fullScreenAutoPlay.style.color = "#fff";
  fullScreenAutoPlay.style.border = "none";
  fullScreenAutoPlay.style.borderRadius = "5px";
  fullScreenAutoPlay.style.cursor = "pointer";
  fullScreenAutoPlay.style.height = "100%";
  fullScreenAutoPlay.style.width = "100%";
  fullScreenAutoPlay.style.display = "flex";
  fullScreenAutoPlay.style.flexDirection = "column";
  fullScreenAutoPlay.style.justifyContent = "center";
  fullScreenAutoPlay.style.alignItems = "center";

  const animatedContainer = document.createElement("div");

  animatedContainer.id = "animated-container";
  animatedContainer.style.position = "relative";
  animatedContainer.style.marginTop = "1.5rem";
  animatedContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  animatedContainer.style.color = "#fff";
  animatedContainer.style.textAlign = "center";
  animatedContainer.style.textDecoration = "none";
  animatedContainer.style.cursor = "pointer";
  animatedContainer.style.borderRadius = "50%";
  animatedContainer.style.height = "75px";
  animatedContainer.style.width = "75px";
  animatedContainer.style.display = "flex";
  animatedContainer.style.flexDirection = "column";
  animatedContainer.style.justifyContent = "center";
  animatedContainer.style.alignItems = "center";
  animatedContainer.style.zIndex = 35;

  const playIcon = document.createElement("i");

  playIcon.id = "icon_play_control";
  playIcon.classList.add("fa-solid");
  playIcon.classList.add("fa-play");
  playIcon.style.fontSize = "2rem";
  playIcon.style.marginLeft = "7%";
  playIcon.style.color = videoInfo.autoplayIconColor ?? "#fff";
  playIcon.style.textShadow = "rgba(0, 0, 0, 0.7) 1px 1px 2px";

  const textSpan = document.createElement("span");

  textSpan.id = "text_span_animated";
  textSpan.style.fontSize = "1.25rem";
  textSpan.style.maxWidth = "70%";
  textSpan.style.color = videoInfo.corText;
  textSpan.textContent =
    videoInfo?.textSuperior !== ""
      ? videoInfo?.textSuperior
      : "Seu vídeo já começou";
  textSpan.style.textShadow = "rgba(0, 0, 0, 0.7) 1px 1px 2px";
  textSpan.style.animation = videoInfo.havePulse
    ? "3500ms ease 0s infinite normal none running pulseTextVSL"
    : "none";

  const fullScreenAutoPlayStyle = document.createElement("style");

  const style = `
        #animated-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 85%;
          height: 85%;
          border: 6px solid rgba(255, 255, 255, 0.3);
          border-top: 6px solid ${videoInfo.autoplayIconColor ?? "#fff"};
          border-radius: 50%;
          animation: spin 3.5s linear infinite;
          z-index: 0;
        }

        @media (max-width: 480px) {
          #icon_play_control {
            font-size: 3rem !important;
          }

          #text_span_eyeBlur {
            font-size: 0.95rem !important;
          }
        }

        @keyframes pulseTextVSL {
          0% {
           transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `;

  fullScreenAutoPlayStyle.innerHTML = style;
  document.head.appendChild(fullScreenAutoPlayStyle);

  animatedContainer.appendChild(playIcon);

  fullScreenAutoPlay.appendChild(textSpan);
  fullScreenAutoPlay.appendChild(animatedContainer);

  autoPlayFullContainerVideo.appendChild(fullScreenAutoPlay);
  videoContainer.appendChild(autoPlayFullContainerVideo);

  if (!formOnScreen)
    autoPlayFullContainerVideo.addEventListener("click", function () {
      handleUnmuteRestart();
      sessionStorage.setItem("autoPlaySent", true);
    });
};

//====
const createAoVivo = () => {
  const aoVivoContainer = document.createElement("div");
  const aoVivoText = document.createElement("small");

  aoVivoContainer.style.position = "absolute";
  if (!videoInfo.checkedCaptureTimer) {
    aoVivoContainer.style.display = videoInfo.haveForm ? "none" : "flex";
  }

  if (videoInfo.checkedCaptureTimer) {
    aoVivoContainer.style.display = "flex";
  }

  aoVivoContainer.style.alignItems = "center";
  aoVivoContainer.id = "aoVivo";
  aoVivoContainer.style.backgroundColor =
    videoInfo.backgroundAoVivo ?? "#444";
  aoVivoContainer.style.color = videoInfo.fontColorAoVivo ?? "#fff";
  aoVivoContainer.style.borderRadius = "20px";
  aoVivoContainer.style.padding = " 5px 10px ";
  aoVivoContainer.style.top = "5%";
  aoVivoContainer.style.left = "2.5%";
  aoVivoContainer.style.zIndex = 3;
  aoVivoText.textContent = videoInfo.textAoVivo
    ? `${videoInfo.textAoVivo} - ${videoInfo?.simulationAoVivo}`
    : `Ao Vivo - ${videoInfo?.simulationAoVivo}`;
  sessionStorage.setItem("views", videoInfo?.simulationAoVivo);
  aoVivoText.id = "aoVivoText";
  const LiveIcon = document.createElement("span");
  LiveIcon.style.marginLeft = "0";
  LiveIcon.style.display = "inline-block";
  LiveIcon.style.position = "relative";
  LiveIcon.style.top = "calc(55% - 5px)";
  LiveIcon.style.backgroundColor = "red";
  LiveIcon.style.width = "10px";
  LiveIcon.style.height = "10px";
  LiveIcon.style.border = "1px solid rgba(0, 0, 0, 0.1)";
  LiveIcon.style.borderRadius = "50%";
  LiveIcon.style.zIndex = "1";
  LiveIcon.style.marginRight = "0.4rem";
  LiveIcon.style.animation = "live 1.75s ease-in-out infinite";
  LiveIcon.style.setProperty(
    "-webkit-animation",
    "live 1.75s ease-in-out infinite"
  );

  const liveKeyframes = `@keyframes live {
        0% {
          transform: translateZ(0) scale(1);
          box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
        }
        50% {
          transform: translateZ(0) scale(1.2);
        }
        100% {
          transform: translateZ(50px) scale(1);
          box-shadow: 0 0 20px 0px rgba(255, 0, 0, 0.7);
        }
      }`;

  const webkitLiveKeyframes = `@-webkit-keyframes live {
        0% {
          -webkit-transform: translateZ(0) scale(1);
          transform: translateZ(0) scale(1);
          -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
          box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
        }
        100% {
          -webkit-transform: translateZ(50px) scale(1);
          transform: translateZ(50px) scale(1);
          -webkit-box-shadow: 0 0 20px 0px rgba(255, 0, 0, 0.7);
          box-shadow: 0 0 20px 0px rgba(255, 0, 0, 0.7);
        }
      }`;

  const style = document.createElement("style");
  style.innerHTML = liveKeyframes + "\n" + webkitLiveKeyframes;
  document.head.appendChild(style);

  LiveIcon.classList.add("live");

  const handleAtualizaNumero = () => {
    let pessoas = Math.floor(Math.random() * 10) - 1;
    const min =
      Number(
        videoInfo?.simulationAoVivo ? videoInfo?.simulationAoVivo : 440
      ) - 20;
    const max =
      Number(
        videoInfo?.simulationAoVivo ? videoInfo?.simulationAoVivo : 340
      ) + 200;
    const views = Number(sessionStorage.getItem("views"));
    let novoNumero = views + pessoas;

    novoNumero = Math.max(min, Math.min(novoNumero, max));
    aoVivoText.textContent = videoInfo.textAoVivo
      ? `${videoInfo.textAoVivo} - ${novoNumero}`
      : `Ao Vivo - ${novoNumero}`;
    sessionStorage.setItem("views", novoNumero);
  };

  setInterval(handleAtualizaNumero, 2000);

  aoVivoContainer.appendChild(LiveIcon);

  aoVivoContainer.appendChild(aoVivoText);

  videoContainer.appendChild(aoVivoContainer);
};
//====
const createInitialThumb = () => {
  const circlePlay = document.getElementById("circle");

  const thumbInitial = document.createElement("img");
  thumbInitial.style.position = "absolute";
  thumbInitial.style.top = 0;

  if (videoInfo?.haveBorder) {
    thumbInitial.style.border = `4px solid ${videoInfo.borderColor}`;
  }
  if (videoInfo?.haveBorderRadius) {
    thumbInitial.style.borderRadius = "12px";
  }

  thumbInitial.style.zIndex = 2;
  thumbInitial.id = "thumbInitial";
  if (videoInfo.haveAutoPlay) {
    thumbInitial.style.display = "none";
  }
  if (!videoInfo.haveAutoPlay) {
    thumbInitial.style.display = "block";
  }
  thumbInitial.style.width = "100%";
  thumbInitial.style.height = "100%";
  thumbInitial.style.zIndex = 0;
  thumbInitial.src = videoInfo.thumbInicio;
  thumbInitial.style.cursor = "pointer";

  thumbInitial.addEventListener("click", () => {
    handleUnmuteRestart();
    thumbInitial.style.display = "none";
  });

  videoContainer.appendChild(thumbInitial);
};
//====

//========================================================================================================================
//================================================INJECT ON DE WINDOW=====================================================
//========================================================================================================================
window.setClick = setClick;
window.setThumbClick = setThumbClick;
window.handleSendCapture = handleSendCapture;
window.handleVideoLogin = handleVideoLogin;
window.handleCreateMetric = handleCreateMetric;
window.handleLasteUpdateMetric = handleLasteUpdateMetric;
window.uuId = uuId;
window.getBrowserName = getBrowserName;
window.appendScriptOnFooter = appendScriptOnFooter;
window.appendScriptOnHead = appendScriptOnHead;
