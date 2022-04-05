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
