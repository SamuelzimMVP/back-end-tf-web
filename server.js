import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
const port = 3000;

const { Pool } = pkg;
let pool = null;

app.use(express.json());


function conectarBD() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.URL_BD,
    });
  }
  return pool;
}

// =======================================
// ROTA TESTE
// =======================================
app.get("/", async (req, res) => {
  const db = conectarBD();

  let dbStatus = "ok";
  try {
    await db.query("SELECT 1");
  } catch (e) {
    dbStatus = e.message;
  }

  res.json({
    message: "API para Adinistrar serviços e administradores",
    author: "Os Carobas",
    statusBD: dbStatus
  });
});

// =======================================================================================
// CRUD - ADMINISTRADOR
// =======================================================================================

// CREATE
app.post("/administrador", async (req, res) => {
  const db = conectarBD();
  const { nome, email, senha } = req.body;

  const query = `
      INSERT INTO administrador (nome, email, senha)
      VALUES ($1, $2, $3)
      RETURNING *;
  `;

  try {
    const result = await db.query(query, [nome, email, senha]);
    res.json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ erro: "Erro ao criar administrador" });
  }
});

// READ ALL
app.get("/administrador", async (req, res) => {
  const db = conectarBD();

  try {
    const result = await db.query(`SELECT * FROM administrador;`);
    res.json(result.rows);
  } catch (e) {
    res.status(500).json({ erro: "Erro ao buscar administradores" });
  }
});

// READ BY ID
app.get("/administrador/:id", async (req, res) => {
  const db = conectarBD();

  try {
    const result = await db.query(
      `SELECT * FROM administrador WHERE id_admin = $1;`,
      [req.params.id]
    );
    res.json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ erro: "Erro ao buscar administrador" });
  }
});

// UPDATE
app.put("/administrador/:id", async (req, res) => {
  const db = conectarBD();
  const { nome, email, senha } = req.body;

  try {
    const result = await db.query(
      `UPDATE administrador SET nome=$1, email=$2, senha=$3 WHERE id_admin=$4 RETURNING *;`,
      [nome, email, senha, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ erro: "Erro ao atualizar administrador" });
  }
});

// DELETE
app.delete("/administrador/:id", async (req, res) => {
  const db = conectarBD();

  try {
    await db.query(`DELETE FROM administrador WHERE id_admin=$1;`, [
      req.params.id
    ]);
    res.json({ message: "Administrador removido" });
  } catch (e) {
    res.status(500).json({ erro: "Erro ao remover administrador" });
  }
});


// =======================================================================================
// CRUD - SERVIÇO
// =======================================================================================

// CREATE
app.post("/servico", async (req, res) => {
  const db = conectarBD();
  const { nome, descricao, valor } = req.body;

  const query = `
      INSERT INTO servico (nome, descricao, valor)
      VALUES ($1, $2, $3)
      RETURNING *;
  `;

  try {
    const result = await db.query(query, [nome, descricao, valor]);
    res.json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ erro: "Erro ao criar serviço" });
  }
});

// READ ALL
app.get("/servico", async (req, res) => {
  const db = conectarBD();

  try {
    const result = await db.query(`SELECT * FROM servico;`);
    res.json(result.rows);
  } catch (e) {
    res.status(500).json({ erro: "Erro ao buscar serviços" });
  }
});

// READ BY ID
app.get("/servico/:id", async (req, res) => {
  const db = conectarBD();

  try {
    const result = await db.query(
      `SELECT * FROM servico WHERE id_servico = $1;`,
      [req.params.id]
    );
    res.json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ erro: "Erro ao buscar serviço" });
  }
});

// UPDATE
app.put("/servico/:id", async (req, res) => {
  const db = conectarBD();
  const { nome, descricao, valor } = req.body;

  try {
    const result = await db.query(
      `UPDATE servico SET nome=$1, descricao=$2, valor=$3 WHERE id_servico=$4 RETURNING *;`,
      [nome, descricao, valor, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ erro: "Erro ao atualizar serviço" });
  }
});

// DELETE
app.delete("/servico/:id", async (req, res) => {
  const db = conectarBD();

  try {
    await db.query(`DELETE FROM servico WHERE id_servico=$1;`, [
      req.params.id
    ]);
    res.json({ message: "Serviço removido" });
  } catch (e) {
    res.status(500).json({ erro: "Erro ao remover serviço" });
  }
});

// ========================
// INICIAR SERVIDOR
// ========================
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
