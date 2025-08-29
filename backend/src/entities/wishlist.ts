import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";
import { User } from "./user";

@Entity("wishlist")
export class Wishlist {
  // Define your entity properties and methods here
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => Product, (product) => product.cart)
  @JoinColumn()
  product!: Product;

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn()
  user!: User;
}
