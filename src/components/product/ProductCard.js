import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';

const ProductCard = ({ product, ...rest }) => {
  const onDeleteHandler = (id) => {
    var token = localStorage.getItem('UserToken');
    axios
      .delete(
        `http://localhost:5000/api/iot/v2.0/project/delete-project/${id}`,
        {
          headers: {
            'x-auth-token': token
          }
        }
      )
      .then((projects) => {
        location.reload();
      })
      .catch((e) => console.log(e));
  };
  localStorage.setItem('topic', product.topic);
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      {...rest}
    >
      <CardContent
        component={RouterLink}
        to=""
        to={{
          pathname: '/app/customers',
          search: `?project_id=${product._id}`
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3
          }}
        ></Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {product.name}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          {product.description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          ></Grid>
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <DeleteIcon
              color="action"
              onClick={() => {
                var res = confirm(
                  `Are you sure you want to delete this project(${product.name})!`
                );
                res ? onDeleteHandler(product._id) : '';
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductCard;
