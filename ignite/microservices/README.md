# Microserviços

## Monolitos

- Projeto com todos os domínios
- Trabalhar com o mesmo bando de dados

### Quais desvantagens?

- Necessidade de escalar toda a apliacação em momentos de picos
- Ocorre um escalonamento de partes da apliação que não são necessárias

## Microserviços

- Escalabilidade
- Múltiplas linguagens
- Um sistema para cada recurso da aplicação
- Comunicação entre serviços (AMQP Mensageria)
  - Síncrona: HTTP Rest
  - Assíncrona: Apache Kafka || RabbitMQ

## API Gatway

- Não deixa os microserviços expostos para o frontend
- API Gatway é uma camada de interface entre frontend e os microserviços
  - Amazon API Gatway
  - Kong API Gatway
- Autenticação fica de responsabilidade do API Gatway

## Deploy

- Automatizar Ex. Github Actions
- Pipeline CI/CD => Garantir que tudo esteja OK antes de subir

## Configurações importantes

- Monitoramento
- Logs
- Retry Pattern
- Circuit Breaker

## Quando começr a usar microserviços

- Sua aplicação está funcionando normalmente?
  - Se sim não há necessidade de implementar microserviços
- Precisa entender do negócio da empresa
- Tamanho da equipe
- Maturidade do projeto
