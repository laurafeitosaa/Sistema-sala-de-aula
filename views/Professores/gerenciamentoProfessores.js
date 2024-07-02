import React from "react";
import axios from 'axios';
import MaterialTable from "material-table";

const GerenciamentoProjetos = props => {
  const { useState, useEffect } = React;
  

  const [data, setData] = useState([
  ]);

  useEffect(() => {
    handleClick();
  }, []);

  function handleClick() {
    axios
      .get("http://demo2956687.mockable.io/projeto")
      .then(response => {
        const projetos = response.data.lista.map(c => {
          return {
            id: c.id,
            tituloProjeto: c.tituloProjeto,
            areaProjeto: c.areaProjeto,
            resumo: c.resumo,
            palavraChave1: c.palavraChave1,
            palavraChave2: c.palavraChave2,
            palavraChave3: c.palavraChave3,
            url: c.url,
            idProfessorResponsavel: c.idProfessorResponsavel,
            idAlunoParticipante: c.idAlunoParticipante
          };
        });
        setData(projetos);
      })
      .catch(error => console.log(error));
  }

  function handleCreate(newData) {
    axios
      .post("http://demo2956687.mockable.io/projetos", {
        "id": newData.id,
        "tituloProjeto": newData.tituloProjeto,
        "areaProjeto": newData.areaProjeto,
        "resumo": newData.resumo,
        "palavraChave1": newData.palavraChave1,
        "palavraChave2": newData.palavraChave2,
        "palavraChave3": newData.palavraChave3,
        "Url": newData.url,
        "idProfessorResponsavel": newData.idProfessorResponsavel,
        "idAlunoParticipante": newData.idAlunoParticipante
      })
      .then(function (response) {
        console.log('Salvo com sucesso.')
      });
  }

  function handleUpdate(newData) {
    axios
      .put("http://demo6801398.mockable.io/projetos", {
        "id": newData.id,
        "Titulo do Projeto": newData.tituloProjeto,
        "Area do Projeto": newData.areaProjeto,
        "Resumo": newData.resumo,
        "Palavra Chave 1": newData.palavraChave1,
        "Palavra Chave 2": newData.palavraChave2,
        "Palavra Chave 3": newData.palavraChave3,
        "Url": newData.url,
        "idProfessorResponsavel": newData.idProfessorResponsavel,
        "idAlunoParticipante": newData.idAlunoParticipante
      })
      .then(function (response) {
        console.log('Atualizado com sucesso.')
      });
  }

  function handleDelete(newData) {
    axios
      .delete("http://demo6801398.mockable.io/delete-projeto", {
        "id": newData.id
      })
      .then(function (response) {
        console.log('Deletado com sucesso.')
      });
  }

  const [professores, setProfessores] = useState([
  ]);

  useEffect(() => {
    handleClick();
    fetchProfessores();
  }, []);

  function fetchProfessores() {
    axios
      .get("http://demo2956687.mockable.io")
      .then(response => {
        const professores = response.data.lista.map(c => {
          return {
            id: c.id,
            matricula: c.matricula,
            nome: c.nome,
            idEndereco: c.idEndereco,
            curso: c.curso
          };
        });
        setProfessores(professores);
      })
      .catch(error => console.log(error));
  }

  const [alunos, setAlunos] = useState([
  ]);

  useEffect(() => {
    handleClick();
    fetchAlunos();
  }, []);

  function fetchAlunos() {
    axios
      .get("http://demo2956687.mockable.io/aluno")
      .then(response => {
        const alunos = response.data.lista.map(c => {
          return {
            id: c.id,
            cpf: c.cpf,
            matricula: c.matricula,
            nome: c.nome,
            idEndereco: c.idEndereco,
            curso: c.curso
          };
        });
        setAlunos(alunos);
      })
      .catch(error => console.log(error));
  }

  return (
    [
      <MaterialTable
        title="Gerenciamento de Projetos"
        columns={[
          { title: 'Id', field: 'id' },
          { title: 'Titulo do Projeto', field: 'tituloProjeto' },
          { title: 'Area do Projeto', field: 'areaProjeto' },
          { title: 'Resumo ', field: 'resumo' },
          { title: 'Palavra Chave 1', field: 'palavraChave1' },
          { title: 'Palavra Chave 2', field: 'palavraChave2' },
          { title: 'Palavra Chave 3', field: 'palavraChave3' },
          { title: 'Url', field: 'url'},
          { title: 'Id Professor Responsavel', field: 'idProfessorResponsavel',  lookup: professores.reduce((lookup, professor) => {
            lookup[professor.id] = professor.nome;
            return lookup;
          }, {})},
          { title: 'Id Aluno Participante', field: 'idAlunoParticipante', lookup: alunos.reduce((lookup, aluno) => {
            lookup[aluno.id] = aluno.nome;
            return lookup;
          }, {})}
        ]}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                handleCreate(newData)

                const dataCreate = [...data];

                setData([...dataCreate, newData]);

                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);

                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                handleDelete(oldData)
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve()
              }, 1000)
            }),
        }}
      />]
  )
}

export default GerenciamentoProjetos;