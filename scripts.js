/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de livros existente no banco de dados do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
 const getList = async () => {
  
    fetch('http://localhost:5000/lista_livros', {method: 'GET',})

      .then(response => response.json())
      .then(data => {data.livros.forEach(item => insertList(item.nome, item.autor, item.genero, item.status))})
      .catch(error => {console.error('Error:', error)});
  }
 

  /*
    --------------------------------------------------------------------------------------
    Chamada da função para carregamento inicial dos dados presente no banco.
    --------------------------------------------------------------------------------------
  */  
  getList()
  
  /*
    --------------------------------------------------------------------------------------
    Função para colocar um livro na lista do servidor via requisição POST
    --------------------------------------------------------------------------------------
  */

  const postItem = async (inputNome, inputAutor, inputGenero, inputStatus) => {
    const formData = new FormData();
    formData.append('nome', inputNome);
    formData.append('autor', inputAutor);
    formData.append('genero', inputGenero);
    formData.append('status', inputStatus);
  
    
    fetch('http://localhost:5000/adicionar_livro', {method: 'POST', body: formData})

      .then(response => response.json())
      .catch(error => {console.error('Error:', error)});
  }


  /*
    --------------------------------------------------------------------------------------
    Função para deletar um livro da lista do servidor via requisição DELETE
    --------------------------------------------------------------------------------------
  */

  const deleteItem = (item) => {
    console.log(item)
  
    fetch('http://localhost:5000/deletar_livro?nome=' + item, {method: 'DELETE'})

      .then(response => response.json())
      .catch(error => {console.error('Error:', error)});
  }


  /*
    --------------------------------------------------------------------------------------
    Função para criar um botão close para cada livro da lista
    --------------------------------------------------------------------------------------
*/
 const insertButton = (parent) => {
   let span = document.createElement("span");
   let txt = document.createTextNode("\u00D7");
   span.className = "close";
   span.appendChild(txt);
   parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um livro da lista ao clicar no botão close
  --------------------------------------------------------------------------------------
*/

const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}


  /*
    --------------------------------------------------------------------------------------
    Função para adicionar um novo livro ao clicar em 'Salvar'
    --------------------------------------------------------------------------------------
  */
  const newItem = () => {
    let inputNome = document.getElementById("nome").value;
    let inputAutor = document.getElementById("autor").value;
    let inputGenero = document.getElementById("genero").value;
    let inputStatus = document.getElementById("status").value;

    if (inputNome === '' || inputAutor === '' || inputGenero === '' || inputStatus === '') {
      alert("Todos os campos devem ser preenchidos!");
    } else {
      insertList(inputNome, inputAutor, inputGenero, inputStatus)
      postItem(inputNome, inputAutor, inputGenero, inputStatus)

      alert("Livro adicionado com sucesso!")
    }
  }
  

  /*
    --------------------------------------------------------------------------------------
    Funcao para inserir os dados do formulário na tabela de id 'Tabela'. Também gera o botão de exclusão.
    --------------------------------------------------------------------------------------
  */

  function insertList(nome, autor, genero, status) {
    // Selecionar a tabela HTML com id 'Tabela'
    const tabela = document.getElementById('Tabela');
  
    // Criar uma nova linha
    const linha = tabela.insertRow();
  
    // Criar células e adicionar os dados
    const celulaNome = linha.insertCell();
    celulaNome.textContent = nome;

    const celulaAutor = linha.insertCell();
    celulaAutor.textContent = autor;
  
    const celulaGenero = linha.insertCell();
    celulaGenero.textContent = genero;

    const celulaStatus = linha.insertCell();
    celulaStatus.textContent = status;

  
  
    insertButton(linha.insertCell(-1))
    document.getElementById('nome').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('genero').value = '';
    document.getElementById('status').value = '';
  
  
  
    removeElement()

  }



