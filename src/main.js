import "./css/index.css"
import IMask from "imask"

function setCardType(type) {
  let ccBgColor1 = document.querySelector(".cc-bg svg g g:nth-child(1) path")
  let ccBgColor2 = document.querySelector(".cc-bg svg g g:nth-child(2) path")
  let ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

  const colors = {
    visa: ["#DFA43B", "#315881"],
    mastercard: ["#80530f", "#82000f"],
    amex: ["#0077A6", "#00f"],
    cabal: ["#ffffff37", "#183867"],
    sorocred: ["#fff45", "#EDD56C"],
    diners: ["#ffffff57", "#383E93"],
    elo: ["#00a4e0", "#ef4123"],
    default: ["black", "gray"],
  }

  ccBgColor1.setAttribute("fill", colors[type][0])
  ccBgColor2.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `/cc-${type}.svg`)
}

let securityCode = document.querySelector("#security-code")
let securityCodePattern = {
  mask: "0000",
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

let expirationDate = document.querySelector("#expiration-date")
let expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },

    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 9).slice(2),
    },
  },
}
let expirationDateMasked = IMask(expirationDate, expirationDatePattern)

let cardNumber = document.querySelector("#card-number")
let cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      cardtype: "visa",
      regex: /^4\d{0,15}/,
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "mastercard",
      regex: /(5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "sorocred",
      regex: /^627892|^636414/,
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "cabal",
      regex: /(60420[1-9]|6042[1-9][0-9]|6043[0-9]{2}|604400)/,
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "amex",
      regex: /^3[47][0-9]{0,13}/,
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "diners",
      regex: /36[0-8][0-9]{3}|369[0-8][0-9]{2}|3699[0-8][0-9]|36999[0-9]/,
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "elo",
      regex:
        /^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|^627780|^63(6297|6368|6369)|^65(0(0(3([1-3]|[5-9])|4([0-9])|5[0-1])|4(0[5-9]|[1-3][0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8]|4[1-9]|[5-8][0-9]|9[0-8])|7(0[0-9]|1[0-8]|2[0-7])|9(0[1-9]|[1-6][0-9]|7[0-8]))|16(5[2-9]|[6-7][0-9])|50(0[0-9]|1[0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/,
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    let number = (dynamicMasked.value + appended).replace(/\D/g, "")

    let foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })

    return foundMask
  },
}
let cardNumberMasked = IMask(cardNumber, cardNumberPattern)

let addButton = document.querySelector("#add-card")
addButton.addEventListener("click", () => {
  window.alert("Cartão Adicionado!")
})

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault()
})

cardNumberMasked.on("accept", () => {
  let cardtype = cardNumberMasked.masked.currentMask.cardtype
  setCardType(cardtype)
  updateCardNumber(cardNumberMasked.value)
})
function updateCardNumber(code) {
  let ccCardNumber = document.querySelector(".cc-number")
  ccCardNumber.innerText = code.length === 0 ? "0000 0000 0000 0000" : code
}

let cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  let ccHolder = document.querySelector(".cc-holder .value")

  ccHolder.innerText =
    cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
})

expirationDateMasked.on("accept", () =>
  updateExpirationDate(expirationDateMasked.value)
)
function updateExpirationDate(date) {
  let ccExpiration = document.querySelector(".cc-expiration .value")
  ccExpiration.innerText = date.length === 0 ? "02/32" : date
}

securityCodeMasked.on("accept", () =>
  updateSecurityCode(securityCodeMasked.value)
)

function updateSecurityCode(code) {
  let ccSecurity = document.querySelector(".cc-security .value")
  ccSecurity.innerText = code.length === 0 ? "1234" : code
}
