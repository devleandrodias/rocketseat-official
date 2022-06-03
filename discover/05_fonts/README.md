# Trabalhando com fontes

- Tipografia transmite mensgem
  - Negrito
  - Tamanho
  - Estilo

## Basic Font Properties

- font-family
- font-weight
- font-style
- font-size

## Font Family

- Tipo de fonte de um elemento
- Lista de fontes e ordem de prioridade
- Inclui _fallback_ font

```css
p {
  font-family: "Times New Roman", Times, serif;
}

- serif
- sans-serif
```

## Font Weight

- Peso da fonte

```css
p {
  font-weight: bold;
}
```

Quando usamos forma numérica de peso 100, 200, 300 não são todas fontes que suportam todos os pesos

## Font Style

- É o estilo da fonte

```css
span {
  font-style: italic;
}
```

## Font Size

- É o tamanho da fonte

```css
p {
  font-size: 18px;
}
```

## Web Fonts

- Fontes de sistema \* fontes da web
- Como usar fontes para web?
  - @font-face
  - @import
  - link

## Referências

- https://css-tricks.com/
- https://fonts.google.com/

## Font Variant

```css
p {
  font-variant: small-caps;
}
```

## Font Stretch

- Alargamento ou encolhimento da fonte
- Aceita palavras-chave como: expanded, condensed, normal

```css
p {
  font-stretch: expanded;
}
```

## Letter Spacing

- Espaço entre os caracteres

```css
p {
  letter-spacing: 4px;
}
```

## Word Spacing

- Espaços entre palavras

```css
p {
  word-spacing: 4px;
}
```

## Line Height

- Espaços entre linhas
- Pode ser com unidades ou sem unidades de medida
- Comuns: 1.5 ou 2

```css
p {
  line-height: 1.5;
}
```

## Text Transform

- Transformação do texto

```css
p {
  text-transform: uppercase; /* capitalized lowercase | none */
}
```

## Text Decoration

- Aparência decorativa de um texto
- line: underline | overline | line-through
- style: wavy | dotted | double | dashed | solid
- color: `<color>` values
- podemos aplicar mais de um valor

```css
p {
  text-decoration: underline;
}
```

## Text Align

- Alinhamento de um texto

```css
p {
  text-align: center; /* left | right | center | justify */
}
```

## Text Shadow

- Sombra aplicada a um texto
- Permite múltiplos valores

```css
p {
  text-shadow: 1px 1px 1px red;
  /* offset-x | offset-y | blur-radius | color */
}
```

## Shorthand

- font-style, font-variant, font-weight, font-stretch, font-size, line-height e font-family

```css
p {
  font: italic normal, bold, normal 3em/1.5 Helvetica, Arial, sans-serif;
}
```
