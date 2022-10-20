import "./css/index.css"
import IMask from "imask"

// verificar qual é o tipo do cartão, e dependendo do cartão, a cor e a logo mudam
function setCardType(type) {
  // o type recebe qual é o cartão a ser usado
  let ccBgColor1 = document.querySelector(".cc-bg svg g g:nth-child(1) path")
  let ccBgColor2 = document.querySelector(".cc-bg svg g g:nth-child(2) path")
  let ccLogo = document.querySelector(
    "#app section div.cc-logo span:nth-child(2) img"
  )

  const colors = {
    // aqui vão as cores de cada cartão
    visa: ["#DFA43B", "#315881"],
    mastercard: ["#80530f", "#82000f"],
    elo: ["#00a4e0", "#ef4123"],
    default: ["black", "gray"],
  }

  // adicionamos cores diferentes para cada tipo de cartão
  ccBgColor1.setAttribute("fill", colors[type][0])
  ccBgColor2.setAttribute("fill", colors[type][1])
  //  a logo muda dependendo do tipo do cartão
  ccLogo.setAttribute("src", `/cc-${type}.svg`)
}

// tornando a função global para poder acessá-la no console no devtools do browser
globalThis.setCardType = setCardType

// validando o código de verificação do cartão (CVC)
let securityCode = document.querySelector("#security-code") // Pegando o elemento input, onde vai ser digitado o CVC
let securityCodePattern = {
  mask: "0000", // informando como vai ser a mascara
}
// passando a mascara para o elemento input
const securityCodeMasked = IMask(securityCode, securityCodePattern)

let expirationDate = document.querySelector("#expiration-date")
let expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    // `blocks` serve para fornecer suas próprias definições de blocos
    MM: {
      mask: IMask.MaskedRange,
      // iniciando uma configuração para um limite máximo e mínimo
      from: 1,
      to: 12,
      // de 1 até 12, ou seja, valida números que estão entre 1 e 12
    },

    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      // Pegando o ano atual com uma API (aplication programming interface) do próprio JS, e mudando seu tipo primitivo para String, e conseguindo assim, cortar os dois últimos caracteres da string utilizando o slice(2)
      to: String(new Date().getFullYear() + 9).slice(2),
      // Pegando o ano atual, somando com mais 9 anos (que é a quantidade de anos até o cartão vencer), passando para String, e cortando os dois últimos caracteres da string
      // Ou seja, o ano é valido
    },
  },
}
let expirationDateMasked = IMask(expirationDate, expirationDatePattern)

// validando o número do cartão, utilizando RegEx

// visa
// inicia com o número 4, seguido de mais 15 dígitos

// mastercard
// inicia com 5, seguido de um dígito entre 1 e 5, seguido de mais 2 dígitos
// inicia com 22, seguido de um dígito entre 2 e 9, seguido de mau 1 dígito
// inicia com 2, seguido de um dígito entre 3 e 7, seguido de mais 2 dígitos
// seguido de mais 12 dígitos

// elo
// inicia com 6504, segido de mais 12 dígitos

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
    // appended serve para que, toda vez que for digitado, cada letra será anexada (appended)

    let number = (dynamicMasked.value + appended).replace(/\D/g, "")
    // isso faz com que seja separado as letras dos números, todos os caracteres que não são dígitos, seram substituidas por "", enquanto, cada número será guardado na variável number

    let foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })

    // console.log(foundMask);
    return foundMask
  },
}

let cardNumberMasked = IMask(cardNumber, cardNumberPattern)

