import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Reviews")
export class Review {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({
        "type": "varchar",
        "length": 500
    })
    content!: string;

    @Column({
        "type": "int"
    })
    rating!: number;

    @Column({
        "type": "timestamp",
        "default": () => "CURRENT_TIMESTAMP"
    })
    createdAt!: Date;

    @Column({
        "type": "timestamp",
        "default": () => "CURRENT_TIMESTAMP",
        "onUpdate": "CURRENT_TIMESTAMP"
    })
    updatedAt!: Date;
}
