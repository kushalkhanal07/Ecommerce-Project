import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from "typeorm";
import { IOrderAddress } from "../interface/IOrder";
import { User } from "./user";
import { OrderItem } from "./orderItem";

export enum orderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
}

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "varchar",
    length: 200,
    name: "order_number",
    nullable: false,
  })
  orderNumber!: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  remarks!: string;

  @Column({
    type: "numeric",
    precision: 10,
    scale: 2,
    nullable: false,
  })
  totalAmount!: number;

  @Column({
    type: "varchar",
    length: 200,
    nullable: false,
    default: orderStatus.PENDING,
  })
  status!: orderStatus;

  @Column({
    name: "shipping_address",
    type: "json",
    nullable: false,
  })
  shippingAddress!: IOrderAddress;

  @Column({
    type: "varchar",
    length: 500,
    nullable: false,
  })
  paymentMethod!: string;

  // order by relation with user
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: "user_id" })
  user!: User;

  // order items relation
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items!: OrderItem[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}
