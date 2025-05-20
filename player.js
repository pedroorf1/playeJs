//************************************************************************************************************************|
//                                                   PLAYER JS WITH HSL                                                   |
//                                                  created - 01-05-2025                                                  |
//************************************************************************************************************************|

//=========================================================================================================================
//--------------------------------------------------SETUP ENVIRONMENTS-----------------------------------------------------
//=========================================================================================================================
try {
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

  //=======================================================================================================================
  // ----------------------------------------------styles and adds---------------------------------------------------------
  //=======================================================================================================================

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
  //-------------------------------------------------GLOBAL VARS-----------------------------------------------------------
  //=======================================================================================================================
  const sound =
    "data:image/svg+xml;base64,ICAgIDxzdmcgdmVyc2lvbj0iMS4xIiBmaWxsPSIjRkZGRkZGIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIg0KICAgICAgICB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjQ2Ljc1cHgiIGhlaWdodD0iMzIuNTYzcHgiIHZpZXdCb3g9IjcuOTk5IDkuMDYyIDQ2Ljc1IDMyLjU2MyINCiAgICAgICAgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyA3Ljk5OSA5LjA2MiA0Ni43NSAzMi41NjMiIHhtbDpzcGFjZT0icHJlc2VydmUiDQogICAgPg0KICAgICAgPHN0eWxlPg0KICAgICAgICBALXdlYmtpdC1rZXlmcmFtZXMgQkxJTksgew0KICAgICAgICAgIDAlIHsgb3BhY2l0eTogMDsgfQ0KICAgICAgICAgIDMzJSB7IG9wYWNpdHk6IDE7IH0NCiAgICAgICAgICA2NiUgeyBvcGFjaXR5OiAxOyB9DQogICAgICAgICAgMTAwJSB7IG9wYWNpdHk6IDA7IH0NCiAgICAgICAgfQ0KDQogICAgICAgIEBrZXlmcmFtZXMgQkxJTksgew0KICAgICAgICAgIDAlIHsgb3BhY2l0eTogMDsgfQ0KICAgICAgICAgIDMzJSB7IG9wYWNpdHk6IDE7IH0NCiAgICAgICAgICA2NiUgeyBvcGFjaXR5OiAxOyB9DQogICAgICAgICAgMTAwJSB7IG9wYWNpdHk6IDA7IH0NCiAgICAgICAgfQ0KDQogICAgICAgIC5hbmltYXRpb24gLmJsaW5rXzEgew0KICAgICAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBCTElOSyAycyBpbmZpbml0ZTsNCiAgICAgICAgICBhbmltYXRpb246IEJMSU5LIDJzIGluZmluaXRlOw0KICAgICAgICAgIG9wYWNpdHk6IDA7DQogICAgICAgIH0NCg0KICAgICAgICAuYW5pbWF0aW9uIC5ibGlua18yIHsNCiAgICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogQkxJTksgMnMgaW5maW5pdGUgLjNzOw0KICAgICAgICAgIGFuaW1hdGlvbjogQkxJTksgMnMgaW5maW5pdGUgLjNzOw0KICAgICAgICAgIG9wYWNpdHk6IDA7DQogICAgICAgIH0NCg0KICAgICAgICAuYW5pbWF0aW9uIC5ibGlua18zIHsNCiAgICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogQkxJTksgMnMgaW5maW5pdGUgLjZzOw0KICAgICAgICAgIGFuaW1hdGlvbjogQkxJTksgMnMgaW5maW5pdGUgLjZzOw0KICAgICAgICAgIG9wYWNpdHk6IDA7DQogICAgICAgIH0NCg0KICAgICAgICAuYW5pbWF0aW9uIC5zbWFydHBsYXktc3ZnLWNvbG9yIHsNCiAgICAgICAgICBmaWxsOiAnI0ZGRkZGRicgIWltcG9ydGFudDsNCiAgICAgICAgfQ0KDQogICAgICAgIC5hbmltYXRpb24uYWRqdXN0YWJsZSB7DQogICAgICAgICAgYm9yZGVyOiA0cHggc29saWQgJyNGRkZGRkYnOw0KICAgICAgICB9DQogICAgICA8L3N0eWxlPg0KDQogICAgICA8ZyBjbGFzcz0iYWRqdXN0YWJsZSBmZyBhbmltYXRpb24iPg0KICAgICAgICA8cGF0aCBjbGFzcz0ic21hcnRwbGF5LXN2Zy1jb2xvciIgZD0iTTUzLjI0OSwzOS42MTZjLTAuMTg2LDAtMC4zNzEtMC4wNTEtMC41MzctMC4xNTdsLTQzLjUtMjcuNzVjLTAuNDY2LTAuMjk3LTAuNjAzLTAuOTE2LTAuMzA2LTEuMzgxYzAuMjk4LTAuNDY2LDAuOTE3LTAuNjAxLDEuMzgxLTAuMzA2bDQzLjUsMjcuNzVjMC40NjcsMC4yOTcsMC42MDQsMC45MTYsMC4zMDcsMS4zODFDNTMuOTAxLDM5LjQ1Myw1My41NzksMzkuNjE2LDUzLjI0OSwzOS42MTZ6Ij48L3BhdGg+DQogICAgICAgIDxwYXRoIGNsYXNzPSJibGlua18zIHNtYXJ0cGxheS1zdmctY29sb3IiIGQ9Ik00OC44OTYsMzMuNDY3bDEuNjk5LDEuMDg1YzMuNDk3LTcuNzkxLDIuMDczLTE3LjI3MS00LjMxMy0yMy42NTljLTAuMzkxLTAuMzkxLTEuMDIzLTAuMzkxLTEuNDE0LDBzLTAuMzkxLDEuMDIzLDAsMS40MTRDNTAuNTgxLDE4LjAxOSw1MS45MTMsMjYuNDYzLDQ4Ljg5NiwzMy40Njd6Ij48L3BhdGg+DQogICAgICAgIDxwYXRoIGNsYXNzPSJibGlua18zIHNtYXJ0cGxheS1zdmctY29sb3IiIGQ9Ik00Ni45MjYsMzYuOTU2Yy0wLjYxMiwwLjg2My0xLjI4NiwxLjY5NS0yLjA1OSwyLjQ2OWMtMC4zOTIsMC4zOTEtMC4zOTIsMS4wMjMsMCwxLjQxNGMwLjE5NCwwLjE5NSwwLjQ1LDAuMjkzLDAuNzA3LDAuMjkzYzAuMjU2LDAsMC41MTItMC4wOTgsMC43MDYtMC4yOTNjMC44NzgtMC44NzgsMS42NDItMS44MjQsMi4zMzMtMi44MDdMNDYuOTI2LDM2Ljk1NnoiPjwvcGF0aD4NCiAgICAgICAgPHBhdGggY2xhc3M9ImJsaW5rXzIgc21hcnRwbGF5LXN2Zy1jb2xvciIgZD0iTTQyLjU0MywyOS40MTVsMS43NzcsMS4xMzVjMS41NDUtNS4zMTUsMC4yMjktMTEuMjkzLTMuOTUzLTE1LjQ3NmMtMC4zOTItMC4zOTEtMS4wMjMtMC4zOTEtMS40MTQsMGMtMC4zOTIsMC4zOTEtMC4zOTIsMS4wMjMsMCwxLjQxNEM0Mi40NTQsMTkuOTg3LDQzLjYzOSwyNC45MjUsNDIuNTQzLDI5LjQxNXoiPjwvcGF0aD4NCiAgICAgICAgPHBhdGggY2xhc3M9ImJsaW5rXzIgc21hcnRwbGF5LXN2Zy1jb2xvciIgZD0iTTQxLDMzLjE3NGMtMC41NjMsMC45NC0xLjIzNSwxLjgzNy0yLjA0NywyLjY0NmMtMC4zOTEsMC4zOTItMC4zOTEsMS4wMjMsMCwxLjQxNGMwLjE5NSwwLjE5NSwwLjQ1MSwwLjI5MywwLjcwNywwLjI5M3MwLjUxMi0wLjA5OCwwLjcwNy0wLjI5M2MwLjkxNi0wLjkxNCwxLjY3Ni0xLjkyNCwyLjMxNy0yLjk4NEw0MSwzMy4xNzR6Ij48L3BhdGg+DQogICAgICAgIDxwYXRoIGNsYXNzPSJibGlua18xIHNtYXJ0cGxheS1zdmctY29sb3IiIGQ9Ik0zNS43NzEsMjUuMDk0bDIuMDAzLDEuMjc3YzAuMDEyLTAuMjAzLDAuMDI5LTAuNDA0LDAuMDI5LTAuNjA5YzAtMy4wNzktMS4yLTUuOTc0LTMuMzgxLTguMTUzYy0wLjM5MS0wLjM5MS0xLjAyMi0wLjM5MS0xLjQxNCwwYy0wLjM5MSwwLjM5MS0wLjM5MSwxLjAyMywwLDEuNDE0QzM0LjY1MiwyMC42NjYsMzUuNjEzLDIyLjgwMiwzNS43NzEsMjUuMDk0eiI+PC9wYXRoPg0KICAgICAgICA8cGF0aCBjbGFzcz0iYmxpbmtfMSBzbWFydHBsYXktc3ZnLWNvbG9yIiBkPSJNMzUuMDg0LDI5LjQwMWMtMC40NzQsMS4xNDUtMS4xNzIsMi4xOTctMi4wNzYsMy4xYy0wLjM5MSwwLjM5MS0wLjM5MSwxLjAyMywwLDEuNDE0YzAuMTk1LDAuMTk1LDAuNDUxLDAuMjkzLDAuNzA3LDAuMjkzYzAuMjU3LDAsMC41MTMtMC4wOTgsMC43MDctMC4yOTNjMS4wMDgtMS4wMDYsMS43OTUtMi4xNywyLjM2MS0zLjQzTDM1LjA4NCwyOS40MDF6Ij48L3BhdGg+DQogICAgICAgIDxwb2x5Z29uIGNsYXNzPSJzbWFydHBsYXktc3ZnLWNvbG9yIiBwb2ludHM9IjI4LjEyNCwyMC4yMTUgMjguMTI0LDE0Ljk5MSAyNC42MzUsMTcuOTkgICI+PC9wb2x5Z29uPg0KICAgICAgICA8cGF0aCBjbGFzcz0ic21hcnRwbGF5LXN2Zy1jb2xvciIgZD0iTTIwLjkyMSwyMC4zNjZoLTYuNDIzYy0wLjU1MywwLTEsMC41MDgtMSwxLjEzNXY4LjIyOWMwLDAuNjI3LDAuNDQ3LDEuMTM1LDEsMS4xMzVoNy4zNzVsNi4yNSw1Ljg3NVYyNC45NkwyMC45MjEsMjAuMzY2eiI+PC9wYXRoPg0KICAgICAgPC9nPg0KICAgIDwvc3ZnPg0KICA=";

  window.globalState = {};
  let globalState = {};
  let videoUrl = "";
  let videoId = "";
  videoInfo = {}
  globalState.api = api_utl;
  globalState.clientHostOrigin = window.location.origin;
  const HlS = "https://cdn.jsdelivr.net/npm/hls.js@latest";
  let isLeadTest = false;
  let leadTestMainContentVideo = "";
  let allowDomain = true;

  let state = {
    countControl: 0,
    notCountingAutoPlay: false,
    clickPlay: "",
    fakeBar: "",
    continueWLeftOff: "",
    circlePlay: "",
    iPhoneAutoPlay: "",
  };

  let isMobile = false;
  if (window) isMobile = window.innerWidth <= 500;

  //=======================================================================================================================
  //-------------------------------------------------------ELEMENTS--------------------------------------------------------
  //=======================================================================================================================
  //VIDEO ELEMENT
  let videoElement = {};
  if (document.querySelector("#video")) {
    videoElement = document.querySelector("#video")
  } else {
    videoElement = document.createElement("div")
    videoElement.id = "video"
  }
  videoElement.style.display = "flex";
  videoElement.style.flexDirection = "column";

  const videoContainer = document.createElement("div");
  videoContainer.className = "video-container";
  videoContainer.style.display = "flex";
  videoContainer.style.position = "relative";
  let isAuto = false;

  const controlsContainer = document.createElement("div");
  controlsContainer.id = "container_controls"

  const containerElements = document.createElement("div");
  containerElements.className = "video-container";
  containerElements.style.display = "flex";
  containerElements.style.position = "relative";


  const playButton = document.getElementById('playButton');
  videoContainer.append(videoElement);
  videoContainer.append(controlsContainer);
  document.body.append(videoContainer);

  //=======================================================================================================================
  //-------------------------------------LOAD AND PLAY VIDEO BEFORE ANOTHER CONFIGS----------------------------------------
  //=======================================================================================================================
  (() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    videoUrl = params.get("video");
    videoId = params.get("idvideo");
    console.log({ videoUrl })
    videoElement.controls = false
    // videoUrl ? videoUrl : videoUrl = 'https://testvsl1.b-cdn.net/24b5b278-9505-4cb6-acb0-5ec5aa5987e3/ssssss/segment.m3u8';
    if (window.hls) {
      if (videoUrl) {
        window.hls.loadSource(videoUrl);
        window.hls.attachMedia(videoElement);
        window.hls.on(window.Hls.Events.MANIFEST_PARSED, function () {        // Adicionar um ouvinte para o evento canplay
          videoElement.addEventListener('canplay', function () {
            videoElement.play().catch(function (error) {
              console.error('Erro ao tentar reproduzir:', error);
            }).then(() => {
              videoElement.pause
            });
          });
        });
      }
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      videoElement.src = videoUrl;
      videoElement.addEventListener('loadedmetadata', function () {
        videoElement.play().catch(function (error) {
          console.error('Erro ao tentar reproduzir:', error);
        }).then(() => {
          videoElement.pause
        });
      });
    } else {
      console.error('HLS não é suportado neste navegador.');
    }

  })()

  //=========================================================================================================
  //---------------------------------MAIN DATA AND STATS AFTER LOADED VIDEO----------------------------------
  //=========================================================================================================

  //aplicando configurações do novo video
  window.addEventListener("load", async function () {
    videoElement.addEventListener('loadstart', function () {
      console.log('O source do vídeo foi alterado. Aplicando configurações...');
      newVideoConfigApply()
    });

    //======================================================================================================
    window.clicked = false;
    //===================================start/load session==================================================
    globalState.newSessionUserId = uuId()
    if (localStorage.getItem("lastSession")) {
      globalState.loadedSessionUserFromStorage = localStorage.getItem("lastSession")
    } else {
      globalState.loadedSessionUserFromStorage = globalState.newSessionUserId
      localStorage.setItem("lastSession", globalState.newSessionUserId)
    }

    //===================================domain data========================================================
    window.domainData = await (await fetch("https://ipinfo.io?token=571af8f75fa0e9")).json();
    // videoId = "b3f4389c-ca69-49f6-a2a8-9e00958e15ed"
    videoId = "test-ab/4efbe613-dd64-485f-aa27-c020b4d3ad94"
    globalState.videoId = videoId

    //===================================create metrics at the video========================================
    if (videoId) {
      if (videoId?.indexOf("/")) {
        await HaveTests(videoId)
      } else {
        videoInfo = await getVideoFromMongo(videoId);
      }

      await createVideo(videoInfo)
      console.log("sssssssss:::::::", { videoInfo })

      window.domainData = await (await fetch("https://ipinfo.io?token=571af8f75fa0e9")).json();
      allowDomain = !!videoInfo?.video
      const clientConnectData = {
        id_sessao: globalState?.newSessionUserId,
        id_video: videoInfo?.data.id_video,
        browser: getBrowserName(),
        plataforma: isMobile ? "Celular" : "Desktop",
        view: true,
        lastSession: globalState?.loadedSessionUserFromStorage,
        connectionData: window.domainData,
      };

      console.log({ clientConnectData })

      await handleCreateMetric(clientConnectData).catch(e => {
        console.log(e)
      })

      //============================ADD VIDEO STATS ===========================================================
      let state = {
        countControl: 0,
        notCountingAutoPlay: false,
        clickPlay: localStorage.getItem("clickPlay"),
        fakeBar: sessionStorage.getItem("fakeBar"),
        continueWLeftOff: localStorage.getItem("time"),
        circlePlay: localStorage.getItem("circlePlay"),
        iPhoneAutoPlay: sessionStorage.getItem("iPhoneAutoPlay"),
      };

      //===========================================INTERFACE TOOLS===============================================
      await appendScriptOnHead('https://kit.fontawesome.com/839085c966.js')
      await appendScriptOnHead('https://code.jquery.com/jquery-3.2.1.min.js')
      document.head.insertAdjacentHTML("beforeend", styles);

      //===========================================INTEFACE ADDS================================================


    }
  });

  //=============================================================================================================|
  //=============================================================================================================|
  //                                             GENERALS FUNCTIONS                                              |
  //=============================================================================================================|
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

  //--------------------------------------------------------------------
  const setClicks = async (id_user) => {
    const api = await fetch(`${api_utl}clicks-per-plan/${id_user}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });
    const res = api.json();
    return res;
  };

  //--------------------------------------------------------------------
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

  //----------------------------------------------------------------------
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

  //---------------------------------------------------------------------
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

  //----------------------------------------------------------------------
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

  //---------------------------------------------------------------------
  function playPauseVideo(initial = false) {
    if (initial) {
      videoElement.currentTime = 0;
      videoElement.paused
      videoElement.muted
    }
    if (videoElement.muted) {
      videoElement.muted = false;
      videoElement.loop = true;
      videoElement.currentTime = 0;
    }
    if (videoElement.paused) {
      videoElement.play();
    } else {
      videoElement.pause();
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
  async function getVideoFromMongo(videoId) {

    if (videoId?.includes("test-ab")) {
      const [_, id_AB] = videoId.split("/");
      const api = await fetch(`${api_utl}test-ab-mongo/${id_AB}/videos`, {
        headers: {
          "Content-Type": "application/json",
          "x-client-host-origin": window.location.origin,
        },
      });
      const json = await api.json();
      return json;
    }
    const api = await fetch(`${api_utl}videos/mongo/${videoId}`, {
      headers: {
        "Content-Type": "application/json",
        "x-client-ip-address": domainData ? domainData.ip : "",
        "x-client-host-origin": window.location.origin,
      },
    });
    const json = await api.json();
    return json;
  }

  //-------------------------------------------------------------------------------------------------
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

  //------------------------------------------------------------------------------------------------
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

  //-----------------------------------------------------------------------------------------------
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

  //-----------------------------------------------------------------------------------------------
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

  //----------------------------------------------------------------------------------------------
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

  //--------------------------------------------------------------------------------------------
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

  //-------------------------------------------------------------------------------------------
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

  //---------------------------------------------------------------------------------------------------------------------------
  //CREATE ELEMENTS============================================================================================================
  const createThumb = (dataThumb) => {
    console.log({ dataThumb })
    const thumbPause = document.createElement("img");
    thumbPause.style.position = "absolute";
    thumbPause.style.zIndex = 1;
    thumbPause.id = "thumbPause";
    thumbPause.style.display = "none";
    thumbPause.style.top = 0;
    if (dataThumb?.haveBorder) {
      thumbPause.style.border = `4px solid ${dataThumb?.borderColor}`;
    }
    if (dataThumb?.haveBorderRadius) {
      thumbPause.style.borderRadius = "12px";
    }
    if (dataThumb?.haveButtonThumb) {
      createThumbButton(dataThumb);
    }
    thumbPause.style.width = "100%";
    thumbPause.style.height = "100%";
    thumbPause.src = dataThumb?.thumb;
    thumbPause.style.cursor = "pointer";
    thumbPause.style.zIndex = 0;
    thumbPause.addEventListener("click", handlePlayPause);
    videoContainer.appendChild(thumbPause);
  };
  //----------------------------------------------------------------------------
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
    imgSound.style.backgroundColor = videoInfo?.autoplayIconColor ?? "#fff";
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
    if (videoInfo?.haveBorderWhite) {
      autoPlayContainer.style.border = `1px solid #fff`;
    }

    autoPlayContainer.style.display = videoInfo?.haveForm ? "none" : "flex";
    if (
      videoInfo?.checkedCaptureTimer &&
      videoInfo?.typeForm === "data-capture"
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
    if (videoInfo?.haveBorderWhite) {
      autoPlayContainer.style.border = `1px solid #fff`;
    }
    if (videoInfo?.havePulse) {
      autoPlayContainer.style.animation = "autoPlayPulseVSL 1350ms infinite";
    }

    superiorText.style.color = videoInfo?.corText;
    superiorText.style.fontWeight = 600;
    inferiorText.style.color = videoInfo?.corText;
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

  //--------------------------------------------------------------------------------

  const createVideo = async (dataVideo) => {
    createCantRunVideoImage(false, controlsContainer);// imagem informando que o video não pode ser exibido
    // const videoElement = document.createElement("video");
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
          dataVideo?.mapedVideoTimes?.includes(parsedCurrentTime) &&
          lastProcessedTime !== parsedCurrentTime
        ) {
          lastProcessedTime = parsedCurrentTime;

          const parsedTime =
            videoElement.currentTime > 1
              ? Math.ceil(videoElement.currentTime)
              : Math.floor(videoElement.currentTime);

          const lastData = {
            id_video: dataVideo?.id_video,
            id_sessao: globalState?.newSessionUserId,
            currentTime: parsedTime,
            videoDuration: dataVideo?.duration,
          };

          handleLasteUpdateMetric(lastData);
        }
      }
    };

    videoElement.poster = dataVideo?.frame ? dataVideo?.frame : "";
    videoElement.id = "my-video";
    videoElement.controls = false;
    videoElement.preload = "metadata";
    videoElement.setAttribute("playsinline", "");
    videoElement.setAttribute("webkit-playsinline", "");

    if (
      !state.continueWLeftOff &&
      !state.notCountingAutoPlay &&
      dataVideo?.haveAutoPlay
    ) {
      videoElement.setAttribute("autoplay", "");
      videoElement.setAttribute("muted", "");
      videoElement.setAttribute("loop", "");
    }

    if (dataVideo?.noneControlsMoreAutoplay) {
      videoElement.setAttribute("autoplay", "");
      videoElement.setAttribute("muted", "");
      videoElement.setAttribute("loop", "");
    }

    if (
      dataVideo?.haveAutoPlay &&
      !dataVideo?.customImage &&
      !state.continueWLeftOff &&
      !state.notCountingAutoPlay
    ) {
      if (!dataVideo?.typesAutoplay) {
        if (!dataVideo?.haveSmallTemplate) {
          console.log("Autoplay")
          createAutoPlay();
        } else if (dataVideo?.haveSmallTemplate) {
          createSmallAutoPlay();
        }
      } else {
        switch (dataVideo?.typesAutoplay) {
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
      dataVideo?.haveAutoPlay &&
      dataVideo?.customImage &&
      !dataVideo?.haveContinue
    ) {
      createCustomAutoPlay();
    }

    if (dataVideo?.haveAoVivo) {
      createAoVivo(dataVideo);
    }

    if (dataVideo?.haveHeadline) {
      createHeadline();
    }

    if (dataVideo?.haveAffiliateLink) {
      createAffiliateLogo();
    }

    if (dataVideo?.haveBorder) {
      videoElement.style.border = `4px solid ${dataVideo?.borderColor}`;
    }
    if (dataVideo?.haveBorderRadius) {
      videoContainer.style.borderRadius = "12px";
      videoElement.style.borderRadius = "12px";
    }

    if (!isIOS) {
      if (!dataVideo?.noneControlsMoreAutoplay) {
        videoElement.addEventListener("click", handlePlayPause);
      }
      videoElement.addEventListener("timeupdate", handleOnProgress);
      videoElement.addEventListener("timeupdate", progress);

      if (dataVideo?.thumbFinal) {
        videoElement.addEventListener("ended", createFinalThumb(dataVideo));
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
      videoElement.playbackRate = dataVideo?.haveTurbo
        ? dataVideo?.turboVelocity
        : 1;
    });

    const source = document.createElement("source");

    source.src = dataVideo?.video;
    source.type = "application/x-mpegURL";
    videoElement.appendChild(source);

    videoElement.loop = false;

    if (isLeadTest) {
      videoElement.loop = false;
      // videoElement.on("ended", function () {
      //   videoElement.dispose();
      //   videoInfo = leadTestMainContentVideo;
      //   createVideo();
      // });
      videoElement.addEventListener('ended', () => {
        console.log('O vídeo terminou!');
        videoElement.dispose();
        videoInfo = leadTestMainContentVideo;
        createVideo(videoInfo);
      });
    }

    videoContainer.appendChild(videoElement);
    // containerElements.appendChild(videoContainer);

    if (dataVideo?.logoImg) {
      createLogoMark(dataVideo);
    }

    if (dataVideo?.thumb) {
      createThumb(dataVideo);
    }
    if (
      dataVideo?.thumbInicio &&
      !state.continueWLeftOff &&
      !dataVideo?.noneControlsMoreAutoplay
    ) {
      videoElement.pause;
      videoElement.currentTime = 0;
      createInitialThumb(dataVideo);
    }

    if (
      dataVideo?.haveControls &&
      !dataVideo?.haveAutoPlay &&
      !dataVideo?.noneControlsMoreAutoplay
    ) {
      createControls();
    }

    if (!dataVideo?.haveAutoPlay && !dataVideo?.haveControls) {
      createCirclePlay();
    }

    if (dataVideo?.haveContinue) {
      if (state.continueWLeftOff) {
        switch (dataVideo?.typesContinue) {
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
          if (dataVideo?.haveAutoPlay && state.notCountingAutoPlay) {
            localStorage.setItem("time", videoElement.currentTime);
          }

          if (!dataVideo?.haveAutoPlay) {
            localStorage.setItem("time", videoElement.currentTime);
          }
        }
      });
    }

    if (!dataVideo?.haveContinue) {
      localStorage.removeItem("time");
    }

    if (dataVideo?.haveDelayButton) {
      if (dataVideo?.showAllTimeDelay) {
        createDelayButton();
      }
      if (!dataVideo?.showAllTimeDelay) {
        sessionStorage.setItem("haveDelayButton", dataVideo?.haveDelayButton);
        sessionStorage.setItem("initialDelay", dataVideo?.initialDelay);
        sessionStorage.setItem("endDelay", dataVideo?.endDelay);
      }
    }

    if (dataVideo?.haveForm) {
      if (dataVideo?.typeForm === "capture-password") {
        createFormPassword();
      }
      if (dataVideo?.typeForm === "data-capture") {
        createForm();
      }
      if (!dataVideo?.checkedCaptureTimer) {
        localStorage.setItem("formOnScreen", true);
        const circle = document.getElementById("circle");
        const formOnScreen = localStorage.getItem("formOnScreen");
        if (formOnScreen === "true" && circle) circle.style.display = "none";
      }
    }
  };

  //---------------------------------------------------------------------------
  const handlePlayPause = async () => {
    const isMobile = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const formOnScreen = localStorage.getItem("formOnScreen");
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
                  id_video: videoInfo?.id_video,
                  id_sessao: globalState?.newSessionUserId,
                  lastSession: globalState?.loadedSessionUserFromStorage,
                  play: true,
                };
                sendData.clickButton = true;
                handleUpdateMetric(sendData);
                localStorage.setItem("clickPlay", true);
                setClicks(videoInfo?.id_user);
              }
            }
          }
        );
      }

      if (!videoInfo?.haveControls && videoInfo?.haveFakeBar) {
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
        console.log("Video info::::::::", videoInfo)
        // videoElement.play();
        playPauseVideo();
        if (pauseElement) pauseElement.style.display = "none";
        if (circlePause) circlePause.style.display = "none";
        if (circlePlay) circlePlay.style.display = "block";
        if (playElement) playElement.style.display = "block";

        if (thumbInitial) thumbInitial.style.display = "none";

        if (videoInfo?.data.thumb) {
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

        if (videoInfo?.data.thumb) {
          if (thumbPause) thumbPause.style.display = "block";
          if (thumbButton) {
            thumbButton.style.display = "block";
            thumbButton.style.cursor = "pointer";
          }
        }

        if (videoInfo?.data.thumbInicio) {
          if (thumbInitial) thumbInitial.style.display = "none";
        }
      }
    }
  };

  //-------------------------------------------------------------------------------
  const handlePlayPauseControl = async () => {
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
                id_video: videoInfo?.id_video,
                id_sessao: globalState?.newSessionUserId,
                lastSession: globalState?.loadedSessionUserFromStorage,
                play: true,
              };
              sendData.clickButton = true;
              handleUpdateMetric(sendData);
              localStorage.setItem("clickPlay", true);
              setClicks(videoInfo?.id_user);
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
      // videoElement.play();
      playPauseVideo();

      if (videoInfo?.thumb) {
        thumbPause.style.display = "none";

        if (thumbButton) {
          thumbButton.style.display = "none";
        }
      }

      if (videoInfo?.haveAutoPlay) {
        if (circleControl) circleControl.style.display = "none";
      }

      if (thumbInitial) thumbInitial.style.display = "none";

      if (playElement) playElement.style.display = "none";
      if (playElementBottom) playElementBottom.style.display = "none";
      if (pauseElement) pauseElement.style.display = "block";
      if (pauseElementBottom) pauseElementBottom.style.display = "block";
    } else {
      videoElement.pause();

      if (videoInfo?.thumb) {
        thumbPause.style.display = "block";

        if (thumbButton) {
          thumbButton.style.display = "block";
        }
      }

      if (videoInfo?.haveAutoPlay) {
        if (circleControl) circleControl.style.display = "flex";
      }

      if (playElement) playElement.style.display = "block";
      if (playElementBottom) playElementBottom.style.display = "block";
      if (pauseElement) pauseElement.style.display = "none";
      if (pauseElementBottom) pauseElementBottom.style.display = "none";
    }
  };

  //----------------------------------------------------------------------------
  const handleUnmuteRestart = async () => {
    const isMobile = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const containerControl = document.getElementById("container_controls");
    const unMuteButton = document.getElementById("unmute-container");
    const unMuteButtonSmall = document.getElementById("unSmall-container");
    const unMuteButtonCustom = document.getElementById("unmute-custom");
    // const videoElement = document.getElementById("my-video_html5_api");
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
            id_video: videoInfo?.id_video,
            id_sessao: globalState?.newSessionUserId,
            lastSession: globalState?.loadedSessionUserFromStorage,
            play: true,
          };
          sendData.clickButton = true;
          handleUpdateMetric(sendData);
          localStorage.setItem("clickPlay", true);
          setClicks(videoInfo?.id_user);
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

    if (videoInfo?.haveAutoPlay) {
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

    if (videoInfo?.haveControls) {
      // createControls();
      if (circlePlay) circlePlay.style.display = "none";
      if (circlePause) circlePause.style.display = "block";

      if (circlePlayBottom) circlePlayBottom.style.display = "none";
      if (circlePauseBottom) circlePauseBottom.style.display = "block";
    }

    if (videoInfo?.checkedCaptureTimer) {
      if (videoElement.currentTime < videoInfo?.haveTim && containerControl) {
        containerControl.style.display = "flex";
      }
    }

    // videoElement.play();
    playPauseVideo(true);

    if (!videoInfo?.haveControls && videoInfo?.haveFakeBar) {
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

  //-------------------------------------------------------------------------------
  const handleMouseMove = async () => {
    const videoElement = document.querySelector("video");
    const controlElement = document.getElementById("container_controls");

    window.onbeforeunload = function (e) {
      sessionStorage.clear();
    };

    state.countControl = videoElement.currentTime + 3;
    if (controlElement) controlElement.style.visibility = "visible";
  };

  //---------------------------------------------------------------------------
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

    if (videoInfo?.haveAutoPlay && isAuto) {
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

    if (videoInfo?.haveRestart) {
      videoElement.addEventListener("ended", () => {
        // videoElement.play();
        playPauseVideo();
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
      videoInfo?.haveForm &&
      videoInfo?.typeForm === "data-capture" &&
      videoInfo?.checkedCaptureTimer &&
      videoElement?.currentTime >= videoInfo?.haveTime
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
  //-----------------------------------------------------------------------------------
  const handleMute = () => {
    // const videoElement = document.getElementById("my-video_html5_api");
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

  //--------------------------------------------------------------------------
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
    autoPlayContainer.src = videoInfo?.customImage;

    autoPlayContainer.style.border = `1px solid transparent`;
    if (videoInfo?.haveBorderWhite) {
      autoPlayContainer.style.border = `1px solid #fff`;
    }

    autoPlayContainer.style.display = videoInfo?.haveForm ? "none" : "flex";
    if (videoInfo?.checkedCaptureTimer)
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
    if (videoInfo?.haveBorderWhite) {
      autoPlayContainer.style.border = `1px solid #fff`;
    }
    if (videoInfo?.havePulse) {
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

  //--------------------------------------------------------------------------
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
    imgSound.style.backgroundColor = videoInfo?.autoplayIconColor ?? "#fff";
    imgSound.id = "iconSound";
    imgSound.style.marginTop = 3;
    imgSound.style.marginBottom = 3;

    if (videoInfo?.havePulse) {
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

    autoPlayContainer.style.display = videoInfo?.haveForm ? "none" : "flex";
    if (videoInfo?.checkedCaptureTimer)
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

    if (videoInfo?.haveBorderWhite) {
      autoPlayContainer.style.border = `1px solid #fff`;
    }

    superiorText.style.color = videoInfo?.corText;
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

  //----------------------------------------------------------------------------
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
    largeAutoPlay.style.animation = videoInfo?.havePulse
      ? "autoPlayPulseVSL 1350ms infinite"
      : "none";

    const playIcon = document.createElement("i");

    playIcon.id = "icon_play_large";
    playIcon.classList.add("fa-sharp");
    playIcon.classList.add("fa-regular");
    playIcon.classList.add("fa-circle-play");
    playIcon.style.fontSize = "6.25rem";
    playIcon.style.color = videoInfo?.autoplayIconColor ?? "#fff";

    const textSpan = document.createElement("span");

    textSpan.id = "text_span_large";
    textSpan.style.fontSize = "1.125rem";
    textSpan.style.fontWeight = 600;
    textSpan.style.color = videoInfo?.corText;
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

  //------------------------------------------------------------------------
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
    transparentAutoPlay.style.animation = videoInfo?.havePulse
      ? "autoPlayPulseVSL 1350ms infinite"
      : "none";

    const playIcon = document.createElement("i");

    playIcon.id = "icon_play_control";
    playIcon.classList.add("fa-solid");
    playIcon.classList.add("fa-play");
    playIcon.style.fontSize = "3.5rem";
    playIcon.style.color = videoInfo?.autoplayIconColor ?? "#fff";
    playIcon.style.textShadow = "rgba(0, 0, 0, 0.7) 1px 1px 2px";

    const textSpan = document.createElement("span");

    textSpan.id = "text_span_transparent";
    textSpan.style.fontSize = "1.125rem";
    textSpan.style.fontWeight = 600;
    textSpan.style.color = videoInfo?.corText;
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

  //-------------------------------------------------------------------------
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
    playIcon.style.color = videoInfo?.autoplayIconColor ?? "#fff";

    const titleSpan = document.createElement("span");

    titleSpan.id = "title_span_eyeBlur";
    titleSpan.style.fontSize = "1.25rem";
    titleSpan.style.maxWidth = "70%";
    titleSpan.style.fontWeight = 500;
    titleSpan.style.color = videoInfo?.corText;
    titleSpan.style.marginTop = "1rem";
    titleSpan.style.animation = videoInfo?.havePulse
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
    textSpan.style.color = videoInfo?.corText;
    textSpan.style.marginTop = "0.5rem";
    textSpan.style.animation = videoInfo?.havePulse
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

  //-----------------------------------------------------------------------
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
    playIcon.style.animation = videoInfo?.havePulse
      ? "3500ms ease 0s infinite normal none running pulseTextVSL"
      : "none";

    const titleSpan = document.createElement("span");

    titleSpan.id = "title_span_fs";
    titleSpan.style.fontSize = "1.5rem";
    titleSpan.style.maxWidth = "70%";
    titleSpan.style.fontWeight = 500;
    titleSpan.style.color = videoInfo?.corText;
    titleSpan.style.marginTop = "1rem";
    titleSpan.style.animation = videoInfo?.havePulse
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
    textSpan.style.color = videoInfo?.corText;
    textSpan.style.marginTop = "0.5rem";
    textSpan.style.animation = videoInfo?.havePulse
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

  //-----------------------------------------------------------------------
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
    playIcon.style.color = videoInfo?.autoplayIconColor ?? "#fff";
    playIcon.style.textShadow = "rgba(0, 0, 0, 0.7) 1px 1px 2px";

    const textSpan = document.createElement("span");

    textSpan.id = "text_span_animated";
    textSpan.style.fontSize = "1.25rem";
    textSpan.style.maxWidth = "70%";
    textSpan.style.color = videoInfo?.corText;
    textSpan.textContent =
      videoInfo?.textSuperior !== ""
        ? videoInfo?.textSuperior
        : "Seu vídeo já começou";
    textSpan.style.textShadow = "rgba(0, 0, 0, 0.7) 1px 1px 2px";
    textSpan.style.animation = videoInfo?.havePulse
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
          border-top: 6px solid ${videoInfo?.autoplayIconColor ?? "#fff"};
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

  //----------------------------------------------------------------------------
  const createAoVivo = (dataCreateAoVivo) => {
    const aoVivoContainer = document.createElement("div");
    const aoVivoText = document.createElement("small");

    aoVivoContainer.style.position = "absolute";
    if (!dataCreateAoVivo?.checkedCaptureTimer) {
      aoVivoContainer.style.display = dataCreateAoVivo?.haveForm ? "none" : "flex";
    }

    if (dataCreateAoVivo?.checkedCaptureTimer) {
      aoVivoContainer.style.display = "flex";
    }

    aoVivoContainer.style.alignItems = "center";
    aoVivoContainer.id = "aoVivo";
    aoVivoContainer.style.backgroundColor =
      dataCreateAoVivo?.backgroundAoVivo ?? "#444";
    aoVivoContainer.style.color = dataCreateAoVivo?.fontColorAoVivo ?? "#fff";
    aoVivoContainer.style.borderRadius = "20px";
    aoVivoContainer.style.padding = " 5px 10px ";
    aoVivoContainer.style.top = "5%";
    aoVivoContainer.style.left = "2.5%";
    aoVivoContainer.style.zIndex = 3;
    aoVivoText.textContent = dataCreateAoVivo?.textAoVivo
      ? `${dataCreateAoVivo?.textAoVivo} - ${dataCreateAoVivo?.simulationAoVivo}`
      : `Ao Vivo - ${dataCreateAoVivo?.simulationAoVivo}`;
    sessionStorage.setItem("views", dataCreateAoVivo?.simulationAoVivo);
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
          dataCreateAoVivo?.simulationAoVivo ? dataCreateAoVivo?.simulationAoVivo : 440
        ) - 20;
      const max =
        Number(
          dataCreateAoVivo?.simulationAoVivo ? dataCreateAoVivo?.simulationAoVivo : 340
        ) + 200;
      const views = Number(sessionStorage.getItem("views"));
      let novoNumero = views + pessoas;

      novoNumero = Math.max(min, Math.min(novoNumero, max));
      aoVivoText.textContent = dataCreateAoVivo?.textAoVivo
        ? `${dataCreateAoVivo?.textAoVivo} - ${novoNumero}`
        : `Ao Vivo - ${novoNumero}`;
      sessionStorage.setItem("views", novoNumero);
    };

    setInterval(handleAtualizaNumero, 2000);

    aoVivoContainer.appendChild(LiveIcon);

    aoVivoContainer.appendChild(aoVivoText);

    videoContainer.appendChild(aoVivoContainer);
  };
  //--------------------------------------------------------------------------
  const createInitialThumb = (dataThumbInitial) => {
    const thumbInitial = document.createElement("img");
    thumbInitial.style.position = "absolute";
    thumbInitial.style.top = 0;

    if (dataThumbInitial?.haveBorder) {
      thumbInitial.style.border = `4px solid ${dataThumbInitial?.borderColor}`;
    }
    if (dataThumbInitial?.haveBorderRadius) {
      thumbInitial.style.borderRadius = "12px";
    }

    thumbInitial.style.zIndex = 2;
    thumbInitial.id = "thumbInitial";
    if (dataThumbInitial?.haveAutoPlay) {
      thumbInitial.style.display = "none";
    }
    if (!dataThumbInitial?.haveAutoPlay) {
      thumbInitial.style.display = "block";
    }
    thumbInitial.style.width = "100%";
    thumbInitial.style.height = "100%";
    thumbInitial.style.zIndex = 0;
    thumbInitial.src = dataThumbInitial?.thumbInicio;
    thumbInitial.style.cursor = "pointer";

    thumbInitial.addEventListener("click", () => {
      handleUnmuteRestart();
      thumbInitial.style.display = "none";
    });

    videoContainer.appendChild(thumbInitial);
  };
  //====
  const createFinalThumb = (dataFinalThumb) => {

    console.log({ dataFinalThumb })

    const thumbFinal = document.createElement("img");
    thumbFinal.style.position = "absolute";
    thumbFinal.style.top = 0;

    if (dataFinalThumb?.haveBorder) {
      thumbFinal.style.border = `4px solid ${dataFinalThumb?.borderColor}`;
    }
    if (dataFinalThumb?.haveBorderRadius) {
      thumbFinal.style.borderRadius = "12px";
    }

    thumbFinal.style.zIndex = 4;
    thumbFinal.id = "thumbFinal";
    if (dataFinalThumb?.haveAutoPlay) {
      thumbFinal.style.display = "none";
    }
    if (!dataFinalThumb?.haveAutoPlay) {
      thumbFinal.style.display = "block";
    }

    console.log({ dataFinalThumb })
    thumbFinal.style.width = "100%";
    thumbFinal.style.height = "100%";
    thumbFinal.style.zIndex = 0;
    thumbFinal.src = dataFinalThumb?.thumbFinal;
    thumbFinal.style.cursor = "pointer";

    thumbFinal.addEventListener("click", () => {
      handleUnmuteRestart();
      thumbFinal.remove();
    });

    videoContainer.appendChild(thumbFinal);
  };
  //----------------------------------------------------------------------------
  const createThumbButton = (dataThumbButton) => {
    const buttonThumb = document.createElement("a");
    const buttonThumbText = document.createElement("p");

    buttonThumbText.textContent = dataThumbButton?.textButton;

    buttonThumb.style.position = "absolute";
    buttonThumb.style.zIndex = "999";
    buttonThumb.style.paddingTop = "1.5%";
    buttonThumb.style.paddingBottom = "1.5%";
    buttonThumb.id = "idThumb";
    buttonThumb.style.display = "none";
    buttonThumb.style.textAlign = "center";
    buttonThumb.style.textDecoration = "none";
    buttonThumb.style.backgroundColor = dataThumbButton?.backgroundButton;
    buttonThumb.style.borderRadius = "5px";
    const styleSheet = document.styleSheets[0];

    styleSheet.insertRule(
      `#idThumb:hover {
        background-color: ${dataThumbButton?.backgroundButtonHover}
        }`,
      styleSheet.cssRules.length
    );

    buttonThumbText.id = "buttonThumbText";
    buttonThumbText.style.margin = 0;
    buttonThumbText.style.color =
      dataThumbButton?.textButtonColor !== "0"
        ? dataThumbButton?.textButtonColor
        : "#f9f9f9";

    styleSheet.insertRule(
      `#buttonThumbText:hover {
          color: ${dataThumbButton?.textButtonColorHover !== "0"
        ? dataThumbButton?.textButtonColorHover
        : "#f9f9f9"
      }
        }`,
      styleSheet.cssRules.length
    );

    if (dataThumbButton?.selectedSize === "grande") {
      buttonThumb.style.width = "30%";
    }

    if (dataThumbButton?.selectedSize === "medio") {
      buttonThumb.style.width = "25%";
    }

    if (dataThumbButton?.selectedSize === "pequeno") {
      buttonThumb.style.width = "20%";
    }

    if (
      dataThumbButton?.selectedPosition === "I_Esquerda" ||
      dataThumbButton?.selectedPosition === "I_Meio" ||
      dataThumbButton?.selectedPosition === "I_Direita"
    ) {
      buttonThumb.style.bottom = "5%";
    }

    if (
      dataThumbButton?.selectedPosition === "S_Esquerda" ||
      dataThumbButton?.selectedPosition === "S_Meio" ||
      dataThumbButton?.selectedPosition === "S_Direita"
    ) {
      buttonThumb.style.top = "5%";
    }

    if (
      dataThumbButton?.selectedPosition === "M_Esquerda" ||
      dataThumbButton?.selectedPosition === "M_Direita"
    ) {
      buttonThumb.style.top = "38%";
    }

    if (
      dataThumbButton?.selectedPosition === "S_Esquerda" ||
      dataThumbButton?.selectedPosition === "M_Esquerda" ||
      dataThumbButton?.selectedPosition === "I_Esquerda"
    ) {
      buttonThumb.style.left = "20px";
    }
    if (
      dataThumbButton?.selectedPosition === "S_Direita" ||
      dataThumbButton?.selectedPosition === "M_Direita" ||
      dataThumbButton?.selectedPosition === "I_Direita"
    ) {
      buttonThumb.style.right = "20px";
    }

    if (
      dataThumbButton?.selectedPosition === "S_Meio" ||
      dataThumbButton?.selectedPosition === "I_Meio" ||
      dataThumbButton?.selectedPosition === ""
    ) {
      if (dataThumbButton?.selectedSize === "grande") {
        buttonThumb.style.left = "35%";
      }

      if (dataThumbButton?.selectedSize === "medio") {
        buttonThumb.style.left = "37%";
      }

      if (dataThumbButton?.selectedSize === "pequeno") {
        buttonThumb.style.left = "39%";
      }
    }

    buttonThumb.addEventListener("click", async (event) => {
      if (
        !(
          dataThumbButton?.textLink.startsWith("https://") ||
          dataThumbButton?.textLink.startsWith("http://")
        )
      ) {
        window.open(`https://${dataThumbButton?.textLink}`, "_blank");
      }
      return thumbClick();
    });

    buttonThumb.appendChild(buttonThumbText);
    videoContainer.appendChild(buttonThumb);
  };
  //---------------------------------------------------------------------------
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  //--------------------------------------------------------------------------
  const seek = (e) => {
    // const videoElement = document.getElementById("my-video_html5_api");
    const progress = document.getElementById("progress_control");
    const progressTracker = document.getElementById("progress_tracker");
    const progressThumb = document.getElementById("progress_thumb");

    const { left, width } = progress.getBoundingClientRect();
    const x = e.clientX - left;
    const percent = (x / width) * 100;
    progressTracker.style.width = `${percent}%`;
    progressThumb.style.right = `calc(0% - 10px)`;
    videoElement.currentTime = (percent / 100) * videoElement.duration;
  };

  //---------------------------------------------------------------------
  const handleRewind = () => {
    // const videoElement = document.getElementById("my-video_html5_api");
    videoElement.currentTime -= 10;
  };

  //--------------------------------------------------------------------------
  const handleForward = () => {
    // const videoElement = document.getElementById("my-video_html5_api");
    videoElement.currentTime += 10;
  };

  //--------------------------------------------------------------------------
  const seekHandler = (e, value) => {
    // const videoElement = document.getElementById("my-video_html5_api");
    // videoElement.currentTime = parseFloat(value);
  };

  //--------------------------------------------------------------------------
  const createControls = async () => {
    // const videoElement = document.getElementById("my-video_html5_api");
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const controlsFullContainerVideo = document.createElement("div");

    controlsFullContainerVideo.id = "controls-container";
    controlsFullContainerVideo.style.display = "flex";
    controlsFullContainerVideo.style.width = "100%";
    controlsFullContainerVideo.style.height = "100%";
    controlsFullContainerVideo.style.position = "absolute";
    controlsFullContainerVideo.style.zIndex = 4;

    const control__timer = {
      display: "flex",
      color: `${videoInfo?.controlColorIcon}`,
      marginLeft: "10px",
      width: "25%",
    };

    const containerControl = document.createElement("div");
    containerControl.id = "container_controls";
    containerControl.style.visibility = state.continueWLeftOff
      ? "hidden"
      : "visible";

    containerControl.style.position = "absolute";
    containerControl.style.top = 0;
    containerControl.style.bottom = 0;
    containerControl.style.left = 0;
    containerControl.style.right = 0;

    if (!videoInfo?.checkedCaptureTimer) {
      containerControl.style.display = videoInfo?.haveForm ? "none" : "flex";
    }

    if (videoInfo?.checkedCaptureTimer) {
      containerControl.style.display = "flex";
    }

    containerControl.style.flexDirection = "column";
    containerControl.style.zIndex = 4;
    containerControl.style.justifyContent = "space-between";
    containerControl.style.height = "100%";
    containerControl.style.borderRadius = "12px";

    const topContainer = document.createElement("div");
    topContainer.classList.add("top_container");

    const middleContainer = document.createElement("div");
    middleContainer.classList.add("mid__container");

    const bottomContainer = document.createElement("div");
    bottomContainer.classList.add("bottom_container");

    const controlBox = document.createElement("div");
    controlBox.classList.add("control__box");
    const innerControls = document.createElement("div");
    innerControls.classList.add("inner__controls");
    const leftControls = document.createElement("div");
    leftControls.classList.add("left__controls");
    const playPauseContainer = document.createElement("div");

    const progressControl = document.createElement("progress");
    progressControl.id = "progress_control";
    progressControl.max = 100;
    progressControl.value = 0;
    progressControl.style.width = "98%";
    progressControl.style.height = "4px";
    progressControl.style.appearance = "none";
    progressControl.style.cursor = "pointer";

    progressControl.style.overflow = "hidden";
    progressControl.style.setProperty(
      "--webkit-progress-value-bg-color",
      videoInfo?.controlColor
    );

    const color = videoInfo?.controlColor.split(",");
    const newColor = color.slice(0, 3).join(",") + ", 0.5)";
    progressControl.style.setProperty("--webkit-progress-bg-color", newColor);

    const progressTracker = document.createElement("div");
    progressTracker.id = "progress_tracker";
    progressTracker.style.width = "0%";
    progressTracker.style.height = "100%";
    progressTracker.style.backgroundColor = videoInfo?.controlColor;
    progressTracker.style.position = "absolute";
    progressTracker.style.top = "0";
    progressTracker.style.left = "5px";
    progressTracker.style.pointerEvents = "none";
    progressTracker.style.zIndex = "1";

    const progressThumb = document.createElement("div");
    progressThumb.id = "progress_thumb";
    progressThumb.style.width = "10px";
    progressThumb.style.height = "10px";
    progressThumb.style.backgroundColor = videoInfo?.controlColor;
    progressThumb.style.borderRadius = "50%";
    progressThumb.style.position = "absolute";
    progressThumb.style.top = "50%";
    progressThumb.style.right = "-10px";
    progressThumb.style.transform = "translate(-50%, -50%)";
    progressThumb.style.pointerEvents = "none";
    progressThumb.style.zIndex = "2";
    progressTracker.appendChild(progressThumb);

    //add a seek event

    const progressStyle = document.createElement("style");
    progressStyle.textContent = `
      #progress_control::-webkit-progress-bar {
        background-color: var(--webkit-progress-bg-color, #2e2bf1);
      }

      #progress_control::-webkit-progress-value {
        background-color: var(--webkit-progress-value-bg-color, #2e2bf1);
      }
      `;
    document.head.appendChild(progressStyle);

    const sliderContainer = document.createElement("div");

    sliderContainer.style.display = videoInfo?.haveProgresso ? "flex" : "none";
    sliderContainer.style.position = "relative";
    sliderContainer.style.justifyContent = "center";

    sliderContainer.appendChild(progressControl);
    sliderContainer.appendChild(progressTracker);

    bottomContainer.appendChild(sliderContainer);

    if (videoInfo?.haveBigPlay) {
      const circle = document.createElement("div");
      circle.id = "circle_control";
      circle.style.backgroundColor = videoInfo?.controlColor;
      circle.style.display = "block";
      circle.style.position = "absolute";
      circle.style.zIndex = 5;
      if (!videoInfo?.haveBigPlay) {
        circle.style.width = "65px";
        circle.style.height = "65px";
        circle.style.fontSize = "40px";
      }

      if (videoInfo?.haveBigPlay) {
        circle.style.width = "80px";
        circle.style.height = "80px";
        circle.style.fontSize = "50px";
      }

      circle.style.top = "50%";
      circle.style.left = "50%";
      circle.style.cursor = "pointer";
      circle.style.borderRadius = "50%";
      circle.style.display = "flex";
      circle.style.zIndex = 5;
      circle.style.justifyContent = "center";
      circle.style.alignItems = "center";
      circle.style.border = "none";
      circle.style.transform = "translate(-50%, -50%)";
      circle.style.color = videoInfo?.controlColorIcon;

      const play = document.createElement("i");
      play.id = "icon_play_control";
      play.classList.add("fa-solid");
      play.classList.add("fa-play");
      play.style.marginLeft = "7%";
      play.style.fontSize = "2rem";

      if (videoInfo?.haveAutoPlay) {
        play.style.display = "none";
      }

      const pause = document.createElement("i");
      pause.id = "icon_pause_control";
      pause.classList.add("fa-solid");
      pause.classList.add("fa-pause");
      pause.style.fontSize = "2rem";

      if (!videoInfo?.haveAutoPlay) {
        pause.style.display = "none";
      }

      circle.appendChild(play);
      circle.appendChild(pause);
      circle.addEventListener("click", handlePlayPauseControl);

      middleContainer.appendChild(circle);
    }

    if (videoInfo?.haveSmallPlay) {
      const playBottomControl = document.createElement("i");
      playBottomControl.id = "icon_play_bottom_control";
      playBottomControl.classList.add("fa-solid");
      playBottomControl.classList.add("fa-play");

      playPauseContainer.appendChild(playBottomControl);
    }

    const pauseBottomControl = document.createElement("i");
    pauseBottomControl.id = "icon_pause_bottom_control";
    pauseBottomControl.classList.add("fa-solid");
    pauseBottomControl.classList.add("fa-pause");
    pauseBottomControl.style.display = "none";

    playPauseContainer.style.color = videoInfo?.controlColorIcon;
    playPauseContainer.style.fontSize = "16px";
    playPauseContainer.style.cursor = "pointer";

    const rewindContainer = document.createElement("div");
    rewindContainer.style.display = !videoInfo?.haveRewind && "none";
    const rewindBottomControl = document.createElement("i");
    rewindBottomControl.classList.add("fa-solid");
    rewindBottomControl.classList.add("fa-backward");
    rewindContainer.appendChild(rewindBottomControl);

    const forwardContainer = document.createElement("div");
    forwardContainer.style.display = !videoInfo?.haveSkip && "none";
    const forwardBottomControl = document.createElement("i");
    forwardBottomControl.classList.add("fa-solid");
    forwardBottomControl.classList.add("fa-forward");
    forwardContainer.appendChild(forwardBottomControl);
    const mutedContainer = document.createElement("div");
    mutedContainer.id = "muted_container";

    mutedContainer.style.display = !videoInfo?.haveVolume && "none";

    const mutedBottomControl = document.createElement("i");
    mutedBottomControl.id = "icon_muted_bottom_control";
    mutedBottomControl.classList.add("fa-solid");
    mutedBottomControl.classList.add("fa-volume-xmark");
    mutedBottomControl.style.display = "none";
    mutedContainer.appendChild(mutedBottomControl);

    const unmutedBottomControl = document.createElement("i");
    unmutedBottomControl.id = "icon_unmuted_bottom_control";
    unmutedBottomControl.classList.add("fa-solid");
    unmutedBottomControl.classList.add("fa-volume-high");
    mutedContainer.appendChild(unmutedBottomControl);

    rewindContainer.style.color = videoInfo?.controlColorIcon;
    rewindContainer.style.fontSize = "16px";
    rewindContainer.style.cursor = "pointer";
    forwardContainer.style.color = videoInfo?.controlColorIcon;
    forwardContainer.style.fontSize = "16px";
    forwardContainer.style.cursor = "pointer";
    mutedContainer.style.color = videoInfo?.controlColorIcon;
    mutedContainer.style.fontSize = "16px";
    mutedContainer.style.cursor = "pointer";
    mutedContainer.addEventListener("click", handleMute);

    playPauseContainer.appendChild(pauseBottomControl);

    const timerContainer = document.createElement("div");
    timerContainer.classList.add("control__timer");
    timerContainer.style.display = !videoInfo?.haveTempoAtual && "none";
    timerContainer.style.color = videoInfo?.controlColorIcon;
    timerContainer.style.fontSize = "14px";

    const timer = document.createElement("span");
    timer.id = "timer";
    timer.textContent = "00:00";
    timer.margin = "0";

    const duration = document.createElement("span");
    duration.id = "duration";

    videoElement.onloadedmetadata = function () {
      duration.textContent = formatTime(
        this.duration || videoElement.duration
      );
    };

    duration.margin = "0";

    if (videoInfo?.haveAutoPlay) {
      bottomContainer.style.display = "none";
    }

    timerContainer.appendChild(timer);

    timerContainer.appendChild(document.createTextNode(" : "));

    timerContainer.appendChild(duration);

    rewindContainer.addEventListener("click", handleRewind);
    forwardContainer.addEventListener("click", handleForward);

    controlBox.appendChild(innerControls);
    innerControls.appendChild(leftControls);

    leftControls.appendChild(playPauseContainer);
    leftControls.appendChild(rewindContainer);
    leftControls.appendChild(forwardContainer);
    leftControls.appendChild(mutedContainer);
    leftControls.appendChild(timerContainer);

    bottomContainer.appendChild(controlBox);
    containerControl.appendChild(topContainer);
    containerControl.appendChild(middleContainer);
    containerControl.appendChild(bottomContainer);

    controlsFullContainerVideo.appendChild(containerControl);

    if (isMobile) {
      controlsFullContainerVideo.addEventListener("click", handleMouseMove);
    }
    playPauseContainer.addEventListener("click", handlePlayPauseControl);
    progressControl.addEventListener("click", seek);

    videoContainer.appendChild(controlsFullContainerVideo);
  };

  //-----------------------------------------------------------------------------
  const handleContinue = async (container) => {
    // const videoElement = document.getElementById("my-video_html5_api");
    const controlsContainer = document.getElementById("container_controls");
    const circle = document.getElementById("circle");
    const circlePlay = document.getElementById("icon_play_control");
    const circlePause = document.getElementById("icon_pause_control");
    const circlePlayBottom = document.getElementById(
      "icon_play_bottom_control"
    );
    const circlePauseBottom = document.getElementById(
      "icon_pause_bottom_control"
    );

    const time = localStorage.getItem("time");
    videoElement.currentTime = time;
    // videoElement.play();
    playPauseVideo();

    if (circle) circle.style.visibility = "hidden";
    if (circlePlay) circlePlay.style.display = "none";
    if (circlePause) circlePause.style.display = "block";
    if (circlePlayBottom) circlePlayBottom.style.display = "none";
    if (circlePauseBottom) circlePauseBottom.style.display = "block";
    if (controlsContainer) controlsContainer.style.visibility = "visible";

    if (videoInfo?.haveAutoPlay && !videoInfo?.haveControls) {
      createCirclePlay();
    }

    await Promise.resolve(localStorage.getItem("clickPlay")).then((resp) => {
      if (!resp) {
        if (!state.clickPlay) {
          const sendData = {
            id_video: videoInfo?.id_video,
            id_sessao: globalState?.newSessionUserId,
            lastSession: globalState?.loadedSessionUserFromStorage,
            play: true,
          };
          sendData.clickButton = true;
          handleUpdateMetric(sendData);
          localStorage.setItem("clickPlay", true);
          setClicks(videoInfo?.id_user);
        }
      }
    });

    container.remove();
  };

  //-----------------------------------------------------------------------------
  const handleRestart = (container) => {
    const circle = document.getElementById("circle");
    const circlePlay = document.getElementById("icon_play_control");
    const circlePause = document.getElementById("icon_pause_control");
    const circlePlayBottom = document.getElementById(
      "icon_play_bottom_control"
    );
    const circlePauseBottom = document.getElementById(
      "icon_pause_bottom_control"
    );

    if (circle) circle.style.visibility = "hidden";
    if (circlePlay) circlePlay.style.display = "none";
    if (circlePause) circlePause.style.display = "block";
    if (circlePlayBottom) circlePlayBottom.style.display = "none";
    if (circlePauseBottom) circlePauseBottom.style.display = "block";
    handleUnmuteRestart();

    container.remove();
  };

  //--------------------------------------------------------------------------
  const createContinueDefault = () => {
    const continueContainer = document.createElement("div");
    continueContainer.id = "continue_container";
    continueContainer.style.position = "absolute";
    continueContainer.style.zIndex = 999;
    continueContainer.style.display = "flex";
    continueContainer.style.justifyContent = "center";
    continueContainer.style.alignItems = "center";
    continueContainer.style.width = "100%";
    continueContainer.style.height = "100%";
    continueContainer.style.top = 0;
    continueContainer.style.backgroundColor =
      videoInfo?.backgroundContinue ?? "rbga(1,32,140,1)";
    continueContainer.style.flexDirection = "column";

    continueContainer.style.gap = "1rem";

    if (videoInfo?.haveBorder) {
      continueContainer.style.border = `2px solid ${videoInfo?.borderColor}`;
    }
    if (videoInfo?.haveBorderRadius) {
      continueContainer.style.borderRadius = "12px";
    }
    const continueText = document.createElement("h6");

    continueText.textContent = videoInfo?.textMessage
      ? videoInfo?.textMessage
      : "Você já começou a assistir esse vídeo";
    continueText.style.color = videoInfo?.continueTextColor ?? "#fff";
    continueText.style.fontSize = "24px";
    continueText.style.fontWeight = 600;
    continueText.style.margin = 0;
    continueText.style.textAlign = "center";
    continueText.id = "continueTitle";

    //create two div with a icon and a text to continue or restart the video
    const continueButton = document.createElement("div");
    continueButton.style.display = "flex";
    continueButton.style.justifyContent = "center";
    continueButton.style.alignItems = "center";
    continueButton.style.cursor = "pointer";
    continueButton.style.gap = "5px";
    continueButton.style.color = videoInfo?.continueTextColor ?? "#fff";

    const continueIcon = document.createElement("i");
    continueIcon.classList.add("fa-solid");
    continueIcon.classList.add("fa-play");
    continueIcon.style.width = "50%";
    continueIcon.style.height = "auto";
    continueIcon.classList.add("autoCentro");

    //create a new div for continueIcon
    const continueIconDiv = document.createElement("div");
    continueIconDiv.style.height = "1.5rem";
    continueIconDiv.style.width = "1.5rem";
    continueIconDiv.style.borderRadius = "200px";
    continueIconDiv.style.border = `2px solid ${videoInfo?.continueTextColor ?? "#fff"
      }`;
    continueIconDiv.style.display = "flex";
    continueIconDiv.style.alignItems = "center";
    continueIconDiv.style.justifyContent = "center";

    const autoCentro = document.createElement("style");
    autoCentro.textContent = `
        .autoCentro {
          margin-left: 2px;
        }
      `;
    document.head.appendChild(autoCentro);

    const Centro = document.createElement("style");
    Centro.textContent = `
        .Centro {
          margin-left: 1.5px;
        }
      `;
    document.head.appendChild(Centro);

    const mediaQuery = document.createElement("style");
    mediaQuery.textContent = `
        @media only screen and (min-width: 800px) {
          continueButton.style.height = "2.5rem";
          continueButton.style.width = "2.5rem";
        }
      `;
    document.head.appendChild(mediaQuery);

    continueIconDiv.appendChild(continueIcon);

    const continueTextButton = document.createElement("p");
    continueTextButton.textContent = videoInfo?.textContinue
      ? videoInfo?.textContinue
      : "Continuar";

    continueTextButton.style.fontSize = "0.9rem";
    continueTextButton.style.margin = "0";
    continueTextButton.id = "continueText";

    const mediaQuery2 = document.createElement("style");
    mediaQuery2.textContent = `
        @media only screen and (min-width: 800px) {
          continueTextButton.style.fontSize = "1.15rem";
        }
      `;
    document.head.appendChild(mediaQuery2);

    continueButton.appendChild(continueIconDiv);
    continueButton.appendChild(continueTextButton);

    //create a event when the user click in the continueButton the video will play the saved value
    continueButton.addEventListener("click", () =>
      handleContinue(continueContainer)
    );

    const restartButton = document.createElement("div");
    restartButton.style.display = "flex";
    restartButton.style.justifyContent = "center";
    restartButton.style.alignItems = "center";
    restartButton.style.cursor = "pointer";
    restartButton.style.gap = "5px";
    restartButton.style.color = videoInfo?.continueTextColor ?? "#fff";

    const restartIcon = document.createElement("i");
    restartIcon.classList.add("fa-solid");
    restartIcon.classList.add("fa-undo");
    restartIcon.style.width = "50%";
    restartIcon.style.height = "auto";
    restartIcon.style.marginRight = "2.5px";

    const restartIconDiv = document.createElement("div");
    restartIconDiv.style.height = "1.5rem";
    restartIconDiv.style.width = "1.5rem";
    restartIconDiv.style.borderRadius = "200px";
    restartIconDiv.style.border = `2px solid ${videoInfo?.continueTextColor ?? "#fff"
      }`;
    restartIconDiv.style.display = "flex";
    restartIconDiv.style.alignItems = "center";
    restartIconDiv.style.justifyContent = "center";

    restartIconDiv.appendChild(restartIcon);

    const restartTextButton = document.createElement("p");
    restartTextButton.textContent = videoInfo?.textRestart
      ? videoInfo?.textRestart
      : "Recomeçar";

    restartTextButton.style.fontSize = "0.9rem";
    restartTextButton.style.margin = "0";
    restartTextButton.id = "restartText";

    restartButton.appendChild(restartIconDiv);
    restartButton.appendChild(restartTextButton);

    restartButton.addEventListener("click", () =>
      handleRestart(continueContainer)
    );

    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "center";
    buttonContainer.style.gap = "30px";
    buttonContainer.style.alignItems = "center";

    continueContainer.appendChild(continueText);
    buttonContainer.appendChild(continueButton);
    buttonContainer.appendChild(restartButton);
    continueContainer.appendChild(buttonContainer);
    videoContainer.appendChild(continueContainer);
  };

  //--------------------------------------------------------------------------
  const createContinueSmall = () => {
    // caixa do continuar de onde parou ajustada ao tamanho do video.
    const continueContainer = document.createElement("div");
    continueContainer.id = "continue_container_small";

    continueContainer.style.position = "absolute";
    continueContainer.style.display = "flex";
    continueContainer.style.width = "100%";
    continueContainer.style.height = "100%";
    continueContainer.style.margin = "0 auto";
    continueContainer.style.flexDirection = "column";
    continueContainer.style.zIndex = "5";

    // caixa do continuar de onde parou.
    const continueBox = document.createElement("section");
    continueBox.id = "continue_box_small";
    continueBox.style.height = "40%";
    continueBox.style.width = "60%";
    continueBox.style.position = "absolute";
    continueBox.style.top = "50%";
    continueBox.style.left = "50%";
    continueBox.style.transform = "translate(-50%, -50%)";
    continueBox.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    continueBox.style.display = "flex";
    continueBox.style.justifyContent = "center";
    continueBox.style.flexDirection = "column";
    continueBox.style.alignItems = "center";
    continueBox.style.zIndex = "25";
    continueBox.style.borderRadius = "8px";

    // titulo do continuar de onde parou.
    const continueTitle = document.createElement("h6");
    continueTitle.id = "continue_title_small";
    continueTitle.style.color = videoInfo?.continueTextColor;
    continueTitle.innerText =
      videoInfo?.textContinue !== ""
        ? videoInfo?.textContinue
        : "Você já começou a assistir esse vídeo";

    // caixa dos botões do continuar de onde parou.
    const continueButtonsBox = document.createElement("div");
    continueButtonsBox.style.width = "100%";
    continueButtonsBox.style.maxWidth = "90%";
    continueButtonsBox.style.display = "flex";
    continueButtonsBox.style.alignItems = "center";
    continueButtonsBox.style.justifyContent = "center";
    continueButtonsBox.style.gap = "10px";
    continueButtonsBox.style.overflow = "auto";
    continueButtonsBox.style.whiteSpace = "nowrap";

    // botão de "continuar" do continuar de onde parou.
    const continueButtonContinue = document.createElement("button");
    continueButtonContinue.id = "continue_button";
    continueButtonContinue.innerText =
      videoInfo?.textContinue !== ""
        ? videoInfo?.textContinue
        : "Continuar assistindo?";

    // icone para o botão de continuar onde parou.
    const continueIcon = document.createElement("i");
    continueIcon.classList.add("fa-solid");
    continueIcon.classList.add("fa-play");
    continueIcon.style.width = "50%";
    continueIcon.style.height = "auto";
    continueIcon.classList.add("autoCentro");

    // botão de reiniciar do continuar de onde parou.
    const continueButtonRestart = document.createElement("button");
    continueButtonRestart.id = "continue_button_restart";
    continueButtonRestart.innerText =
      videoInfo?.textContinue !== ""
        ? videoInfo?.textContinue
        : "Continuar assistindo?";

    const continueStyling = document.createElement("style");

    continueStyling.innerHTML = `
            #continue_title_small {
              font-weight: 600;
              text-align: center;
              font-size: 1.425em;
              margin: 0;
              margin-bottom: 1.25rem;
            }

            #continue_button {
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: rgb(88, 88, 88);
              gap: 0.5rem;
              border-radius: 5px;
              border: none;
              padding: 1rem;
              min-width: 60px;
              color: #fff;
            }

            #continue_button_restart {
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: rgb(0, 170, 255);
              gap: 0.5rem;
              border-radius: 5px;
              border: none;
              padding: 1rem;
              min-width: 60px;
              color: #fff;
            }

            @media (max-width: 720px) {
              #continue_box_small {
                width: 65% !important;
                height: 45% !important;
              }

              #continue_title_small {
                font-size: 1.125rem;
              }

              #continue_button, #continue_button_restart {
                padding: 0.6rem;
                font-size: 0.85rem;
                gap: 0.3rem;
              }
            }

            @media (max-width: 550px) {
              #continue_box_small {
                width: 70% !important;
                height: 50% !important;
              }

              #continue_title_small {
                font-size: 0.95rem;
              }

              #continue_button, #continue_button_restart {
                padding: 0.6rem;
                font-size: 0.7rem;
                gap: 0.3rem;
              }
            }

            @media (max-width: 450px) {
              #continue_box_small {
                width: 75% !important;
                height: 55% !important;
              }

              #continue_title_small {
                font-size: 0.8rem;
              }

              #continue_button, #continue_button_restart {
                padding: 0.6rem;
                font-size: 0.6rem;
                gap: 0.3rem;
              }
            }

            @media (max-width: 350px) {
              #continue_box_small {
                width: 85% !important;
                height: 60% !important;
              }

              #continue_title_small {
                font-size: 0.8rem;
              }

              #continue_button, #continue_button_restart {
                padding: 0.5rem;
                font-size: 0.6rem;
                gap: 0.3rem;
              }
            }
          `;

    document.head.append(continueStyling);

    // icone para o botão de reiniciar.
    const restartIcon = document.createElement("i");
    restartIcon.classList.add("fa-solid");
    restartIcon.classList.add("fa-undo");
    restartIcon.style.width = "50%";
    restartIcon.style.height = "auto";
    restartIcon.style.marginRight = "2.5px";

    // função para avançar o vídeo para o tempo guardado antes de reiniciar a página.
    continueButtonContinue.addEventListener("click", () =>
      handleContinue(continueContainer)
    );

    // função para reiniciar o vídeo para 0.
    continueButtonRestart.addEventListener("click", () =>
      handleRestart(continueContainer)
    );

    // adicionando o icone de continuar de onde parou e de reiniciar ao inicio do botão, antes do texto.
    continueButtonContinue.prepend(continueIcon);
    continueButtonRestart.prepend(restartIcon);

    //adicionando o botão de continuar de onde parou e reiniciar ao container dos botões.
    continueButtonsBox.appendChild(continueButtonContinue);
    continueButtonsBox.appendChild(continueButtonRestart);

    continueBox.appendChild(continueTitle);
    continueBox.appendChild(continueButtonsBox);
    continueContainer.appendChild(continueBox);

    videoContainer.appendChild(continueContainer);
  };

  //--------------------------------------------------------------------------
  const createDelayButton = () => {
    const delayButton = document.createElement("a");
    delayButton.id = "delayButton";
    delayButton.style.zIndex = 10;
    delayButton.style.textAlign = "center";
    delayButton.style.textDecoration = "none";
    delayButton.textContent =
      videoInfo?.textDelayButton !== ""
        ? videoInfo?.textDelayButton
        : "Clique Aqui";
    if (videoInfo?.linkDelayButton !== "")
      delayButton.href = videoInfo?.linkDelayButton;
    delayButton.target = "_blank";
    delayButton.style.color = videoInfo?.textColorDelayButton
      ? videoInfo?.textColorDelayButton
      : "#f9f9f9";
    delayButton.style.backgroundColor = videoInfo?.backgroundDelayButton
      ? videoInfo?.backgroundDelayButton
      : "#2e2bf1";

    if (videoInfo?.sizeDelayButton === "pequeno") {
      delayButton.style.width = "30%";
    }
    if (videoInfo?.sizeDelayButton === "medio") {
      delayButton.style.width = "40%";
    }
    if (videoInfo?.sizeDelayButton === "grande") {
      delayButton.style.width = "50%";
    }

    const styleHover = document.createElement("style");
    styleHover.textContent = `
        #delayButton:hover {
          background-color: ${videoInfo?.backgroundDelayButtonHover
        ? videoInfo?.backgroundDelayButtonHover
        : "#2e2bf1"
      }!important;
          color: ${videoInfo?.textColorDelayButtonHover
        ? videoInfo?.textColorDelayButtonHover
        : "#f9f9f9"
      }!important;
        }
      `;

    document.head.appendChild(styleHover);

    if (videoInfo?.actionButtonMode === "bellowVideo") {
      delayButton.style.display = "block";
      delayButton.classList.add("bellowVideo");
      delayButton.style.borderRadius = "5px";
      delayButton.style.alignSelf = "center";
      delayButton.style.marginTop = "2%";
      delayButton.style.cursor = "pointer";
      delayButton.style.paddingTop = "1.5%";
      delayButton.style.paddingBottom = "1.5%";
      delayButton.style.zIndex = "100";
      delayButton.addEventListener("click", async (event) => {
        return thumbClick();
      });

      const bellowVideoStyle = document.createElement("style");

      bellowVideoStyle.textContent = `
          .bellowVideo {
            bottom: -16%;
          }

          @media (max-width: 410px) {
            .bellowVideo {
              bottom: -22%;
            }
          }

          @media (max-width: 305px) {
            .bellowVideo {
              bottom: -25%;
            }
          }

          @media (max-width: 288px) {
            .bellowVideo {
              bottom: -45%;
            }
          }
        `;

      document.head.appendChild(bellowVideoStyle);
    }

    if (videoInfo?.actionButtonMode === "insideVideo") {
      delayButton.style.position = "absolute";
      delayButton.style.paddingTop = "1.5%";
      delayButton.style.paddingBottom = "1.5%";
      delayButton.style.borderRadius = "5px";
      delayButton.addEventListener("click", async (event) => {
        return thumbClick();
      });

      if (videoInfo?.selectedPosition === "S_Meio") {
        delayButton.style.transform = "translate(-50%, 50%)";
        delayButton.style.left = "50%";
        delayButton.style.top = "0";
      }

      if (videoInfo?.selectedPosition === "I_Meio") {
        delayButton.style.transform = "translate(-50%, -50%)";
        delayButton.style.left = "50%";
        delayButton.style.bottom = "0";
      }

      if (videoInfo?.selectedPosition === "M_Esquerda") {
        delayButton.style.transform = "translate(-50%, -50%)";
        delayButton.style.left = "20%";
        delayButton.style.top = "50%";
      }

      if (videoInfo?.selectedPosition === "M_Direita") {
        delayButton.style.transform = "translate(50%, -50%)";
        delayButton.style.right = "20%";
        delayButton.style.top = "50%";
      }

      if (videoInfo?.selectedPosition === "S_Esquerda") {
        delayButton.style.transform = "translate(-50%, 50%)";
        delayButton.style.left = "20%";
        delayButton.style.top = "0";
      }

      if (videoInfo?.selectedPosition === "S_Direita") {
        delayButton.style.transform = "translate(50%, 50%)";
        delayButton.style.right = "20%";
        delayButton.style.top = "0";
      }
    }

    container.appendChild(delayButton);
  };

  //--------------------------------------------------------------------------
  const handleCapturePassword = async (e) => {
    e.preventDefault();
    const inputCapture = document.getElementById("inputCapture");
    const createErrorText = document.getElementById("createErrorText");

    const controls = document.getElementById("container_controls");
    const aoVivo = document.getElementById("aoVivo");
    const unmute = document.getElementById("unmute");
    const unmuteSmall = document.getElementById("unmute-small");

    const formSection = document.getElementById("formSection");

    const circlePlay = document.getElementById("circle");

    if (inputCapture.value !== "") {
      const api = await fetch(`${api_utl}capture/video-login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id_video: videoInfo?.id_video,
          password: inputCapture.value,
        }),
      });

      const json = await api.json();
      if (json.success) {
        if (aoVivo) aoVivo.style.display = "flex";
        if (unmuteSmall) unmuteSmall.style.display = "flex";
        if (unmute) unmute.style.display = "flex";
        if (controls) controls.style.display = "flex";
        if (circlePlay)
          (circlePlay.style.display = "flex"),
            (circlePlay.style.visibility = "hidden");

        formSection.remove();

        sessionStorage.setItem("formSent", true);
        localStorage.removeItem("formOnScreen");

        if (!videoInfo?.checkedCaptureTimer) {
          handleUnmuteRestart();
        }

        if (videoInfo?.checkedCaptureTimer) {
          // videoElement.play();
          playPauseVideo();
          if (aoVivo) aoVivo.style.display = "none";
          if (unmute) unmute.style.display = "none";
          if (unmuteSmall) unmuteSmall.style.display = "none";
          if (aoVivo) aoVivo.style.display = "flex";
        }
      } else {
        var start = Date.now();
        var end = start + 1650;

        function spinWheel() {
          start = Date.now();
          createErrorText.style.display = "block";
          if (start > end) {
            clearInterval(timer);
            createErrorText.style.display = "none";
          }
        }
        var timer = setInterval(spinWheel, 100);
      }
    } else {
      var start = Date.now();
      var end = start + 1650;

      function spinWheel() {
        start = Date.now();
        createErrorText.style.display = "block";
        createErrorText.innerText = "Digite uma senha válida.";
        if (start > end) {
          clearInterval(timer);
          createErrorText.style.display = "none";
        }
      }
      var timer = setInterval(spinWheel, 100);
    }
  };

  //--------------------------------------------------------------------------
  const createFormPassword = () => {
    const createFormSection = document.createElement("section");
    createFormSection.id = "formSection";
    createFormSection.style.height = "100%";
    createFormSection.style.width = "100%";
    createFormSection.style.position = "absolute";
    createFormSection.style.zIndex = 999;
    createFormSection.style.bottom = 0;
    createFormSection.style.backgroundColor = videoInfo?.captureBackgroundColor
      ? videoInfo?.captureBackgroundColor
      : "rgba(0,0,0,0.3)";
    createFormSection.style.backdropFilter = "blur(4px)";
    createFormSection.style.display = "flex";
    createFormSection.style.flexDirection = "column";
    createFormSection.style.boxSizing = "border-box";
    createFormSection.style.alignItems = "center";
    createFormSection.style.justifyContent = "center";
    if (videoInfo?.haveBorderRadius) {
      createFormSection.style.borderRadius = "12px";
    }

    const titleCapture = document.createElement("h6");
    titleCapture.id = "titleCapture";
    titleCapture.textContent = videoInfo?.captureTitle
      ? videoInfo?.captureTitle
      : "Insira a senha para acessar o vídeo";

    titleCapture.style.color = videoInfo?.captureTitleColor
      ? videoInfo?.captureTitleColor
      : "#f9f9f9";
    titleCapture.style.textAlign = "center";
    titleCapture.style.margin = "0";
    titleCapture.style.marginBottom = "0.5rem";

    const mediaQuery1 = document.createElement("style");
    mediaQuery1.textContent = `
        @media (max-width: 630px) {
          #titleCapture{
            font-size: 1rem !important;
          }
        }

        @media (max-width: 500px) {
          #titleCapture{
            font-size: 0.9rem !important;
          }
        }

        @media (max-width: 440px) {
          #titleCapture{
            font-size: 0.65rem !important;
          }
        }
      `;
    document.head.appendChild(mediaQuery1);

    //haveBigTitle ? "1.10rem" : "1rem"

    if (videoInfo?.haveCaptureBigTitle) {
      titleCapture.style.fontSize = "1.10rem";
    } else {
      titleCapture.style.fontSize = "1rem";
    }

    const createCapturePass = document.createElement("div");
    createCapturePass.id = "createCapturePass";
    createCapturePass.style.display = "flex";
    createCapturePass.style.justifyContent = "center";
    createCapturePass.style.width = "70%";
    createCapturePass.style.flexWrap = "wrap";

    createCaptureForm = document.createElement("form");
    createCaptureForm.id = "createCaptureForm";

    createCaptureForm.addEventListener("onsubmit", (e) => {
      e.preventDefault();
    });

    createCaptureForm.style.display = "flex";
    createCaptureForm.style.justifyContent = "space-between";
    createCaptureForm.style.width = "100%";

    const inputCapture = document.createElement("input");
    inputCapture.id = "inputCapture";
    const inputDiv = document.createElement("div");

    inputDiv.style.position = "relative";
    inputDiv.style.display = "flex";
    inputDiv.style.flexWrap = "wrap";
    inputDiv.style.alignItems = "stretch";
    inputDiv.style.width = "100%";
    inputDiv.style.padding = "0.15rem";

    inputCapture.style.backgroundColor = videoInfo?.captureInputColor
      ? videoInfo?.captureInputColor
      : "rgba(0,0,0,0.46)";
    inputCapture.style.position = "relative";
    inputCapture.style.color = "#b9b9b9";
    inputCapture.style.flex = "1 1 auto";
    inputCapture.style.width = "1%";
    inputCapture.style.minWidth = "0";
    inputCapture.style.border = "none";
    inputCapture.style.borderRadius = "0";
    inputCapture.style.padding = "0.875rem";

    inputCapture.placeholder = "Digite a senha";
    inputCapture.required = true;
    inputCapture.type = "password";
    const mediaQuery2 = document.createElement("style");
    mediaQuery2.textContent = `
      #inputCapture:focus {
        color: #fff;
        outline: none;
      }

      #inputCapture::placeholder {
        font-size: 0.8rem;
        font-weight: 600;
        color: #b9b9b9;
      }

        @media (max-width: 500px) {
          #buttonCapture{ font-size: 0.8rem;}
          #createAuxText{
            width:  80%
          }
          #inputCapture::placeholder {
            font-size: 0.6rem;
            font-weight: 600;
          }
        }

        @media (max-width: 440px) {
          #createAuxText{
            font-size: 0.5rem !important;
          }
        }

        @media (max-width: 630px) {
          #createAuxText{font-size: 0.8rem !important;}
        }

        @media (min-width: 700px) {
          #buttonCapture{ padding:  "15px 20px";}
          #createAuxText {
            font-size: 1rem !important;
          }
          #inputCapture{
            padding: 0.675rem;
          }
        }

        @media (min-width: 950px) {
          #inputCapture{
            padding: 1.3rem 1rem;
          }
        }

        @media (min-width: 900px) {
          #inputCapture::placeholder {
            font-size: 1rem;
            font-weight: 600;
          }
        }

      @media (min-width: 1200px) {
        #createAuxText{
          font-size: 1.5rem;
        }
      }
      `;

    document.head.appendChild(mediaQuery2);

    const buttonCapture = document.createElement("button");
    buttonCapture.id = "buttonCapture";

    buttonCapture.type = "submit";
    buttonCapture.textContent = videoInfo?.captureButtonText
      ? videoInfo?.captureButtonText
      : "Play";
    buttonCapture.style.borderRadius = "0rem";
    buttonCapture.style.border = "none";
    buttonCapture.style.color = videoInfo?.captureButtonTextColor
      ? videoInfo?.captureButtonTextColor
      : "#333";
    buttonCapture.style.backgroundColor = videoInfo?.captureButtonColor
      ? videoInfo?.captureButtonColor
      : "#f9f9f9";

    buttonCapture.style.fontSize = "0.9rem";
    buttonCapture.style.fontWeight = 600;
    buttonCapture.style.cursor = "pointer";

    buttonCapture.addEventListener("click", handleCapturePassword);

    createFormSection.appendChild(titleCapture);
    createCapturePass.appendChild(createCaptureForm);
    createFormSection.appendChild(createCapturePass);
    createCaptureForm.appendChild(inputDiv);
    inputDiv.appendChild(inputCapture);
    inputDiv.appendChild(buttonCapture);

    const ErrorMessage = localStorage.getItem("ErrorMessage");

    const createErrorText = document.createElement("h6");
    createErrorText.id = "createErrorText";

    createErrorText.textContent = videoInfo?.captureAuxText
      ? videoInfo?.captureAuxText
      : "Senha incorreta, digite novamente.";
    createErrorText.style.fontSize = "0.75rem";
    createErrorText.style.color = videoInfo?.captureAuxTextColor
      ? videoInfo?.captureAuxTextColor
      : "#f9f9f9";
    createErrorText.style.margin = "0";
    createErrorText.style.marginTop = "5px";
    createErrorText.style.textAlign = "center";
    createErrorText.style.width = "50%";
    createErrorText.style.lineHeight = "150%";
    createErrorText.style.background = "#ff4122";
    createErrorText.style.padding = "5px";
    createErrorText.style.borderRadius = "4px";
    createErrorText.style.display = "none";

    createFormSection.appendChild(createErrorText);

    if (videoInfo?.haveCaptureAuxText) {
      const createAuxText = document.createElement("h6");
      createAuxText.id = "createAuxText";

      createAuxText.textContent = videoInfo?.captureAuxText
        ? videoInfo?.captureAuxText
        : "Insira a senha fornecida pelo dono do video para receber acesso ao vídeo.";
      createAuxText.style.fontSize = "1.2rem";
      createAuxText.style.color = videoInfo?.captureAuxTextColor
        ? videoInfo?.captureAuxTextColor
        : "#f9f9f9";
      createAuxText.style.margin = "0";
      createAuxText.style.marginTop = "5px";
      createAuxText.style.textAlign = "center";
      createAuxText.style.width = "60%";
      createAuxText.style.lineHeight = "150%";

      createFormSection.appendChild(createAuxText);
    }

    videoContainer.appendChild(createFormSection);
  };

  //--------------------------------------------------------------------------
  //       create function to get the input infos and send to the api
  //--------------------------------------------------------------------------
  const handleCaptureData = async (e) => {
    e.preventDefault();

    // const videoElement = document.getElementById("my-video_html5_api");
    const actualDate = () => {
      const date = new Date();
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    };
    const name = document.getElementById("inputCapture2")?.value;
    const email = document.getElementById("inputCaptureEmail")?.value;
    const whatsapp = document.getElementById("inputCaptureNumber")?.value;

    const formSection = document.getElementById("formCaptureSection");
    const controls = document.getElementById("container_controls");
    const thumbInitial = document.getElementById("thumbInitial");
    const unmuteSmall = document.getElementById("unmute-small");
    const circlePlay = document.getElementById("circle");
    const aoVivo = document.getElementById("aoVivo");
    const unmute = document.getElementById("unmute");

    if (videoInfo?.haveInputWhatsapp) {
      if (name !== "" && email !== "" && whatsapp.length >= 10) {
        const api = await fetch(`${api_utl}capture/create`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            id_video: videoInfo?.id_video,
            data: actualDate(),
            email: email,
            telefone: whatsapp,
            nome: name,
          }),
        });

        const json = await api.json();
        if (json.success) {
          if (aoVivo) aoVivo.style.display = "flex";
          if (unmuteSmall) unmuteSmall.style.display = "flex";
          if (unmute) unmute.style.display = "flex";
          if (controls) controls.style.display = "flex";
          if (circlePlay) circlePlay.style.display = "flex";
          if (circlePlay) circlePlay.style.visibility = "hidden";
          if (thumbInitial) thumbInitial.remove();
          formSection.remove();

          sessionStorage.setItem("formSent", true);
          localStorage.removeItem("formOnScreen");

          if (!videoInfo?.checkedCaptureTimer) {
            handleUnmuteRestart();
          }

          if (videoInfo?.checkedCaptureTimer) {
            // videoElement.play();
            playPauseVideo();
            if (aoVivo) aoVivo.style.display = "none";
            if (unmute) unmute.style.display = "none";
            if (unmuteSmall) unmuteSmall.style.display = "none";
            if (aoVivo) aoVivo.style.display = "flex";
          }
        }
      }
    }

    // if (!videoInfo?.haveInputWhatsapp && name !== "" && email !== "") {
    //   const api = await fetch(`${api_utl}capture/create`, {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       id_video: videoInfo?.id_video,
    //       data: actualDate(),
    //       email: email,
    //       telefone: whatsapp,
    //       nome: name,
    //     }),
    //   });

    // const json = await api.json();
    // if (json.success) {
    //   if (aoVivo) aoVivo.style.display = "flex";
    //   if (unmuteSmall) unmuteSmall.style.display = "flex";
    //   if (unmute) unmute.style.display = "flex";
    //   if (controls) controls.style.display = "flex";
    //   if (circlePlay)
    //     (circlePlay.style.display = "flex"),
    //       (circlePlay.style.visibility = "hidden");
    //   formSection.remove();

    //   sessionStorage.setItem("formSent", true);
    //   localStorage.removeItem("formOnScreen");

    //   if (!videoInfo?.checkedCaptureTimer) {
    //     handleUnmuteRestart();
    //   }

    //   if (videoInfo?.checkedCaptureTimer) {
    //     // videoElement.play();
    //     playPauseVideo();
    //     if (aoVivo) aoVivo.style.display = "none";
    //     if (unmute) unmute.style.display = "none";
    //     if (unmuteSmall) unmuteSmall.style.display = "none";
    //     if (aoVivo) aoVivo.style.display = "flex";
    //   }
    // }
    // }
  };

  //--------------------------------------------------------------------------
  const createForm = () => {
    const createFormSection = document.createElement("section");
    createFormSection.id = "formCaptureSection";
    createFormSection.style.height = "100%";
    createFormSection.style.width = videoInfo?.checkedCaptureVertical
      ? "45%"
      : "100%";
    createFormSection.style.position = "absolute";
    createFormSection.style.zIndex = 999;
    createFormSection.style.bottom = 0;
    createFormSection.style.backgroundColor = videoInfo?.captureBackgroundColor
      ? videoInfo?.captureBackgroundColor
      : "rgba(0,0,0,0.3)";
    createFormSection.style.backdropFilter = "blur(4px)";
    createFormSection.style.display = videoInfo?.checkedCaptureTimer
      ? "none"
      : "flex";

    createFormSection.style.flexDirection = "column";
    createFormSection.style.boxSizing = "border-box";
    createFormSection.style.alignItems = "center";
    createFormSection.style.justifyContent = "center";
    if (videoInfo?.haveBorderRadius) {
      createFormSection.style.borderRadius = videoInfo?.checkedCaptureVertical
        ? "12px 0 0 12px"
        : "12px";
    }

    const titleCapture = document.createElement("h6");
    titleCapture.id = "titleCaptureData";
    titleCapture.textContent = videoInfo?.captureTitle
      ? videoInfo?.captureTitle
      : "Insira o(s) dado(s) requiridos para acessar o vídeo.";

    titleCapture.style.color = videoInfo?.captureTitleColor
      ? videoInfo?.captureTitleColor
      : "#f9f9f9";
    titleCapture.style.textAlign = "center";
    titleCapture.style.margin = "0";
    titleCapture.style.marginBottom = "0.5rem";

    const mediaQuery1 = document.createElement("style");
    mediaQuery1.textContent = `
        @media (max-width: 500px) {
          #titleCaptureData{
            font-size: 0.9rem !important;
          }
        }

        @media (max-width: 440px) {
          #titleCaptureData{
            font-size: 0.65rem !important;
          }
        }

        .NameWhatsAppTitle div:nth-child(1) {
          width: 48%;
        }

        .NameWhatsAppTitle div:nth-child(2) {
          width: 49%;
        }

        .NameWhatsAppTitle div:nth-child(3) {
          width: 100%;
        }

        @media (min-width: 550px) {
        .NameWhatsAppTitle div:nth-child(1) {
          width: 48%;
        }

        .NameWhatsAppTitle div:nth-child(2) {
          width: 49%;
        }
          .NameWhatsAppTitle div:nth-child(3) {
            width: 100%;
          }
        }

        @media (min-width: 760px) {
        .NameWhatsAppTitle div:nth-child(1) {
          width: 48%;
        }

        .NameWhatsAppTitle div:nth-child(2) {
          width: 49%;
        }

          .NameWhatsAppTitle div:nth-child(3) {
            width: 100%;
          }
        }

        @media (max-width: 360px) {
        .NameWhatsAppTitle div:nth-child(1) {
          width: 48%;
        }

        .NameWhatsAppTitle div:nth-child(2) {
          width: 48%;
        }

          .NameWhatsAppTitle div:nth-child(3) {
            width: 100%;
          }
        }

        @media (max-width: 455px) {
        .NameWhatsAppTitle div:nth-child(1) {
          width: 48%;
        }

        .NameWhatsAppTitle div:nth-child(2) {
          width: 48%;
        }

          .NameWhatsAppTitle div:nth-child(3) {
            width: 100%;
          }
        }

        @media (max-width: 350px) {
        .NameWhatsAppTitle div:nth-child(1) {
          width: 47%;
        }

        .NameWhatsAppTitle div:nth-child(2) {
          width: 47%;
        }

          .NameWhatsAppTitle div:nth-child(3) {
            width: 100%;
          }
        }

        .inputVertical div {
          width: 100% !important;
        }

        @media (min-width: 600px) {
          #inputCapture2 {
            height: 40px !important;
          }

          #inputCaptureNumber {
            height: 40px !important;
          }

          #inputCaptureEmail {
            height: 40px !important;
          }

          #buttonCaptureEmailVertical {
            height: 30px !important;
          }
        }

        @media (min-width: 860px) {
          #titleCaptureData {
            font-size: 1.45rem !important;
          }

          #inputCapture2 {
            height: 40px !important;
          }

          #inputCaptureNumber {
            height: 40px !important;
          }

          #inputCaptureEmail {
            height: 40px !important;
          }

          #buttonCaptureEmailVertical {
            height: 40px !important;
          }

          #createAuxText2Vertical {
            font-size: 1.35rem !important;
          }
        }
      `;
    document.head.appendChild(mediaQuery1);

    if (videoInfo?.haveCaptureBigTitle) {
      titleCapture.style.fontSize = "1.5rem";
    } else {
      titleCapture.style.fontSize = "1.4rem";
    }

    createFormSection.appendChild(titleCapture);

    const formContainer = document.createElement("div");
    formContainer.id = "formContainer";
    formContainer.style.display = "flex";
    formContainer.style.justifyContent = "center";
    formContainer.style.width = videoInfo?.checkedCaptureVertical
      ? "90%"
      : "75%";

    createFormSection.appendChild(formContainer);

    const createDisplayForm = document.createElement("div");
    createDisplayForm.id = "createDisplayForm2";
    createDisplayForm.style.display = "flex";
    createDisplayForm.style.justifyContent = "center";
    createDisplayForm.style.width = "100%";
    createDisplayForm.style.flexFlow = "wrap";

    createDisplayForm.classList.add("NameWhatsAppTitle");

    createDisplayForm.classList.add(
      videoInfo?.checkedCaptureVertical && "inputVertical"
    );

    formContainer.appendChild(createDisplayForm);

    const createForm = document.createElement("form");
    createForm.id = videoInfo?.checkedCaptureTimer
      ? "createCaptureForm2Vertical"
      : "createCaptureForm2";
    createForm.style.display = "flex";
    createForm.style.justifyContent = "space-between";
    createForm.style.width = "100%";
    createForm.style.flexFlow = "wrap";

    createDisplayForm.appendChild(createForm);

    const mediaQuery2 = document.createElement("style");
    mediaQuery2.textContent = `
      .inputCapture:focus {
        color: #fff;
        outline: none;
      }

      .inputCapture::placeholder {
        font-size: 0.8rem;
        font-weight: 600;
        color: #b9b9b9;
      }

      #buttonCaptureEmailVertical {
        width: auto !important;
      }


        @media (max-width: 440px) {
          #createAuxText2{
            font-size: 0.5rem !important;
          }
        }

        @media (max-width: 630px) {
          #createAuxText2Vertical {
            font-size: 0.7rem !important;
          }
        }

        @media (max-width: 500px) {
          #buttonCapture2 {
            font-size: 0.8rem;
            }

          .inputCapture::placeholder {
            font-size: 0.6rem;
            font-weight: 600;
          }

          #createAuxText2Vertical {
            font-size: 0.6rem !important;
          }

          #buttonCaptureEmailVertical {
            height: 20px !important;
          }

          #createAuxText2 {
            font-size: 0.8rem !important;
          }

          #createCaptureForm2Vertical input {
            height: 25px !important;
          }
        }

        @media (max-width: 440px) {
          #createAuxText2{
            font-size: 0.7rem !important;
          }
        }

        @media (max-width: 380px) {
          #buttonCapture2 {
            font-size: 0.8rem;
            }

          .inputCapture::placeholder {
            font-size: 0.5rem;
            font-weight: 600;
          }

          #createAuxText2Vertical {
            font-size: 0.5rem !important;
          }

          #titleCaptureData {
            font-size: 0.55rem !important;
            width: 95%;
          }

          #buttonCaptureEmailVertical {
            height: 20px !important;
            font-size: 0.5rem !important;
          }

          #createCaptureForm2Vertical input {
            height: 20px !important;
          }
        }

        @media (max-width: 350px) {
          #buttonCapture2 {
            font-size: 0.6rem;
            }

          .inputCapture::placeholder {
            font-size: 0.5rem;
            font-weight: 600;
          }

          #createAuxText2Vertical {
            font-size: 0.4rem !important;
          }

          #createAuxText2 {
            font-size: 0.55rem !important;
          }

          #titleCaptureData {
            font-size: 0.5rem !important;
            width: 95%;
          }

          #buttonCaptureEmailVertical {
            height: 15px !important;
            font-size: 0.5rem !important;
          }

          #createCaptureForm2Vertical input {
            height: 15px !important;
          }
        }

        @media (min-width: 700px) {
          #buttonCapture2{ padding:  "15px 20px";}
          #createAuxText2 {
            font-size: 1rem !important;
          }
          .inputCapture{
          }
        }

        @media (min-width: 950px) {
          .inputCapture{
          }
        }

        @media (min-width: 900px) {
          .inputCapture::placeholder {
            font-size: 1rem;
            font-weight: 600;
          }
        }

      @media (min-width: 1200px) {
        #createAuxText2{
          font-size: 1.5rem;
        }
      }
      `;

    document.head.appendChild(mediaQuery2);

    //creation of name input
    if (videoInfo?.haveInputName) {
      const inputCapture = document.createElement("input");
      inputCapture.id = "inputCapture2";
      const inputDiv = document.createElement("div");

      inputDiv.style.position = "relative";
      inputDiv.style.display = "flex";
      inputDiv.style.flexWrap = "wrap";
      inputDiv.style.alignItems = "stretch";
      inputDiv.style.width =
        videoInfo?.checkedCaptureVertical && "100% !important";
      if (
        !videoInfo?.checkedCaptureVertical &&
        !videoInfo?.haveInputEmail &&
        !videoInfo?.haveInputWhatsapp
      ) {
        inputDiv.style.width = "100%";
      }

      inputDiv.style.padding = "0.15rem";
      inputDiv.style.flexDirection =
        videoInfo?.checkedCaptureVertical && "column";
      createForm.appendChild(inputDiv);
      inputDiv.appendChild(inputCapture);

      inputCapture.style.backgroundColor = videoInfo?.captureInputColor
        ? videoInfo?.captureInputColor
        : "rgba(0,0,0,0.46)";
      inputCapture.style.position = "relative";
      inputCapture.style.color = "#b9b9b9";
      inputCapture.style.flex = "1 1 auto";
      inputCapture.style.width = "1%";
      inputCapture.style.minWidth = "0";
      inputCapture.style.border = "none";
      inputCapture.style.borderRadius = "0";
      inputCapture.style.height = videoInfo?.checkedCaptureVertical && "30px";
      inputCapture.style.width = videoInfo?.checkedCaptureVertical && "100%";
      inputCapture.style.padding =
        videoInfo?.checkedCaptureVertical && "0 0 0 10px";
      inputCapture.placeholder = "Digite seu nome";
      inputCapture.required = true;
      inputCapture.type = "text";
      inputCapture.style.height = "42px";
      inputCapture.style.height = videoInfo?.checkedCaptureVertical && "25px";
      inputCapture.style.paddingLeft = "10px";
      inputCapture.classList.add("inputCapture");

      const buttonCapture = document.createElement("button");
      buttonCapture.id = "buttonCapture";

      buttonCapture.type = "submit";
      buttonCapture.textContent = videoInfo?.captureButtonText
        ? videoInfo?.captureButtonText
        : "Play";
      buttonCapture.style.borderRadius = "0rem";
      buttonCapture.style.border = "none";
      buttonCapture.style.color = videoInfo?.captureButtonTextColor
        ? videoInfo?.captureButtonTextColor
        : "#333";
      buttonCapture.style.backgroundColor = videoInfo?.captureButtonColor
        ? videoInfo?.captureButtonColor
        : "#f9f9f9";

      buttonCapture.style.height = videoInfo?.checkedCaptureVertical && "25px";
      buttonCapture.style.marginTop =
        videoInfo?.checkedCaptureVertical && "5px";

      if (!videoInfo?.haveInputEmail) {
        buttonCapture.style.display = "none";
      } else if (!videoInfo?.haveInputWhatsapp) {
        buttonCapture.style.display = "none";
      }

      if (
        videoInfo?.haveInputName &&
        videoInfo?.haveInputWhatsapp &&
        videoInfo?.haveInputEmail
      ) {
        buttonCapture.style.display = "none";
      }

      if (
        videoInfo?.haveInputName &&
        !videoInfo?.haveInputWhatsapp &&
        !videoInfo?.haveInputEmail
      ) {
        buttonCapture.style.display = "block";
      }

      buttonCapture.style.fontSize = "0.9rem";
      buttonCapture.style.fontWeight = 600;
      buttonCapture.style.cursor = "pointer";
      buttonCapture.addEventListener("click", handleCaptureData);
      inputDiv.appendChild(buttonCapture);
    }
    //creation of number input
    if (videoInfo?.haveInputWhatsapp) {
      const inputCaptureNumber = document.createElement("input");
      inputCaptureNumber.id = "inputCaptureNumber";
      const inputDivNumber = document.createElement("div");

      inputDivNumber.style.position = "relative";
      inputDivNumber.style.display = "flex";
      inputDivNumber.style.flexWrap = "wrap";
      inputDivNumber.style.alignItems = "stretch";
      inputDivNumber.style.padding = "0.15rem";
      inputDivNumber.style.flexDirection =
        videoInfo?.checkedCaptureVertical && "column";
      createForm.appendChild(inputDivNumber);
      inputDivNumber.appendChild(inputCaptureNumber);

      if (
        !videoInfo?.checkedCaptureVertical &&
        !videoInfo?.haveInputEmail &&
        !videoInfo?.haveInputName
      ) {
        inputDivNumber.style.width = "100%";
      }

      inputCaptureNumber.style.backgroundColor = videoInfo?.captureInputColor
        ? videoInfo?.captureInputColor
        : "rgba(0,0,0,0.46)";
      inputCaptureNumber.style.position = "relative";
      inputCaptureNumber.style.color = "#b9b9b9";
      inputCaptureNumber.style.flex = "1 1 auto";
      inputCaptureNumber.style.width = "1%";
      inputCaptureNumber.style.minWidth = "0";
      inputCaptureNumber.style.border = "none";
      inputCaptureNumber.style.borderRadius = "0";
      inputCaptureNumber.style.height = "42px";
      inputCaptureNumber.style.height =
        videoInfo?.checkedCaptureVertical && "25px";
      inputCaptureNumber.style.paddingLeft = "10px";
      inputCaptureNumber.style.width =
        videoInfo?.checkedCaptureVertical && "100%";
      inputCaptureNumber.style.padding =
        videoInfo?.checkedCaptureVertical && "0 0 0 10px";

      inputCaptureNumber.placeholder = "Digite seu telefone";
      inputCaptureNumber.required = true;
      inputCaptureNumber.type = "text";
      inputCaptureNumber.className = "inputCapture";

      if (!videoInfo?.haveInputEmail) {
        const buttonCaptureNumber = document.createElement("button");
        buttonCaptureNumber.id = "buttonCaptureNumber";

        buttonCaptureNumber.type = "submit";
        buttonCaptureNumber.textContent = videoInfo?.captureButtonText
          ? videoInfo?.captureButtonText
          : "Play";
        buttonCaptureNumber.style.borderRadius = "0rem";
        buttonCaptureNumber.style.border = "none";
        buttonCaptureNumber.style.color = videoInfo?.captureButtonTextColor
          ? videoInfo?.captureButtonTextColor
          : "#333";
        buttonCaptureNumber.style.backgroundColor =
          videoInfo?.captureButtonColor
            ? videoInfo?.captureButtonColor
            : "#f9f9f9";

        buttonCaptureNumber.style.height =
          videoInfo?.checkedCaptureVertical && "30px";

        buttonCaptureNumber.style.marginTop =
          videoInfo?.checkedCaptureVertical && "5px";

        buttonCaptureNumber.style.fontSize = "0.9rem";
        buttonCaptureNumber.style.fontWeight = 600;
        buttonCaptureNumber.style.cursor = "pointer";
        buttonCaptureNumber.addEventListener("click", handleCaptureData);
        inputDivNumber.appendChild(buttonCaptureNumber);
      }
    }
    //creation of number input
    if (videoInfo?.haveInputEmail) {
      const inputCaptureEmail = document.createElement("input");
      inputCaptureEmail.id = "inputCaptureEmail";
      const inputDivEmail = document.createElement("div");

      inputDivEmail.style.position = "relative";
      inputDivEmail.style.display = "flex";
      inputDivEmail.style.flexWrap = "wrap";
      inputDivEmail.style.alignItems = "stretch";
      inputDivEmail.style.padding = "0.15rem";
      inputDivEmail.style.flexDirection =
        videoInfo?.checkedCaptureVertical && "column";
      createForm.appendChild(inputDivEmail);
      inputDivEmail.appendChild(inputCaptureEmail);

      if (
        !videoInfo?.checkedCaptureVertical &&
        !videoInfo?.haveInputName &&
        !videoInfo?.haveInputWhatsapp
      ) {
        inputDivEmail.style.width = "100%";
      }

      inputCaptureEmail.style.backgroundColor = videoInfo?.captureInputColor
        ? videoInfo?.captureInputColor
        : "rgba(0,0,0,0.46)";
      inputCaptureEmail.style.position = "relative";
      inputCaptureEmail.style.color = "#b9b9b9";
      inputCaptureEmail.style.flex = "1 1 auto";
      inputCaptureEmail.style.width = "1%";
      inputCaptureEmail.style.minWidth = "0";
      inputCaptureEmail.style.border = "none";
      inputCaptureEmail.style.borderRadius = "0";
      inputCaptureEmail.style.height = "42px";
      inputCaptureEmail.style.paddingLeft = "10px";

      inputCaptureEmail.style.height =
        videoInfo?.checkedCaptureVertical && "25px";
      inputCaptureEmail.style.width =
        videoInfo?.checkedCaptureVertical && "100%";

      inputCaptureEmail.style.padding =
        videoInfo?.checkedCaptureVertical && "0 0 0 10px";

      inputCaptureEmail.placeholder = "Digite seu email";
      inputCaptureEmail.required = true;
      inputCaptureEmail.type = "email";
      inputCaptureEmail.classList = "inputCapture";

      const buttonCaptureEmail = document.createElement("button");
      buttonCaptureEmail.id = videoInfo?.checkedCaptureVertical
        ? "buttonCaptureEmailVertical"
        : "buttonCaptureEmail";

      buttonCaptureEmail.type = "submit";
      buttonCaptureEmail.textContent = videoInfo?.captureButtonText
        ? videoInfo?.captureButtonText
        : "Play";
      buttonCaptureEmail.style.borderRadius = "0rem";
      buttonCaptureEmail.style.border = "none";
      buttonCaptureEmail.style.color = videoInfo?.captureButtonTextColor
        ? videoInfo?.captureButtonTextColor
        : "#333";
      buttonCaptureEmail.style.backgroundColor = videoInfo?.captureButtonColor
        ? videoInfo?.captureButtonColor
        : "#f9f9f9";

      buttonCaptureEmail.style.height =
        videoInfo?.checkedCaptureVertical && "30px";

      buttonCaptureEmail.style.marginTop =
        videoInfo?.checkedCaptureVertical && "5px";

      buttonCaptureEmail.style.fontSize = "0.9rem";
      buttonCaptureEmail.style.width = "60px";
      buttonCaptureEmail.style.fontWeight = 600;
      buttonCaptureEmail.style.cursor = "pointer";
      buttonCaptureEmail.style.display = "flex";
      buttonCaptureEmail.style.justifyContent = "center";
      buttonCaptureEmail.style.alignItems = "center";
      buttonCaptureEmail.addEventListener("click", handleCaptureData);
      inputDivEmail.appendChild(buttonCaptureEmail);
    }

    if (videoInfo?.haveCaptureAuxText) {
      const createAuxText = document.createElement("h6");
      createAuxText.id = videoInfo?.checkedCaptureVertical
        ? "createAuxText2Vertical"
        : "createAuxText2";
      createAuxText.textContent = videoInfo?.captureAuxText
        ? videoInfo?.captureAuxText
        : "Insira o(s) dado(s) requirido(s) e te enviaremos conteúdos exclusivos.";
      createAuxText.style.fontSize = "1rem";
      createAuxText.style.color = videoInfo?.captureAuxTextColor
        ? videoInfo?.captureAuxTextColor
        : "#f9f9f9";
      createAuxText.style.margin = "0";
      createAuxText.style.marginTop = "5px";
      createAuxText.style.textAlign = "center";
      createAuxText.style.width = videoInfo?.checkedCaptureVertical
        ? "95%"
        : "70%";
      createAuxText.style.lineHeight = "150%";

      createFormSection.appendChild(createAuxText);
    }

    if (videoInfo?.skipLead) {
      const skipLeadButton = document.createElement("button");
      skipLeadButton.id = "skipLeadButton";
      skipLeadButton.style.backgroundColor = "rgba(0,0,0,0.5)";
      skipLeadButton.style.color = "#fff";
      skipLeadButton.style.border = "none";
      skipLeadButton.style.borderRadius = "5px";
      skipLeadButton.style.padding = "0.6rem 0.9rem";
      skipLeadButton.style.fontSize = "0.8rem";
      skipLeadButton.style.cursor = "pointer";
      skipLeadButton.style.borderRadius = "5px";
      skipLeadButton.style.position = "absolute";
      skipLeadButton.style.bottom = "1rem";
      skipLeadButton.style.right = "1rem";
      skipLeadButton.style.zIndex = "10";
      skipLeadButton.style.display = "flex";
      skipLeadButton.style.gap = "0.5rem";
      skipLeadButton.style.alignItems = "center";
      skipLeadButton.innerText = "Ignorar";

      const skipLeadIcon = document.createElement("i");
      skipLeadIcon.classList.add("fa-solid");
      skipLeadIcon.classList.add("fa-angle-right");
      skipLeadIcon.style.width = "10px";
      skipLeadIcon.style.height = "10px";

      skipLeadButton.appendChild(skipLeadIcon);

      skipLeadButton.addEventListener("click", () => {
        // const videoElement = document.getElementById("my-video_html5_api");
        const controls = document.getElementById("container_controls");
        const aoVivo = document.getElementById("aoVivo");
        const unmute = document.getElementById("unmute");
        const unmuteSmall = document.getElementById("unmute-small");
        const thumbInitial = document.getElementById("thumbInitial");

        const formSection = document.getElementById("formCaptureSection");

        const circlePlay = document.getElementById("circle");

        if (aoVivo) aoVivo.style.display = "flex";
        if (unmuteSmall) unmuteSmall.style.display = "flex";
        if (unmute) unmute.style.display = "flex";
        if (controls) controls.style.display = "flex";
        if (circlePlay) circlePlay.style.display = "flex";
        if (circlePlay) circlePlay.style.visibility = "hidden";
        if (thumbInitial) thumbInitial.remove();
        formSection.remove();

        sessionStorage.setItem("formSent", true);
        localStorage.removeItem("formOnScreen");

        if (!videoInfo?.checkedCaptureTimer) {
          handleUnmuteRestart();
        }

        if (videoInfo?.checkedCaptureTimer) {
          // videoElement.play();
          playPauseVideo();
          if (aoVivo) aoVivo.style.display = "none";
          if (unmute) unmute.style.display = "none";
          if (unmuteSmall) unmuteSmall.style.display = "none";
          if (aoVivo) aoVivo.style.display = "flex";
        }
      });
      createFormSection.appendChild(skipLeadButton);
    }

    videoContainer.appendChild(createFormSection);
  };

  //--------------------------------------------------------------------------
  const createCirclePlay = async () => {
    const circleContainer = document.createElement("div");
    // const videoElement = document.getElementById("my-video_html5_api");

    circleContainer.id = "circle-container";
    circleContainer.style.display = "flex";
    circleContainer.style.width = "100%";
    circleContainer.style.height = "100%";
    circleContainer.style.position = "absolute";
    circleContainer.style.zIndex = 5;

    const circle = document.createElement("div");
    circle.id = "circle";
    circle.style.backgroundColor = videoInfo?.cor;
    circle.style.display = "flex";
    circle.style.position = "absolute";
    circle.style.width = "65px";
    circle.style.height = "65px";
    circle.style.top = "50%";
    circle.style.left = "50%";
    circle.style.cursor = "pointer";
    circle.style.borderRadius = "50%";
    circle.style.zIndex = 5;
    circle.style.justifyContent = "center";
    circle.style.alignItems = "center";
    circle.style.border = "none";
    circle.style.transform = "translate(-50%, -50%)";
    circle.style.fontSize = "80px";
    circle.style.color = "#fff";

    if (!videoInfo?.haveControls && !videoInfo?.haveAutoPlay) {
      circle.style.visibility = "visible";
    } else {
      circle.style.visibility = "hidden";
    }

    const play = document.createElement("i");
    play.id = "icon_play_control";
    play.classList.add("fa-solid");
    play.classList.add("fa-play");
    play.style.marginLeft = "7%";
    play.style.fontSize = "2rem";

    const pause = document.createElement("i");
    pause.id = "icon_pause_control";
    pause.classList.add("fa-solid");
    pause.classList.add("fa-pause");
    pause.style.fontSize = "2rem";

    if (!videoInfo?.haveControls && !videoInfo?.haveAutoPlay) {
      pause.style.display = "none";
    }

    circle.appendChild(play);
    circle.appendChild(pause);

    circleContainer.appendChild(circle);

    videoContainer.appendChild(circleContainer);

    circleContainer.addEventListener("click", handlePlayPause);
  };

  //--------------------------------------------------------------------------
  const createFakeBar = () => {
    // const videoElement = document.getElementById("my-video_html5_api");
    const progressBar = document.createElement("progress");

    progressBar.id = "progress";
    progressBar.className = "progress";
    progressBar.max = videoElement.duration.toFixed(1);

    progressBar.style.width = "100%";
    progressBar.style.height = "10px";
    progressBar.style.appearance = "none";
    progressBar.style.overflow = "hidden";
    progressBar.style.position = "absolute";
    progressBar.style.left = 0;
    progressBar.style.bottom = "0";
    progressBar.style.setProperty(
      "--webkit-progress-value-bg-color",
      videoInfo?.corBar
    );

    if (videoInfo?.haveBorderRadius) {
      progressBar.style.borderRadius = "0 0 12px 12px";
    }

    videoContainer.appendChild(progressBar);
  };

  //--------------------------------------------------------------------------
  const createCantRunVideoImage = (allowDomain, constrols) => {
    if (!!allowDomain) {
      const cantRunVideoImg = document.createElement("img");
      // videoElement.pause()
      // videoElement.muted = true
      videoUrl = null;
      videoElement.pause()
      videoElement.remove();
      constrols.remove()
      cantRunVideoImg.src =
        "https://stream.evideovsl.com.br/assets/ErrorVideoImage-BptOT_yl.jpg";
      cantRunVideoImg.style.position = 'absolute';
      cantRunVideoImg.style.top = '0';
      cantRunVideoImg.style.left = '0';
      cantRunVideoImg.style.width = '100%';
      cantRunVideoImg.style.objectFit = 'cover'; // Para cobrir o contêiner
      cantRunVideoImg.style.display = 'block'; // Exibe a imagem de erro
      videoContainer.appendChild(cantRunVideoImg);
      cantRunVideoImg.clicked = false
      console.clear()

      return
    }
  };

  //--------------------------------------------------------------------------
  const createHeadline = () => {
    const headlineContainer = document.createElement("div");
    const headline = document.createElement("h1");
    const subHeadline = document.createElement("h2");

    headlineContainer.className = "headline-container";
    headline.className = "headline";
    subHeadline.className = "sub-headline";

    headlineContainer.style.textAlign = "center";
    headlineContainer.style.width = "100%";
    headlineContainer.style.display = "flex";
    headlineContainer.style.flexDirection = "column";
    headlineContainer.style.gap = "0.675rem";
    headlineContainer.style.alignItems = "center";
    headlineContainer.style.margin = "0 0 0.625rem 0";

    if (!videoInfo?.isHTMLSelected) {
      headline.style.margin = "0";
      headline.style.color = videoInfo?.headlineColor;
      headline.style.fontFamily = videoInfo?.headlineTypeFont;
      headline.style.fontWeight = videoInfo?.headlineFontWeight;
      headline.style.fontSize =
        videoInfo?.headlineSize === "pequeno"
          ? "1.725rem"
          : videoInfo?.headlineSize === "medio"
            ? "2.5rem"
            : videoInfo?.headlineSize === "grande"
              ? "3rem"
              : null;
      headline.textContent =
        videoInfo?.headlineText !== ""
          ? videoInfo?.headlineText
          : "Não perca essa oportunidade!";

      subHeadline.style.margin = "0";
      subHeadline.style.color = videoInfo?.subHeadlineColor;
      subHeadline.style.fontFamily = videoInfo?.headlineTypeFont;
      subHeadline.style.fontWeight = videoInfo?.headlineFontWeight;
      subHeadline.style.fontSize =
        videoInfo?.subHeadlineSize === "pequeno"
          ? "1.5rem"
          : videoInfo?.subHeadlineSize === "medio"
            ? "1.875rem"
            : videoInfo?.subHeadlineSize === "grande"
              ? "2.125rem"
              : null;
      subHeadline.textContent =
        videoInfo?.subHeadlineText !== ""
          ? videoInfo?.subHeadlineText
          : "Garanta agora!";
    }

    if (videoInfo?.isHTMLSelected) {
      headline.style.margin = "0";
      headline.innerHTML = videoInfo?.headlineText;

      subHeadline.style.margin = "0";
      subHeadline.innerHTML = videoInfo?.subHeadlineText;

      const headlineStyle = document.createElement("style");
      headlineStyle.textContent = `
          .headline > *, .sub-headline > * {
            margin: 0;
            text-align: center;
          }
        `;

      document.head.appendChild(headlineStyle);
    }

    headlineContainer.appendChild(headline);
    headlineContainer.appendChild(subHeadline);

    container.appendChild(headlineContainer);
  };

  //--------------------------------------------------------------------------
  const createAffiliateLogo = () => {
    const affiliateBox = document.createElement("a");
    const affiliateLogo = document.createElement("img");

    affiliateBox.href = videoInfo?.urlAffiliate;
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
    affiliateLogo.style.opacity = videoInfo?.transparencyAffiliateLogo;

    switch (videoInfo?.selectedAffiliateLogoPosition) {
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

  //--------------------------------------------------------------------------
  const createLogoMark = (datateLogoMark) => {
    const logoMark = document.createElement("img");
    logoMark.src = datateLogoMark?.logoImg;
    logoMark.style.position = "absolute";
    logoMark.style.width = "10%";
    logoMark.style.height = "auto";
    logoMark.style.maxHeight = "100%";
    logoMark.style.maxWidth = "100%";
    logoMark.style.textAlign = "center";
    logoMark.style.overflow = "hidden";
    logoMark.style.zIndex = "25";
    logoMark.style.cursor = "pointer";
    switch (datateLogoMark?.selectedLogoPosition) {
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
      window.open(datateLogoMark?.urlLogo, "_blank");
    });
    videoContainer.appendChild(logoMark);
  };

  const HaveTests = async (videoId) => {
    const haveTestAB = videoId.includes("test-ab");
    const haveTurboAutomatic = videoId.includes("turbo");
    const haveAutoPlayTest = videoId.includes("autoplay");
    const haveLeadTest = videoId.includes("hook");
    const haveHeadlineTest = videoId.includes("headline");

    if (haveTestAB) {
      const [ref_AB, id_AB] = videoId.split("/");
      const api = await fetch(`${api_utl}test-ab-mongo/${id_AB}/videos`);
      const response = await api.json();
      console.log({ response })
      videoId = response.data.id_video
      videoInfo = response.data.video
      PlayNewVideo(videoInfo.video)
    }

    if (haveTurboAutomatic) {
      const [turboRef, turboId] = videoId.split("/");

      const turboRes = await fetch(`${api_utl}speed-test/${turboId}/videos`);

      const turboJSON = await turboRes.json();
      const turboIdVideo = turboJSON?.data.id_video;

      videoInfo = await getVideoFromMongo(turboIdVideo);
      PlayNewVideo(videoInfo.data.video)
      return videoInfo;
    }

    if (haveAutoPlayTest) {
      const [autoPlayRef, autoPlayId] = videoId.split("/");

      const autoPlayRes = await fetch(
        `${api_utl}autoplay-test/${autoPlayId}/videos`
      );

      const autoPlayJSON = await autoPlayRes.json();
      const autoPlayIdVideo = autoPlayJSON?.data.id_video;

      videoInfo = await getVideoFromMongo(autoPlayIdVideo);
      PlayNewVideo(videoInfo.data.video)
      return videoInfo;
    }

    if (haveLeadTest) {
      isLeadTest = true;
      const [leadTestRef, leadTestId] = videoId.split("/");

      const leadTestResponse = await fetch(
        `${api_utl}lead-test/${leadTestId}/videos`
      );

      const leadTesdData = await leadTestResponse.json();
      const leadTestVideoIntroId = leadTesdData?.data.intro.id_video;
      leadTestMainContentVideo = leadTesdData?.data.mainContent;

      videoInfo = await getVideoFromMongo(leadTestVideoIntroId);
      PlayNewVideo(videoInfo.data.video)
      return videoInfo;
    }

    if (haveHeadlineTest) {
      isLeadTest = true;
      const [headlineRef, headlineId] = videoId.split("/");

      const headlineRes = await fetch(
        `${api_utl}headline-test/${headlineId}/videos`
      );

      const headlineJSON = await headlineRes.json();
      const headlineIdVideo = headlineJSON?.data.id_video;

      videoInfo = await getVideoFromMongo(headlineIdVideo);
      PlayNewVideo(videoInfo.data.video)
      return videoInfo;
    }

    videoInfo = await getVideoFromMongo(videoId);
    console.log("videoInfo", videoInfo)
    PlayNewVideo(videoInfo.data.video)
    return videoInfo;
  };


  const PlayNewVideo = (videoSource) => {
    window.hls.loadSource(videoSource);
    window.hls.attachMedia(videoElement);
    window.hls.on(window.Hls.Events.MANIFEST_PARSED, function () {        // Adicionar um ouvinte para o evento canplay
      videoElement.addEventListener('canplay', function () {
        videoElement.play().catch(function (error) {
          console.error('Erro ao tentar reproduzir:', error);
        })
      });
    });

    // // Ouvinte para o evento de carregamento do vídeo
    // videoElement.addEventListener('loadeddata', function () {
    //   console.log('Novo vídeo carregado. Aplicando configurações...');
    //   aplicarConfiguracoesEspecificas();
    // });
  }

  function newVideoConfigApply() {
    createVideo(videoInfo.data)
  }
  //--------------------------------------------------------------------------

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
} catch (err) {
  console.log(err)
}