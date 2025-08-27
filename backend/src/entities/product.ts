import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "varchar",
    length: 200,
    nullable: false,
  })
  name!: string;

  @Column({
    type: "text",
    nullable: false,
  })
  description!: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price!: number;

  @Column({
    type: "varchar",
    nullable: false,
  })
  slug!: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;
  
  @Column({
    type: "int",
    default: 0,
  })
  stock!: number;

  
}
