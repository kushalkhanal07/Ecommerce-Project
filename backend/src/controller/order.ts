// import { Request, Response } from 'express';
// import { AppDataSource } from '../config/database';
// import { Order } from '../entities/order';
// import { User } from '../entities/user';
// import { Product } from '../entities/product';

// // Create a new order
// export const createOrder = async (req: Request, res: Response) => {
//     try {
//         const { userId, products, totalAmount, status } = req.body;

//         const user = await AppDataSource.getRepository(User).findOne(
//             { where: { id: userId } }
//         )
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const order = new Order();
//         order.totalAmount = totalAmount;
//         order.status = status || 'pending';

//         // Assuming products is an array of product IDs
//         order.products = [];
//         for (const productId of products) {
//             const product = await AppDataSource.getRepository(Product).findOneBy({ id: productId });
//             if (product) {
//                 order.products.push(product);
//             }
//         }

//         await AppDataSource.getRepository(Order).save(order);
//         return res.status(201).json(order);
//     } catch (error) {
//         return res.status(500).json({ message: 'Error creating order', error });
//     }
// };

// // Get all orders
// export const getOrders = async (_req: Request, res: Response) => {
//     try {
//         const orders = await AppDataSource.getRepository(Order).find({
//             relations: ['user', 'products'],
//         });
//         return res.json(orders);
//     } catch (error) {
//         return res.status(500).json({ message: 'Error fetching orders', error });
//     }
// };

// // Get order by ID
// export const getOrderById = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const order = await AppDataSource.getRepository(Order).findOne({
//             where: { id: Number(id) },
//             relations: ['user', 'products'],
//         });
//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }
//         return res.json(order);
//     } catch (error) {
//         return res.status(500).json({ message: 'Error fetching order', error });
//     }
// };

// // Update order status
// export const updateOrderStatus = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const { status } = req.body;
//         const orderRepo = AppDataSource.getRepository(Order);
//         const order = await orderRepo.findOneBy({ id: Number(id) });
//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }
//         order.status = status;
//         await orderRepo.save(order);
//         return res.json(order);
//     } catch (error) {
//         return res.status(500).json({ message: 'Error updating order', error });
//     }
// };

// // Delete order
// export const deleteOrder = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const orderRepo = AppDataSource.getRepository(Order);
//         const order = await orderRepo.findOneBy({ id: Number(id) });
//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }
//         await orderRepo.remove(order);
//         return res.json({ message: 'Order deleted successfully' });
//     } catch (error) {
//         return res.status(500).json({ message: 'Error deleting order', error });
//     }
// };