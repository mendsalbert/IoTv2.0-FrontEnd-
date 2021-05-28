import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import 'chartjs-plugin-streaming';
import axios from 'axios';
import openSocket from 'socket.io-client';

const Charts = (props) => {
  console.log('hey! I am chart and i am rendering everytime');
  const [socket] = useState(() => openSocket('http://localhost:5000'));

  const colors = [
    '#34568B',
    '#FF6F61',
    '#6B5B95',
    '#88B04B',
    '#955251',
    '#009B77'
  ];

  var datasets = [];
  props.devices.map((dev, i) => {
    datasets.push({
      label: dev.name,
      backgroundColor: colors[i],
      data: [],
      borderColor: colors[i],
      fill: false
      // borderDash: [8, 4]
    });
  });
  // console.log(datasets);

  return (
    <Line
      width={1200}
      height={700}
      redraw={true}
      data={{
        datasets
      }}
      options={{
        scales: {
          xAxes: [
            {
              type: 'realtime'
            }
          ]
        },
        plugins: {
          streaming: {
            // frameRate: 5,
            delay: 1000,
            onRefresh: (chart) => {
              chart.data.datasets.map((dataset, i) => {
                var top = localStorage.getItem('topic');
                socket.on(top, (data) => {
                  // console.log(data.message);
                  dataset.data.push({
                    x: Date.now(),
                    // y: data[i].value
                    y: data.message[i].value
                    // y: props.detailsDev[i].value
                    // y: Math.floor(Math.random() * 20) + 1
                  });
                });
                chart.update({
                  preservation: true
                });
              });
            }
          }
        }
      }}
    />
  );
};

export default Charts;
