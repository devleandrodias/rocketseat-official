# Amazon Simple Queue Service (SQS)

## O que é SQS?

O Amazon SQS oferece uma fila hospedada, segura, durável e disponível que permite integrar e desacoplar sistemas de software e componentes distribuídos

## Benefícios

- Segurança: Você contra quem pode enviar e receber mensagens em uma fila do Amazon SQS
- Criptografia: No lado do servidor (SSE) permite transmitir dados sigilosos protegendo o conteúdo das mensagens em filas usando chaves gerenciadas no AWS Key Managment Service (AWS KMS)
- Durabilidade: Para garantir a segurança de suas mensagens, o Amazon SQS as armazena em vários servidores
- Disponibilidade: O Amazon SQS usa infraestrutura redundante para fornecer acesso altamento simultâneo às mensagens, além de alta disponibilidade para produzir e consumir as mensagens
- Escalabilidade: O Amazon SQS pode processar cada solicitação em buffer de forma independente, escalando de forma transparente para lidar com qualquer aumento ou pico de carga sem nenhuma instrução de provisionamento
- Confiabilidade: O Amazon SQS bloqueia suas mensagens durante o processamento, para que vários produtores possam enviar, e vários consumidores possam receber ao mesmo tempo
- Personalização: Suas filas não precisam ser exatamente iguais. Você pode definir um atraso padrão em uma fila, por exemplo. Você pode armazenar o conteúdo de mensagens maiores que 256 Kb usando o Amazon Simple Storage Service (Amazon S3) ou Amazon DynamoDb, com o Amazon SQS mantendo um ponteiro no objeto do Amazon S3, ou pode dividir uma mensagens grande em mensagens menores

## Filas padrão do Amazon SQS

- As filas padrão oferecem suporte à entrega pelo menos uma vez
- Mais performance, pois é possível enviar qualquer quantidade de mensagens por segundo
- As mensagens podem ser duplicadas e que, às vezes, as mensagens não são entregues na ordem que foram enviadas

## Filas FIFO (First In First Out)

- Podem ser usadas para:
  - Para verificar se os comandos inseridos pelo usuário são executados na ordem correta
  - Exibir o preço do produto correto enviando modificações de preço na ordem correta
  - Impedir que um aluno se matriculo em um curso antes de criar uma conta

## Filas Dead Letter Queues

- Não processadas por algum motivo
- Mensgens só podem ser envadas para DLQ do mesmo tipo de fila
