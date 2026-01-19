import pkg from "pg";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const { Pool } = pkg;
let pool = null;

// Middleware para parsing de JSON
app.use(express.json());

// Middleware CORS (com suporte a OPTIONS)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

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
    message: "API para Administrar serviços e administradores",
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

// UPDATE
app.put("/servico/:id", async (req, res) => {
  const db = conectarBD();
  const { nome, descricao, valor, popular } = req.body; // ← adicionado 'popular'

  try {
    const result = await db.query(
      `UPDATE servico 
       SET nome=$1, descricao=$2, valor=$3, popular=$4 
       WHERE id_servico=$5 
       RETURNING *;`,
      [nome, descricao, valor, popular ? true : false, req.params.id] // ← converte para boolean
    );
    res.json(result.rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ erro: "Erro ao atualizar serviço" });
  }
});
// ========================
// EXPORT PARA VERCEL
// ========================
export default app;