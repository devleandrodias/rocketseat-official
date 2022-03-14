# Introdução

## O que siguinifica CSS

- Cascading Style Sheet
- Código para criar estilos no HTML
- HTML é a estrutura, e o CSS é a beleza
- Não é uma linguagem de programação
- É uma linguagem Style Sheet

## Anatomia

```css
h1 {
  color: blue;
  font-size: 60px;
  background: gray;
}
```

- Selector
- Declaration
- Properties
- Property Value

## Selectors

Conecta um elemento HTML com o CSS

###

- Global selector `*`
- Element/Type selector `h1, h2, p, div`
- ID Selector `#box #container`
- Class Selector `.red, .m-4`
- Attribute selector, Pseudo-class, Pseudo-element, e outros

## Caixas

- Você irá aprender que (quase) tudo são caixas do CSS
- Posicionamento, tamanhos, espaçamentos, bordar, cores
- Caixa pode ficar ao lado uma da outra, ou acima
- Elementos HTML são caixas

## Adicionando CSS

### inline

- atributo `style`

### <style>

- tag HTML que irá conter o css

### <link>

- arquivo css externo

### @import

- arquivo css externo

## Cascata (Cascading)

A escolha do browser de qual regra aplicar, caso haja muitras regras para o mesmo elemento.

- Seu estilo é lido de cima para baixo

É levado em considreação 3 fatores

1. Origem do estilo
2. Especificidade
3. Importância

### Origem do estilo

inline > tag style > tag link

### Especificidade

É um cálculo matemático, onde, cada tipo de seletor e orim do estilo, possuem valores a serem considerados.

(0). Universal selector, combinators e negation pseudo-class (:not())
(1). Element type selector e pseudo-elements (::before, ::after)
(10). Classes e attributes selectors ([type="radio"])
(100). Id Selector
(1000). Inline

### Regra !important

- Cuidado, evite o uso
- Não é considerado boa prática
- Quebra o fluxo natural da cascata

## At-rules

- Está relacionado ao comportamento do CSS
- Começa com sinal de `@` seguido do identificador e valor

### Exemplos comuns

- @import - incluir um css externo
- @media - regras condicionais para dispositivos
- @font-face - fontes externas
- @keydframes - animation

## Shorthand

- junção de propriedades
- resumido
- légivel

```css
* {
  background: #000 url(images/bg.gif) no-repeat left top;
  font: italic bold 0.8em Arial, sans-serif;
}
```

### Detalhes

- Não irá considerar propriedades anteriores
- Valores não específicados irão assumir o valor padrão
- geralmente, a ordem descrita não importa, mas se houver muitas propriedades com valores semelhantes, poderemos encontrar problemas

### Propriedades que aceitam shorthand

- https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties

## Funções

- nome seguido de abre e fecha parenteses
- recebe argumentos

### Exemplos

```css
@import url("https://example.com/style.css");

* {
  color: rgb(255, 0, 100);
  width: calc(100% - 10px);
}
```
