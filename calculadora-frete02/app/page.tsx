"use client";
import { useState } from "react";
import { Input } from "@/components/Input";

export default function Home() {
  const [abaAtiva, setAbaAtiva] = useState("calculadora");
  
  // Estados da Calculadora
  const [cepOrigem, setCepOrigem] = useState("05407002");
  const [cepDestino, setCepDestino] = useState("60813690");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [weight, setWeight] = useState("");
  const [frete, setFrete] = useState<any>(null);
  const [produto, setProduto] = useState("");
  const [nomeProduto, setNomeProduto] = useState("");
  const [novaAltura, setNovaAltura] = useState("");
  const [novaLargura, setNovaLargura] = useState("");
  const [novoPeso, setNovoPeso] = useState("");
  const [novaProfundidade, setNovaProfundidade] = useState("");
  
 async function cadastrarProdutos(e: React.FormEvent) {
  e.preventDefault();
  console.log("Cadastrando novo produto", {nomeProduto, novaAltura, novaLargura, novoPeso, novaProfundidade});

  const novoProduto = {
    nome: nomeProduto,
    altura: Number(novaAltura),
    largura: Number(novaLargura),
    profundidade: Number(novaProfundidade),
    peso: Number(novoPeso),
    valor_seguro: 10.0,
    quantidade: 1,
  };

  try {
    const resposta = await fetch("/api/produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoProduto),
    });
    if(resposta.ok){
      alert("Produto cadastrado com sucesso!");
    }
  } catch (erro) {
    console.error("Erro ao cadastrar produto:", erro);
  }
 }

 
  async function calcularFrete(e: React.FormEvent) {
    e.preventDefault(); 
    
    console.log("Chamando a API com ", {cepOrigem, cepDestino, height, width, length, weight});

    
    const pacoteDeDados = {
      from: {
        postal_code: cepOrigem,
      },
      to: {
        postal_code: cepDestino,
      },
      products: [
        {
          id: "produto-1",
          width: Number(width),
          height: Number(height),
          length: Number(length),
          weight: Number(weight),
          insurance_value: 10.0, 
          quantity: 1,
        },
      ],
    };

    try {
      
      const buscarinformacoesProduto = await fetch(`/api/produtos`);
      
      const resposta = await fetch("/api/calcular-frete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pacoteDeDados),
      });

      const resultado = await resposta.json();
      
      console.log("Os fretes são:", resultado);
      
      setFrete(resultado);

    } catch (erro) {
      console.error("Erro ao chamar nossa API:", erro);
    }
  }

  
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* MENU LATERAL */}
      <aside className="w-64 bg-white shadow-md flex flex-col border-r border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-black text-green-700">Meu Sistema</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setAbaAtiva("calculadora")} className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${abaAtiva === "calculadora" ? "bg-green-100 text-green-800" : "text-gray-600 hover:bg-gray-100"}`}>
            🚚 Calculadora
          </button>
          <button onClick={() => setAbaAtiva("produtos")} className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${abaAtiva === "produtos" ? "bg-green-100 text-green-800" : "text-gray-600 hover:bg-gray-100"}`}>
            📦 Produtos
          </button>
        </nav>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 p-10 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {abaAtiva === "calculadora" ? "Calculadora de Frete" : "Cadastro de Produtos"}
        </h1>
        
        {abaAtiva === "calculadora" && (
          <div className="max-w-2xl">
            {/* CAIXA DO FORMULÁRIO */}
            <div className="bg-white text-black p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
              <form onSubmit={calcularFrete} className="space-y-4">
                <Input label="CEP de Origem" placeholder="01001-000" value={cepOrigem} onChange={(e) => setCepOrigem(e.target.value)} />
                <Input label="CEP de Destino" placeholder="01001-000" value={cepDestino} onChange={(e) => setCepDestino(e.target.value)} />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Produto" placeholder="Nome do produto" value={produto} onChange={(e) => setProduto(e.target.value)} />
                </div>

                <button type="submit" className="w-full p-3 mt-4 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold transition-colors">
                  Calcular Frete
                </button>
              </form>
            </div>
          </div>
        )}
        {abaAtiva === "produtos" && (
          <div className="max-w-2xl">

          <div className="bg-white text-black p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Cadastrar Novo Produto</h2>

              <form onSubmit={cadastrarProdutos} className="space-y-4">

                    <Input label="Nome do Produto" placeholder="Digite o nome do produto" value={nomeProduto} onChange={(e) => setNomeProduto(e.target.value)} />
                    <Input label="Altura (cm)" type="number" placeholder="Ex: 10" value={novaAltura} onChange={(e) => setNovaAltura(e.target.value)} />
                    <Input label="Largura (cm)" type="number" placeholder="Ex: 15" value={novaLargura} onChange={(e) => setNovaLargura(e.target.value)} />
                    <Input label="Profundidade (cm)" type="number" placeholder="Ex: 20" value={novaProfundidade} onChange={(e) => setNovaProfundidade(e.target.value)} />
                    <Input label="Peso (kg)" type="number" placeholder="Ex: 0.5" value={novoPeso} onChange={(e) => setNovoPeso(e.target.value)} />
                    <button type="submit" className="w-full p-3 mt-4 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold transition-colors">
                    Salvar Produto
                    </button>
                </form>
           </div>
          </div>
        )}
      </main>
    </div>
  );
}
