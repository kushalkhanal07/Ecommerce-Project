import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("admins")
export class Admin {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  name!: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  email!: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  password!: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  PhoneNumber!: string;
}
