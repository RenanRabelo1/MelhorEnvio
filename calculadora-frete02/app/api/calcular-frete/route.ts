import { NextResponse } from 'next/server';

// Esta função POST vai receber o chamado do nosso formulário
export async function POST(request: Request) {
  try {
    // 1. Pegamos os dados (peso, CEP, etc) que o frontend nos enviou
    const dadosDoFormulario = await request.json();

    // 2. Preparamos a requisição para o Melhor Envio usando nossas variáveis secretas (process.env)
    const opcoes = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MELHOR_ENVIO_TOKEN}`,
        'User-Agent': process.env.USER_AGENT || "Minha Calculadora",
      },
      body: JSON.stringify(dadosDoFormulario)
    };

    
    const resposta = await fetch('https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate', opcoes);
    const dados = await resposta.json();

    
    return NextResponse.json(dados);

  } catch (erro) {
    console.error("Erro na API interna:", erro);
    return NextResponse.json({ error: "Erro ao calcular o frete" }, { status: 500 });
  }
}