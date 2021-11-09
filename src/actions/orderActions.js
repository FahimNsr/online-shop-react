import axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_MINE_LIST_FAIL,
  // ORDER_LIST_REQUEST,
  // ORDER_LIST_SUCCESS,
  // ORDER_LIST_FAIL,
  // ORDER_DELETE_REQUEST,
  // ORDER_DELETE_SUCCESS,
  // ORDER_DELETE_FAIL,
  // ORDER_DELIVER_REQUEST,
  // ORDER_DELIVER_SUCCESS,
  // ORDER_DELIVER_FAIL,
  // ORDER_SUMMARY_REQUEST,
  // ORDER_SUMMARY_SUCCESS,
} from "../constants/orderConstants";
const localApi = "http://localhost:8000";

export const createOrder = (order) => async (dispatch) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: { order } });
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(`${localApi}/api/orders`, order, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(data);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const detailsOrder = (orderId) => async (dispatch) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.get(`${localApi}/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};

export const listOrderMine = () => async (dispatch) => {
  dispatch({ type: ORDER_MINE_LIST_REQUEST });
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.get(`${localApi}/api/orders/myorders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message });
  }
};

// export const listOrders =
//   ({ seller = "" }) =>
//   async (dispatch) => {
//     dispatch({ type: ORDER_LIST_REQUEST });
// const token = localStorage.getItem("token")
//     try {
//       const { data } = await axios.get(`${localApi}/api/orders?seller=${seller}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       console.log(data);
//       dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
//     } catch (error) {
//       const message = error.response && error.response.data.message ? error.response.data.message : error.message;
//       dispatch({ type: ORDER_LIST_FAIL, payload: message });
//     }
//   };

// export const deleteOrder = (orderId) => async (dispatch) => {
//   dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
// const token = localStorage.getItem("token")
//   try {
//     const { data } = axios.delete(`${localApi}/api/orders/${orderId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
//   } catch (error) {
//     const message = error.response && error.response.data.message ? error.response.data.message : error.message;
//     dispatch({ type: ORDER_DELETE_FAIL, payload: message });
//   }
// };

// export const deliverOrder = (orderId) => async (dispatch) => {
//   dispatch({ type: ORDER_DELIVER_REQUEST, payload: orderId });
// const token = localStorage.getItem("token")
//   try {
//     const { data } = axios.put(
//       `${localApi}/api/orders/${orderId}/deliver`,
//       {},
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
//   } catch (error) {
//     const message = error.response && error.response.data.message ? error.response.data.message : error.message;
//     dispatch({ type: ORDER_DELIVER_FAIL, payload: message });
//   }
// };

// export const summaryOrder = () => async (dispatch) => {
//   dispatch({ type: ORDER_SUMMARY_REQUEST });
// const token = localStorage.getItem("token")
//   try {
//     const { data } = await axios.get(`${localApi}/api/orders/summary`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     dispatch({ type: ORDER_SUMMARY_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: ORDER_CREATE_FAIL,
//       payload: error.response && error.response.data.message ? error.response.data.message : error.message,
//     });
//   }
// };
