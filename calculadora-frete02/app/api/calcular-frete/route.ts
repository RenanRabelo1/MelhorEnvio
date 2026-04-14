import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  try {
   
    const dadosDoFormulario = await request.json();

    
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