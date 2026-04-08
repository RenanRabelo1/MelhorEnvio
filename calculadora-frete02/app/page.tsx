"use client";
import { useState } from "react";
import { Input } from "../components/Input";

export default function Home() {
  const [abaAtiva, setAbaAtiva] = useState("calculadora");
  
  // Estados da Calculadora
  const [cepOrigem, setCepOrigem] = useState("05407002");
  const [cepDestino, setCepDestino] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [weight, setWeight] = useState("");
  const [frete, setFrete] = useState<any>(null); // Guardará o resultado da API

 
  async function calcularFrete(evento: React.FormEvent) {
    evento.preventDefault(); 
    
    console.log("Chamando o nosso garçom (API interna)...");

    
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
      
      const resposta = await fetch("/api/calcular-frete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pacoteDeDados),
      });

      // 3. Pegamos a resposta que o nosso back-end devolveu
      const resultado = await resposta.json();
      
      console.log("A cozinha (Melhor Envio) respondeu:", resultado);
      
      // 4. Salvamos o resultado no estado para podermos desenhar na tela depois!
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
                <Input label="CEP de Origem" placeholder="Ex: 01001-000" value={cepOrigem} onChange={(e) => setCepOrigem(e.target.value)} />
                <Input label="CEP de Destino" placeholder="Ex: 01001-000" value={cepDestino} onChange={(e) => setCepDestino(e.target.value)} />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Altura (cm)" type="number" placeholder="Ex: 10" value={height} onChange={(e) => setHeight(e.target.value)} />
                  <Input label="Largura (cm)" type="number" placeholder="Ex: 10" value={width} onChange={(e) => setWidth(e.target.value)} />
                  <Input label="Comprimento (cm)" type="number" placeholder="Ex: 10" value={length} onChange={(e) => setLength(e.target.value)} />
                  <Input label="Peso (kg)" type="number" placeholder="Ex: 1" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </div>

                <button type="submit" className="w-full p-3 mt-4 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold transition-colors">
                  Calcular Frete
                </button>
              </form>
            </div>

            {/* CAIXA DE RESULTADOS (SÓ APARECE SE TIVERMOS O FRETE) */}
            {frete && Array.isArray(frete) && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Opções Disponíveis</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Aqui o .map() vai desenhar um card para cada transportadora */}
                  {frete.map((opcao: any) => {
                    // O Melhor Envio retorna um campo "error" se a transportadora não entregar nessa rota ou peso
                    if (opcao.error) return null;

                    return (
                      <div key={opcao.id} className="bg-white border-2 border-green-100 rounded-xl p-5 shadow-sm hover:border-green-400 hover:shadow-md transition-all flex flex-col justify-between h-full">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-gray-800 text-lg leading-tight">{opcao.name}</h3>
                            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                              {opcao.company?.name}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-end">
                          <div>
                            <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Prazo</p>
                            <p className="text-gray-700 font-medium">{opcao.custom_delivery_time} dias úteis</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Valor</p>
                            <p className="text-green-600 font-black text-2xl">R$ {opcao.price}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                </div>
              </div>
            )}
            
          </div>
        )}

      </main>
    </div>
  );
}