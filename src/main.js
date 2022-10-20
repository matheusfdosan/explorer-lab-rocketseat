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
      to: String(new Date().getFullYear() + 5).slice(2),
      // Pegando o ano atual, somando com mais 5 anos (que é a quantidade de anos até o cartão vencer), passando para String, e cortando os dois últimos caracteres da string
      // Ou seja, o ano é valido
    },
  },
}
let expirationDateMasked = IMask(expirationDate, expirationDatePattern)
