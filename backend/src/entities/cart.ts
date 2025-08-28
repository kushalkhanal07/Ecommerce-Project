import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";
import { User } from "./user";

@Entity("cart")
export class Cart {
  // Define your entity properties and methods here
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  @Column({
    "type": "integer",
    "default": 1
  })
  quantity!:number

  @OneToMany(() => Product, (product) => product.cart)
  product!: Product[];

  @OneToOne(() => User, (user) => user.cart)
  user!: User;
}
