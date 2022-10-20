import "./css/index.css"
import IMask from "imask"

function setCardType(type) {
  let ccBgColor1 = document.querySelector(".cc-bg svg g g:nth-child(1) path")
  let ccBgColor2 = document.querySelector(".cc-bg svg g g:nth-child(2) path")
  let ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

  const colors = {
    visa: ["#DFA43B", "#315881"],
    mastercard: ["#80530f", "#82000f"],
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
      cardtype: "elo",
      regex: /^6504\d{0,12}/,
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
