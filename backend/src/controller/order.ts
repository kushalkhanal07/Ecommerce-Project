import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Order } from '../entities/order';
import { OrderItem } from '../entities/orderItem';
import { User } from '../entities/user';
import { Product } from '../entities/product';
import { ICreateOrder, IOrderResponse } from '../interface/IOrder';

// Generate unique order number
const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${timestamp}-${random}`;
};

// Calculate order total from items
const calculateOrderTotal = (items: any[]): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Create new order
export const createOrder = async (req: Request, res: Response) => {
  const orderRepo = AppDataSource.getRepository(Order);
  const orderItemRepo = AppDataSource.getRepository(OrderItem);
  const userRepo = AppDataSource.getRepository(User);
  const productRepo = AppDataSource.getRepository(Product);

  try {
    const { userId, items, shippingAddress, paymentMethod, remarks }: ICreateOrder = req.body;

    // Validate required fields
    if (!userId || !items || !shippingAddress || !paymentMethod) {
      return res.status(400).send({
        success: false,
        message: "Missing required fields: userId, items, shippingAddress, paymentMethod",
      });
    }

    // Validate items array
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).send({
        success: false,
        message: "Items array is required and cannot be empty",
      });
    }

    // Validate each item
    for (const item of items) {
      if (!item.productId || !item.quantity || item.quantity <= 0) {
        return res.status(400).send({
          success: false,
          message: "Each item must have productId and quantity > 0",
        });
      }
    }

    // Check if user exists
    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Validate products and calculate total
    const orderItems: Partial<OrderItem>[] = [];

    for (const item of items) {
      const product = await productRepo.findOne({ where: { id: item.productId } });
      if (!product) {
        return res.status(404).send({
          success: false,
          message: `Product with ID ${item.productId} not found`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).send({
          success: false,
          message: `Insufficient stock for product ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`,
        });
      }

      orderItems.push({
        productName: product.name,
        quantity: item.quantity,
        price: product.price,
        totalPrice: product.price * item.quantity,
        product: product,
      });
    }

    const totalAmount = calculateOrderTotal(orderItems);

    // Create order
    const orderNumber = generateOrderNumber();
    const newOrder = orderRepo.create({
      orderNumber,
      totalAmount,
      shippingAddress,
      paymentMethod,
      remarks,
      user,
      status: 'pending' as any,
    });

    const savedOrder = await orderRepo.save(newOrder);

    // Create order items
    const savedOrderItems = await Promise.all(
      orderItems.map(async (item) => {
        const orderItem = orderItemRepo.create({
          ...item,
          order: savedOrder,
        });
        return await orderItemRepo.save(orderItem);
      })
    );

    // Update product stock
    for (const item of items) {
      const product = await productRepo.findOne({ where: { id: item.productId } });
      if (product) {
        product.stock -= item.quantity;
        await productRepo.save(product);
      }
    }

    // Prepare response
    const orderResponse: IOrderResponse = {
      id: savedOrder.id,
      orderNumber: savedOrder.orderNumber,
      totalAmount: savedOrder.totalAmount,
      status: savedOrder.status,
      items: savedOrderItems.map(item => ({
        productId: item.product.id,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.totalPrice,
      })),
      shippingAddress: savedOrder.shippingAddress,
      paymentMethod: savedOrder.paymentMethod,
      remarks: savedOrder.remarks,
      createdAt: savedOrder.created_at,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };

    return res.status(201).send({
      success: true,
      message: "Order created successfully",
      data: orderResponse,
    });

  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get all orders for a user
export const getUserOrders = async (req: Request, res: Response) => {
  const orderRepo = AppDataSource.getRepository(Order);
  const { userId } = req.params;

  try {
    const orders = await orderRepo.find({
      where: { user: { id: userId } },
      relations: ['items', 'user'],
      order: { created_at: 'DESC' },
    });

    if (!orders || orders.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No orders found for this user",
      });
    }

    const formattedOrders = orders.map(order => ({
      id: order.id,
      orderNumber: order.orderNumber,
      totalAmount: order.totalAmount,
      status: order.status,
      items: order.items,
      shippingAddress: order.shippingAddress,
      paymentMethod: order.paymentMethod,
      remarks: order.remarks,
      createdAt: order.created_at,
      user: {
        id: order.user.id,
        name: order.user.name,
        email: order.user.email,
      },
    }));

    return res.status(200).send({
      success: true,
      data: formattedOrders,
    });

  } catch (error) {
    console.error('Error fetching user orders:', error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get order by ID
export const getOrderById = async (req: Request, res: Response) => {
  const orderRepo = AppDataSource.getRepository(Order);
  const { orderId } = req.params;

  try {
    const order = await orderRepo.findOne({
      where: { id: orderId },
      relations: ['items', 'user'],
    });

    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }

    const orderResponse: IOrderResponse = {
      id: order.id,
      orderNumber: order.orderNumber,
      totalAmount: order.totalAmount,
      status: order.status,
      items: order.items.map(item => ({
        productId: item.product.id,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.totalPrice,
      })),
      shippingAddress: order.shippingAddress,
      paymentMethod: order.paymentMethod,
      remarks: order.remarks,
      createdAt: order.created_at,
      user: {
        id: order.user.id,
        name: order.user.name,
        email: order.user.email,
      },
    };

    return res.status(200).send({
      success: true,
      data: orderResponse,
    });

  } catch (error) {
    console.error('Error fetching order:', error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update order status (admin only)
export const updateOrderStatus = async (req: Request, res: Response) => {
  const orderRepo = AppDataSource.getRepository(Order);
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await orderRepo.findOne({ where: { id: orderId } });
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }

    // Validate status
    const validStatuses = ['pending', 'processing', 'completed', 'cancelled', 'refunded'];
    if (!validStatuses.includes(status)) {
      return res.status(400).send({
        success: false,
        message: "Invalid status. Must be one of: pending, processing, completed, cancelled, refunded",
      });
    }

    order.status = status as any;
    await orderRepo.save(order);

    return res.status(200).send({
      success: true,
      message: "Order status updated successfully",
      data: { id: order.id, status: order.status },
    });

  } catch (error) {
    console.error('Error updating order status:', error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get all orders (admin only)
export const getAllOrders = async (req: Request, res: Response) => {
  const orderRepo = AppDataSource.getRepository(Order);

  try {
    const orders = await orderRepo.find({
      relations: ['items', 'user'],
      order: { created_at: 'DESC' },
    });

    if (!orders || orders.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No orders found",
      });
    }

    const formattedOrders = orders.map(order => ({
      id: order.id,
      orderNumber: order.orderNumber,
      totalAmount: order.totalAmount,
      status: order.status,
      items: order.items,
      shippingAddress: order.shippingAddress,
      paymentMethod: order.paymentMethod,
      remarks: order.remarks,
      createdAt: order.created_at,
      user: {
        id: order.user.id,
        name: order.user.name,
        email: order.user.email,
      },
    }));

    return res.status(200).send({
      success: true,
      data: formattedOrders,
    });

  } catch (error) {
    console.error('Error fetching all orders:', error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};


