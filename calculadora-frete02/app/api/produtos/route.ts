import pool from "@/lib/db";
import {NextResponse} from "next/server";


export async function POST(request: Request) {
    try {

        const corpoDaRequisicao = await request.json();

        const query = `
            INSERT INTO produtos (nome, largura, altura, profundidade, peso, valor_seguro, quantidade)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
            `;

            const valores = [
                corpoDaRequisicao.nome,
                corpoDaRequisicao.largura,
                corpoDaRequisicao.altura,
                corpoDaRequisicao.profundidade,
                corpoDaRequisicao.peso,
                corpoDaRequisicao.valor_seguro,
                corpoDaRequisicao.quantidade,
            ];

            const resultado = await pool.query(query, valores);

            return NextResponse.json(resultado.rows[0], {status: 201});
        } catch (erro) {
            console.error("Erro ao inserir produto:", erro);
            return NextResponse.json({error: "Erro ao cadastrar produto"}, {status: 500});
        }
    }


export async function GET(request: Request) {
  
  const { searchParams } = new URL(request.url);
  
 
  const nomeBuscado = searchParams.get("nome");

  try {
    if (nomeBuscado) {
      
      const query = "SELECT * FROM produtos WHERE nome = $1 LIMIT 1";
      const resultado = await pool.query(query, [nomeBuscado]);

      if (resultado.rows.length === 0) {
        return NextResponse.json({ erro: "Produto não encontrado" }, { status: 404 });
      }

      return NextResponse.json(resultado.rows[0]);
    }

   
    const todos = await pool.query("SELECT * FROM produtos");
    return NextResponse.json(todos.rows);

  } catch (erro) {
    console.error("Erro na rota GET:", erro);
    return NextResponse.json({ erro: "Erro interno" }, { status: 500 });
  }
}