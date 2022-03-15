# Falhas

Quando um nó (serviço) não consegue se comunicar com outro nó (serviço) temos uma **Partição**

## Falhas transientes

- Falhas que ocorrem por um curto período de tempo
- "Tudo falha o tempo todo"

## Retries

- Falhou? Tenta de novo

## Backoff

- Falhou? Tente de novo, mas não tente imediatamente

### Exponential Backoff

- https://cloud.google.com/iot/docs/how-tos/exponential-backoff

## Jitter

- Falhou? Tentar de novo, intervalo de tempo definido pelo backoff + um valor aleatório, para que não haja várias retentativas simultâneas
- Existem vários algoritimos de Jitter
- Resolver problemas de contenção e burst
- https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/

## Erros Transientes

- Detecção de falhas
- Não faz sentido, retentar um erro, por exemplo 400 (Bad Request) com os mesmo parâmetros (Erros de domínio/negócios)
- Faz sentido retentar quando, Timeout, Connection Refused, Erro 503, 504, erro de DNS, etc..

## Bibliotecas Externas

- [P-Retry](https://www.npmjs.com/package/p-retry)
