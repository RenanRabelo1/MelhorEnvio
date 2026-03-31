function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center"> 
    {/* Aqui é a tela principal */}
      

      <div className="bg-white rounded-xl shadow-lg p-8"> 
        {/* Aqui é a configuração da tealinha de por o cpf */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Calculadora Frete
        </h1>

        <form className="space-y-5">
          <div>

            <label>CEP de Origem</label>

            <input type="text" placeholder=" Ex: 01001-000" className = "w-full border border-gray-300 rounded-lg p-3 mt-2"/>
            {/* Aqui é do placeholder da cep de Origem  */}
        </div>

        <div>
            <label>CEP de Destino</label>
            <input type="text" placeholder=" Ex: 01001-000" className = "w-full border border-gray-300 rounded-lg p-3 mt-2"/>
            {/* Aqui é o placeholder da cep de Destino */}
        </div>
          
        </form>
      </div>

    </div>
  )
}

export default App