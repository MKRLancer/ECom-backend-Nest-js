import { ProductCategory } from 'src/product-category/entities/product-category.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, CreateDateColumn, UpdateDateColumn, BeforeInsert, ManyToOne } from 'typeorm';
import { ImageDetails } from '../types/ImageDeatails.type';

@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    name: string;

    @Column({ unique: true, nullable: true })
    slug: string

    @Column({ nullable: true })
    description: string

    @Column({ nullable: false })
    price: number

    @Column({ nullable: false, type: 'json' })
    image: ImageDetails

    @Column({ nullable: false })
    quantity: number

    @ManyToOne(() => ProductCategory, {
        eager: true,
    })
    @JoinColumn()
    category: ProductCategory;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;

    @BeforeInsert()
    generateSlug() {
        this.slug = this.name.split(" ").join("-");
    }
}

