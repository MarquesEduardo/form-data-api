async function buscaEndereco(cep) {
    const errorMessage = document.getElementById('error')
    errorMessage.innerHTML = "";
    try {
        const consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.error) {
            throw Error('CEP do not exist.')
        }
        const cidade = document.getElementById('cidade');
        const logradouro = document.getElementById('endereco');
        const estado = document.getElementById('estado');
        
        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;
        
        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch (error) {
        errorMessage.innerHTML = `<p>Invalid CEP</p>`
        console.log(error);
    }
    
}
const cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));