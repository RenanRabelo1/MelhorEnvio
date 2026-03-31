import { useState } from "react"

function App() {
  const [cepOrigem, setCepOrigem] = useState("");
  const [cepDestino, setCepDestino] = useState("");
  const [frete, setFrete] = useState(null);
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [weight, setWeight] = useState("");

  async function calcularFrete(evento) {
    evento.preventDefault();

    const dadosEnvio = {
      from: { postal_code: cepOrigem },
      to: { postal_code: cepDestino },
      packages: [
        {
          weight: parseFloat(weight),
          width: parseFloat(width),
          height: parseFloat(height),
          length: parseFloat(length),
          insurance: 10.0
        }
      ]
    }

    const opcoes = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_MELHOR_ENVIO_TOKEN}`,
        'User-Agent': import.meta.env.VITE_USER_AGENT,
      },
      body: JSON.stringify(dadosEnvio)
    };

    const resposta = await fetch('/api/v2/me/shipment/calculate', opcoes);
    const dados = await resposta.json();

    console.log(dados);
    setFrete(dados);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg p-8 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Calculadora Frete
        </h1>

        <form onSubmit={calcularFrete} className="space-y-5">
          <div>
            <label>CEP de Origem</label>
            <input value={cepOrigem} onChange={(evento) => setCepOrigem(evento.target.value)} type="text" placeholder=" Ex: 01001-000" className="w-full border border-gray-300 rounded-lg p-3 mt-2" />
          </div>

          <div>
            <label>CEP de Destino</label>
            <input value={cepDestino} onChange={(evento) => setCepDestino(evento.target.value)} type="text" placeholder=" Ex: 01001-000" className="w-full border border-gray-300 rounded-lg p-3 mt-2" />
          </div>

          <div>
            <label>Altura(cm)</label>
            <input value={height} onChange={(evento) => setHeight(evento.target.value)} type="number" placeholder=" Ex: 10" className="w-full border border-gray-300 rounded-lg p-3 mt-2" />
          </div>

          <div>
            <label>Largura(cm)</label>
            <input value={width} onChange={(evento) => setWidth(evento.target.value)} type="number" placeholder=" Ex: 10" className="w-full border border-gray-300 rounded-lg p-3 mt-2" />
          </div>

          <div>
            <label>Comprimento(cm)</label>
            <input value={length} onChange={(evento) => setLength(evento.target.value)} type="number" placeholder=" Ex: 10" className="w-full border border-gray-300 rounded-lg p-3 mt-2" />
          </div>

          <div>
            <label>Peso(kg)</label>
            <input value={weight} onChange={(evento) => setWeight(evento.target.value)} type="number" placeholder=" Ex: 10" className="w-full border border-gray-300 rounded-lg p-3 mt-2" />
          </div>

          <button className="w-full p-3 rounded-lg bg-green-600 text-white font-bold">
            Calcular Frete
          </button>

          {frete && (
            <div className="mt-5 p-4 bg-green-900 rounded-lg text-center font-bold text-white">
              <p>Verifique o console para os dados recebidos.</p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default App