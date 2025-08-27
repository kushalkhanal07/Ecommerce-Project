import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ type: "varchar", length: 200 })
  name!: string;

  @Column({ type: "varchar", length: 200, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 200 })
  password!: string;

  @Column({ type: "varchar", name: "phone_number", length: 200 })
  phoneNumber!: string;

  @Column({ type: "timestamp", nullable: true })
  lastLoginAt!: Date;

  @Column({ type: "varchar", length: 45, nullable: true })
  lastLoginIp!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
}
