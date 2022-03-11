import React, { useEffect, useState } from "react";
import { Line, defaults } from "react-chartjs-2";
import io from 'socket.io-client';

import { Rectangulo, Rectangulo2, Contenedor } from "./NavBarElements";
//import { Line, defaults } from 'react-chartjs-2'

defaults.global.tooltips.enabled = false;
defaults.global.legend.position = "bottom";
const baseUrl = "https://loyal-operation-341718.uc.r.appspot.com";

function Ram () {
  const [datos, setDatos] = useState([])
  const [total, setTotal] = useState([])
  const [consumida, setConsumida] = useState([])
  const [porcentaje, setPorcentaje] = useState([])
  const [libre, setLibre] = useState([])
  function actualizar(data){
    setDatos(datos=> data[data.length-1])
    //setTotal(totalRam=>datos.data.total)
  }
  function totalRams(data){
    setTotal(tot=> data[data.length-1].data.total)
    setConsumida(tot=> data[data.length-1].data.consumida)
    setPorcentaje(tot=> data[data.length-1].data.porcentaje)
    setLibre(tot=> data[data.length-1].data.libre)
  }
  const socket = io.connect(baseUrl);
  //-------------------
  useEffect(() => {
    socket.emit("ram", "asd-prueba");    
    socket.on("ram", async (mensaje) => {
    console.log("MENSAJE: ", mensaje);
    totalRams(mensaje)
    })
  }, [socket]);
  const tempInt = []
  console.log(tempInt);
  console.log("sali")
  //console.log(results.consumida)
  //------------------

  return (
    <div>
      <div>RAM</div>
      <Rectangulo>
        <h3>VM1</h3>
        <div className="rectangle2">
          Total
          <br/>
          <b>{total/(1024)}MB</b>
        </div>
        <div className="rectangle2">
          en uso:
          <br/>
          <b>{consumida/1024}MB</b>
        </div>
        <div className="rectangle2">en uso %
        <br/>
          <b>{porcentaje}%</b>
        </div>
        <div className="rectangle2">RAM libre
        <br/>
          <b>{libre/1024}%</b>
        </div>
      </Rectangulo>
      <Rectangulo2>
        <h3>VM2</h3>
        <div className="rectangle2">Total RAM</div>
        <div className="rectangle2">RAM en uso</div>
        <div className="rectangle2">RAM en uso %</div>
        <div className="rectangle2">RAM libre</div>
      </Rectangulo2>

      <Contenedor>
        <Line
          data={{
            labels: [1, 2, 3, 4],
            datasets: [
              {
                label: "VM1",
                data: [1,2],
                borderColor: "orange",
                borderWidth: 1,
              },
              {
                label: "VM2",
                data: tempInt,
                borderColor: "red",
              },
            ],
          }}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 25,
              },
            },
          }}
        />
      </Contenedor>
    </div>
  );
};

export default Ram;