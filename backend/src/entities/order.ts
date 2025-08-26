import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { IOrderAddress } from "../interface/IOrder";


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
    nullable: false,
  })
  totalAmount!: number;

  @Column({
    type: "varchar",
    length: 200,
    nullable: false,
  })
  status!: orderStatus;

  @Column({
    name: "shipping_address",
    type: "jsonb",
    nullable: false,
  })
  shippingAddress!: IOrderAddress;


  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

}
