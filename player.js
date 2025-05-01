window.globalState = {};
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
let globalState = {};
let videoUrl = "";
let videoId = "";
globalState.api = api_utl;
globalState.clientHostOrigin = window.location.origin;
const HlS = "https://cdn.jsdelivr.net/npm/hls.js@latest";
//------------------------------------------INJECT SCRIPTS---------------------------------------------------------------
//------------------------------------------ELEMENTS---------------------------------------------------------------------
const videoElement = document.querySelector("#video");
const videoContainer = document.createElement("div");
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
    window.hls.on(window.Hls.Events.MANIFEST_PARSED, function () {
      videoElement.play();
    });
  } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
    videoElement.src = videoUrl;
    videoElement.addEventListener('loadedmetadata', function () {
      videoElement.play();
    });
  } else {
    console.error('HLS não é suportado neste navegador.');
  }
})()
//load other stats
window.addEventListener("load", async function () {
  window.domainData = await (await fetch("https://ipinfo.io?token=571af8f75fa0e9")).json();
  console.log("Domain Data: ", domainData)
  videoId = "b3f4389c-ca69-49f6-a2a8-9e00958e15ed"
  if (videoId) {
    const dataVideo = await getVideo(videoId);
    console.log({ dataVideo })
  }

});

//=========FUNCTIONS====================

async function appendScriptOnHead(rul) {
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
  await fetch(`${API}metric/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
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

//INJECT ON DE WINDOW
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