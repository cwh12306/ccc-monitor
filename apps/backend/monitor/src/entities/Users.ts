import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class Users {
    @PrimaryColumn({
        type: 'int',
        generated: true,
    })
    id!: number;

    @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
    username!: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    email!: string;

    @Column({
        type: 'text',
    })
    password_hash!: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
    })
    created_at!: Date;
}
