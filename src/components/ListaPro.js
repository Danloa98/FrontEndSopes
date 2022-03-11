import React, { useEffect, useState } from "react";
import { Table } from 'reactstrap';
import io from 'socket.io-client';
import './Tabla.css';

const baseUrl = "http://localhost:5000";
const baseUrl2 = "http://34.107.243.225";

const socket = io.connect(baseUrl);
let datoss
function ListaPro() {
  const [procesos,setProcesos] = useState([])
  const [operaciones,setOperations] = useState([])
  const [lista,setLista] = useState([])
  
  

 async function llenar(data){
    console.log("Wenassssss")
    console.log(data)
    //console.log(data[0].vm)
    setProcesos(tot=> data)
   // setLista(oldArray => [...oldArray, data[data.length-1].process_list[data[data.length-1].process_list.length-1]])
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getInfo()
    }, 5000);
    socket.emit("cpu", "asd-prueba");    
    socket.on("cpu", async (mensaje) => {
    console.log("MENSAJE: ", mensaje);
    llenar(mensaje)
    //totalRams(mensaje)
    })

    return () => clearInterval(interval);
  }, [socket]);


  const getInfo = async() => {
    await fetch(`${baseUrl2}/CPU`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        
        }
    })
    .then(resp => resp.json())
    .then(data => {
      setOperations(data)  
    }).catch(console.error)
  }

  console.log(lista)


  return (
    
    <table className="table" border='1'>
    <thead>
      <tr>
        <th>
          VM
        </th>
        <th>
          Nombre del proceso 
        </th>
        <th>
          PID
        </th>
        <th>
          PID del padre
        </th>
        <th>
          Estado
        </th>
        <th>
          Hijos
        </th>
      </tr>
    </thead>
    <tbody>

    {procesos.map(( {vm,process_list}, index ) => {
          return (
            <tr>
              <td>{vm}</td>
              <td>{process_list[process_list.length-1].name}</td>
              <td>{process_list[process_list.length-1].pid}</td>
              <td>{process_list[process_list.length-1].parent_pid}</td>
              <td>{process_list[process_list.length-1].state}</td>
              <td></td>
            </tr>
          );
        })}


  
           
    </tbody>
  </table>
  
  )
}

export default ListaPro;