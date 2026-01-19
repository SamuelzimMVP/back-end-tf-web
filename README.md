
# 🖥️ Back-End – Trabalho Final de Web  
## **Caroba Contabilidade**

**URL API**: https://back-end-tf-web-gamma.vercel.app

---

### 🔹 **Administrador**

**[GET] /administrador**  
Descrição: Retorna todos os administradores cadastrados.

**[GET] /administrador/{id}**  
Descrição: Retorna um único administrador pelo ID.

**[POST] /administrador**  
Descrição: Cadastra um novo administrador.  
Body:
```json
{
  "nome": "arthurbombonzeiro",
  "email": "arthurbombonzeiro",
  "senha": "12345"
}
```

**[PUT] /administrador/{id}**  
Descrição: Atualiza um administrador existente.  
Body:
```json
{
  "nome": "Novo Nome",
  "email": "novo@email.com",
  "senha": "novaSenha"
}
```

**[DELETE] /administrador/{id}**  
Descrição: Remove um administrador pelo ID.

**[POST] /administrador/login**  
Descrição: Realiza login de administrador.  
Body:
```json
{
  "email": "arthurbombonzeiro",
  "senha": "12345"
}
```

---

### 🔹 **Serviço**

**[GET] /servico**  
Descrição: Retorna todos os serviços cadastrados.

**[GET] /servico/populares**  
Descrição: Retorna apenas os serviços marcados como populares.

**[GET] /servico/{id}**  
Descrição: Retorna um único serviço pelo ID.

**[POST] /servico**  
Descrição: Cadastra um novo serviço.  
Body:
```json
{
  "nome": "Abrir CNPJ",
  "descricao": "RG, CPF e comprovante de residência",
  "valor": 500.00,
  "popular": true
}
```

**[PUT] /servico/{id}**  
Descrição: Atualiza um serviço existente.  
Body:
```json
{
  "nome": "Declaração de IRPF",
  "descricao": "Informes de rendimento e dependentes",
  "valor": 350.00,
  "popular": false
}
```

**[DELETE] /servico/{id}**  
Descrição: Remove um serviço pelo ID.

---

### 👥 Integrantes

Bruno Luan Ferreira Pardinho, Otávio Silva de Oliveira, Rhyan Silva Ribeiro, Samuel Rodrigues Caroba Silva.  

- Bruno: https://github.com/reload-Bruno  
- Otavio: https://github.com/OtavioOliveira17  
- Rhyan: https://github.com/Rhyan7-mestre  
- Samuel: https://github.com/Samuel-Caroba

