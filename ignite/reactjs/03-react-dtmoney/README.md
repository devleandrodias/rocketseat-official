# Libraries

- https://www.radix-ui.com/
- https://headlessui.com/

# React Flow

## Por que um componente renderiza?

- Hook changed (Mudou estado, contexto, reducer)
- Props changed (Mudou propriedades)
- Parent rerendered (Componente pai renderizou)

## Qual fluxo de renderizacao?

- O react recria o HTML da interface daquele componente
- Compara a versao do HTML recriada com a versao anterior
- Se mudou alguma coisa ele reescreve o HTML

## React memo

- Hook changes / Props changes (Deep comparison)
- Comparar a versao anteior dos hooks e props
- Se mudou algo ele vai permirir a nova renderizacao

## Hook useCallback

- Um hook focado em performance que memoriza funcoes e as recria caso uma de suas dependencias seja alterada

## Hook useMemo

- Um hook focado em performance que memoriza valores computados e reavalia esses valores caso uma de suas dependencias seja alterada
