# RegEx

Expressões regulares é uma tecnologia usada para buscar padrões dentro de textos e funciona em diversas linguagens.

Existe uma maneira correta de se pensar em expressão regular:

- Leitura da esquerda para a direita
- Ler um caractere de cada vez
- E sabe para que cada caractere faz na RegEx

Maneiras de se criar uma expressão regular:

```js
const re = /foo/

const re = new RegExp(/foo/)
```

`/foo/` - se lê: procure por um F seguido de um O e seguido por outro O

```js
const matches = "aBC".match(/[A-Z]/g)
// Output: [B, C]
```

Encontre os caracteres de A (maiúsculo) até Z (maiúsculo), o `g` é de global, para buscar no texto todo. E os caracteres encontrados, serão guardados em um array.

```js
const index = "aBC".search(/[A-Z]/)
// Output: 1
```

Pesquise se há ou não um padrão retorna um valor binário booleano. (1 para `true` e 0 para `false`)

```js
const next = "aBC".replace(/a/, "A")
// Output: ABC
```

Procure nesse texto, o caractere `a` e substitua por `A` maiúsculo.

# Cheatsheets - Folhas de dicas

## Básico

- `\` Usar caracteres especiais dentro de RegEx
- `()` Agrupador
- `|` OU lógico
- `Iae mano` Pesquisa exata
- `^Hey` Procurar essa palavra no início da string
- `Bye$` Procurar essa palavra no final da string

## Colchetes

- `[xyz]` qualquer texto que tenha x, y ou z
- `[O-X]` qualquer caractere entre O e X
- `[^xyz]` texto que não tenha nenhum x, y ou z

## Classes de caracteres

