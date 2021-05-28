import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  NativeSelect
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import openSocket from 'socket.io-client';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import FileSaver from 'file-saver';

const Budget = (props) => {
  let projectId = localStorage.getItem('project_id');

  const [data, setData] = useState([0, 0]);
  const [select, setSelect] = useState(0);
  const [downloadableData, setDownloadableData] = useState([]);
  useEffect(() => {
    // console.log('Websocket Refresh ==============================');
    var token = localStorage.getItem('UserToken');
    axios
      .get('http://localhost:5000/api/iot/v2.0/detail/get-details', {
        headers: {
          'x-auth-token': token
        }
      })
      .then((dev) => {})
      .catch((e) => console.log(e));

    const socket = openSocket('http://localhost:5000');
    // var top = localStorage.getItem('topic');
    // socket.on(top, (data) => {
    //   // console.log(data.message);
    //   setAll(data.message);
    // });
    // return () => {
    //   socket.on('disconnect', function () {
    //     console.log('disconnect client event....');
    //   });
    // };
  }, []);

  useEffect(() => {
    const socket = openSocket('http://localhost:5000');
    var top = localStorage.getItem('topic');
    socket.on(top, (data) => {
      // console.log(data.message);
      setData(data.message);
    });
    return () => {
      socket.on('disconnect', function () {
        console.log('disconnect client event....');
      });
    };
  }, []);

  const colors = [
    '#34568B',
    '#FF6F61',
    '#6B5B95',
    '#88B04B',
    '#955251',
    '#009B77'
  ];

  const onDownloadHandler = () => {
    var token = localStorage.getItem('UserToken');
    var topic = localStorage.getItem('topic');
    axios
      .post(
        `http://localhost:5000/api/iot/v2.0/detail/download-data/${topic}/${select}`,
        {},
        {
          headers: {
            'x-auth-token': token
          }
        }
      )
      .then((dev) => {
        var arr = [];
        for (let index = 0; index < dev.data.details.length; index++) {
          dev.data.details[index].data.map((item) => {
            arr.push(
              '  Sensor - ' + item.sensor,
              '  Value: ' +
                item.value +
                ',' +
                ' Date: ' +
                dev.data.details[index].date +
                '\r\n'
            );
          });
        }

        var topic = localStorage.getItem('topic');
        var file = new File(arr, `${topic}.txt`, {
          type: 'text/plain;charset=utf-8'
        });
        FileSaver.saveAs(file);
        setDownloadableData((arr) => [...arr, dev.data]);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Card sx={{ height: '100%' }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {props.devices.name}
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {data[props.ind].sensor === props.devices.purpose
                ? data[props.ind].value
                : 0}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: '#34568B',
                // backgroundColor:
                //   colors[Math.floor(Math.random() * colors.length)],
                height: 56,
                width: 56
              }}
            >
              <ShowChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography
            sx={{
              color: red[900],
              mr: 1
            }}
            variant="body2"
          >
            <Button
              variant="contained"
              style={{ background: '#34568B' }}
              onClick={onDownloadHandler}
            >
              <ArrowDownwardIcon /> Download
            </Button>
          </Typography>
          <Typography color="textSecondary" variant="caption">
            <NativeSelect
              value={select}
              onChange={(e) => setSelect(e.target.value)}
              name="age"
              inputProps={{ 'aria-label': 'age' }}
            >
              <option value="0">A Day</option>
              <option value="7">7 Days</option>
              <option value="21">1 Week</option>
              <option value="31">1 Month</option>
            </NativeSelect>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
export default Budget;
