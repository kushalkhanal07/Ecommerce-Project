import express from 'express';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
} from '../controller/order';

const router = express.Router();

// Create new order
router.post('/create', createOrder);

// Get all orders for a specific user
router.get('/user/:userId', getUserOrders);

// Get order by ID
router.get('/:orderId', getOrderById);

// Update order status (admin only)
router.patch('/:orderId/status', updateOrderStatus);

// Get all orders (admin only)
router.get('/', getAllOrders);

export default router;
