
# 🌐 Back-End TF Web

API REST desenvolvida como trabalho final da disciplina de Desenvolvimento Web, com o objetivo de implementar um sistema completo utilizando Node.js e Express.

O projeto simula um sistema de gerenciamento com autenticação e operações CRUD.

---

## 🚀 Funcionalidades

✔ Cadastro de usuários/administradores  
✔ Login com autenticação  
✔ CRUD completo de serviços  
✔ Organização em rotas e controllers  
✔ Estrutura modularizada  

---

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express
- JavaScript
- JWT (autenticação)
- (Banco de dados: adicionar aqui se usar – PostgreSQL / SQLite / MySQL)

---

## 📂 Estrutura do Projeto

```

back-end-tf-web/
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   └── server.js
│
├── package.json
└── README.md

````

---

## ⚙️ Como Executar o Projeto

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/SamuelzimMVP/back-end-tf-web.git
````

### 2️⃣ Acesse a pasta

```bash
cd back-end-tf-web
```

### 3️⃣ Instale as dependências

```bash
npm install
```

### 4️⃣ Configure variáveis de ambiente (se usar JWT ou banco)

Crie um arquivo `.env`:

```
PORT=3000
JWT_SECRET=sua_chave_secreta
DATABASE_URL=sua_string_de_conexao
```

### 5️⃣ Execute o servidor

```bash
npm start
```

Servidor rodando em:

```
http://localhost:3000
```

---

## 📡 Endpoints Principais

### 🔐 Autenticação

```
POST /login
```

Body:

```json
{
  "email": "admin@email.com",
  "senha": "123456"
}
```

---

### 👤 Administradores

```
GET /administrador
POST /administrador
PUT /administrador/:id
DELETE /administrador/:id
```

---

### 🛠 Serviços

```
GET /servico
POST /servico
PUT /servico/:id
DELETE /servico/:id
```

---

## 🧠 Conceitos Aplicados

* Estruturação de API REST
* Organização em camadas (Routes, Controllers)
* Manipulação de requisições HTTP
* Tratamento de erros
* Modularização do código

---

## 🔮 Melhorias Futuras

* Integração com banco de dados relacional
* Implementação de autenticação JWT com middleware
* Validação de dados
* Testes automatizados
* Deploy em nuvem (Render, Railway ou Heroku)

---

## 👨‍💻 Autor

Samuel Rodrigues
Desenvolvedor Backend em formação
JavaScript | Node.js | APIs REST

GitHub: [https://github.com/SamuelzimMVP](https://github.com/SamuelzimMVP)
LinkedIn: [https://www.linkedin.com/in/samuel-rodrigues-7b7538360/](https://www.linkedin.com/in/samuel-rodrigues-7b7538360/)

