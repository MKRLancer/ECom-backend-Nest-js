import { ProductCategory } from 'src/product-category/entities/product-category.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    slug: string

    @Column()
    description: string

    @Column()
    price: number

    @Column()
    image: number

    @Column()
    quantity: number

    @OneToOne(() => ProductCategory)
    @JoinColumn()
    category: ProductCategory;

    @Column({ default: true })
    isActive: boolean;
}

