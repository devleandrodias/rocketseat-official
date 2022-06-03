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

### style

- tag HTML que irá conter o css

### link

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

## Valores e unidades de medidas

- cada propriedade possui valores `property: value`
- estudos constantes a fim de entender as propriedade e seus valores

### Tipos numéricos

- <integer> Número inteiro como -10 ou 223
- <number> Número decimal como -2.4, 54 ou 0.341
- <dimension> É um <number> com uma unidade junto: 90deg. 2s, 8px
- <perecentagem> Representa a fração de outro número

### Unidades comuns

- <length> Representa um valor de distância: px, em, vw
- <angle> Representa um ângulo: deg, rad, turn
- <time> Representa um tempo s, ms
- <resolution> Representa resoluções para dispositivos: dpi

### Distâncias absolutas <length>

- São fixas e não alteram seu valor

| Unidade | Nome               | Equivalência        |
| ------- | ------------------ | ------------------- |
| cm      | Centímetro         | 1cm = 96px/2.54     |
| in      | Inches (polegadas) | 1in = 2.54cm = 96px |
| px      | Pixes              | 1px = 1/96th of 1in |

- O mais comun e mais utilizado é o **px**
- Não recomendado usar o **cm**

### Distâncias relativas

- São relativas a algum outro valor, pode ser o elemento pai, ou root, ou o tamanho da tela

* Benefícios: Maior adaptação aos diferentes tipos de tela

| Unidade | Relativo a                                    |
| ------- | --------------------------------------------- |
| em      | Tamanho da fonte do pai                       |
| rem     | Tamanho da fonte do elemento raiz (root/html) |
| vw      | 1% da viewport width                          |
| vh      | 1% da viewport height                         |

### Porcentagens %

- Em muitos casos é tratado da mesma maneira que as distâncias <length>
- Sempre será relativo a algum valor

### Posições <position>

- Representa um conjunto de coordenadas 2D:
- Top, Right, Bottom, Left, Center
- Usado para alguns tipos de propriedades
- Não confundir com a propriedade `position`

### Funções

- Em programação, funções são reconhecidas por causar um reaproveitamento de código

* rgb()
* hsl()
* url()
* calc()

### Strings e identificadores

- Strings: Texto envolto em aspas
- Identificadores: red, black, gold

## Box Model

- Fundamental para fazer layouts para a web
- Maior facilidade para aplicar o CSS

### O que é?

- Uma caixa retangular
- Essa caixa possui propriedades de uma caixa (2D)

| Nome                        | Propriedade     |
| --------------------------- | --------------- |
| Tamanho (largura \* altura) | width \* height |
| Conteúdo                    | content         |
| Bordas                      | border          |
| Preenchimento interno       | padding         |
| Espaços fora da caixa       | margin          |

- Cada elemento na sua página, será considerado uma caixa

### Box-Sizing

- Como será calculado o tamanho total da caixa

- content-box | border-box

```css
div {
  box-sizing: border-box;
}
```

### display: block vs inline

- Como as caixas se comportam em relação às outras caixas
- Comportamento externo das caixas

| **block**                                                      | **inline**                                              |
| -------------------------------------------------------------- | ------------------------------------------------------- |
| Ocupa toda a linha, colocando o próximo elemento abaixo desses | Elemento ao ladodo outro                                |
| Width e height são respeitados                                 | Width e height não funcionam                            |
| Padding, margin, border irão funcionar normalmente             | Somente valores horizontais de margin, padding e border |

- Exemplos:
  - block: `<p> <div> <section>`, todos os headings `<h1><h2>...`
  - inline: `<a> <strong> <span> <em>`
