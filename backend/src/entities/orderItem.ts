import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Order } from "./order";
import { Product } from "./product";

@Entity("order_items")
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "varchar",
    length: 200,
    nullable: false,
  })
  productName!: string;

  @Column({
    type: "int",
    nullable: false,
  })
  quantity!: number;

  @Column({
    type: "numeric",
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price!: number;

  @Column({
    type: "numeric",
    precision: 10,
    scale: 2,
    name: "total_price",
    nullable: false,
  })
  totalPrice!: number;

  @ManyToOne(() => Order, (order) => order.items)
  order!: Order;

  @ManyToOne(() => Product)
  product!: Product;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
