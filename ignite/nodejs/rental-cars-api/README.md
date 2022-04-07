## Comando Linux

```
sudo service --status-all
```

## Comandos Docker

```
docker-compose up --force-recreate -d
```

## Comandos Typeorm

- npx typeorm migration:create src/database/migration/[CreateMigration]

## Testes

### Teste Unitários

- Testar parte da aplicação (Funções, Regras de Negócios, Funcionalidade)

### Testes de Integração

- Quando queremos testar fluxo da aplicação (Rota -> Controller -> Service -> Repository -> Retorno)

### TDD (Test Driven Development)

- Escrever primeiro teste que vai falhar (Red)
- Implemente a solução (Green)
- Refatore (Refactor)

## Levantamento de requisitos

**Requisitos Funcionais (RF)**

- Requisitos funcionais são as funcionalidades do seu sistema
  - Adicionar categoria
  - Adicionar um carro

**Requisitos Não Funcionais (RNF)**

- Tudo aquilo que não é de negócio
  - Qual ORM usar?
  - Performance
  - Cache

**Regras de Negócio (RN)**

- São as regras por trás dos requisitos
  - Não deve ser possível cadastrar uma categoria com um nome já existente
