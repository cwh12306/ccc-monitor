import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('application')
export class Application {
    @PrimaryColumn({
        type: 'int',
        generated: true,
    })
    id!: number;

    @Column({
        type: 'varchar',
        length: 80,
    })
    name!: string;

    @Column({
        type: 'enum',
        enum: ['vanilla', 'react', 'vue'],
    })
    type!: 'vanilla' | 'react' | 'vue';

    @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @Column({
        type: 'boolean',
        default: false,
    })
    is_deleted!: boolean;
}
