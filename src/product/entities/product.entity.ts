import { ProductCategory } from 'src/product-category/entities/product-category.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, CreateDateColumn, UpdateDateColumn, Timestamp } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    name: string;

    @Column()
    slug: string

    @Column()
    description: string

    @Column({ nullable: false })
    price: number

    @Column({ nullable: false })
    image: number

    @Column({ nullable: false })
    quantity: number

    @OneToOne(() => ProductCategory)
    @JoinColumn()
    category: ProductCategory;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

