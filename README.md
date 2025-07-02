# 🔐 ZBRA Test – Desafio de Validação de Senha

Projeto desenvolvido para o processo seletivo da **ZBRA**, com o objetivo de criar uma aplicação web para validação de senha e envio de dados para uma API REST, seguindo critérios específicos de segurança e usabilidade.

---

## 📋 Descrição do Desafio

Você é um especialista em segurança contratado para encontrar falhas no sistema de autenticação. Senhas válidas devem seguir as seguintes regras:

### ✅ Regras de Validação da Senha

- A senha deve conter **6 dígitos numéricos**;
- O valor deve estar entre **184759** e **856920**;
- Deve conter **dois dígitos adjacentes iguais** (ex: `22` em `122345`);
- Os dígitos devem **crescer ou se manter** da esquerda para a direita (ex: `135678`).

#### Exemplos

- `223455` → ✅ Válida  
- `236775` → ❌ Inválida (os dígitos decrescem em `75`)  
- `135789` → ❌ Inválida (não possui dígitos repetidos adjacentes)

---

## 🧪 Tecnologias Utilizadas

- Next.js 15
- React 19
- TypeScript
- SASS
- Vitest
- Testing Library
- Organização de estilos com ITCSS

---

## 🚀 Funcionalidades

- Formulário com validação de Nome, E-mail e Senha;
- Botão de envio desabilitado quando o formulário está inválido;
- Feedback de regras de senha violadas;
- Campos desabilitados durante envio;
- Arquitetura flexível para adicionar/remover regras de senha;
- Testes unitários com coverage.

---

## 📤 Envio de Dados para API

A aplicação envia os dados para a seguinte API mock:

**POST**  
`https://zbra-frontend-challenge.azurewebsites.net/api/PasswordValidation`

### Body do Request

```json
{
  "name": "Seu Nome",
  "email": "seu@email.com",
  "password": "123456"
}
```

Resposta esperada: HTTP 201 Created

---

## 🧪 Scripts Disponíveis
```bash
npm run dev           # Inicia servidor de desenvolvimento
npm run build         # Build de produção
npm run start         # Inicia aplicação em produção
npm run lint          # Executa ESLint
npm run test          # Executa testes unitários
npm run test:watch    # Executa testes em modo watch
npm run test:ui       # Abre interface de testes do Vitest
npm run test:coverage # Executa testes com relatório de cobertura
```
---

## 🛠️ Como Rodar o Projeto Localmente

### Clone o repositório:

git clone https://github.com/seu-usuario/zbra-test.git

```bash
cd zbra-test    # Acesse o diretório
npm install     # Instale as dependências
npm run dev     # Inicie o servidor
```
Acesse no navegador: http://localhost:{PORT}

