import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../categories/category.entity";

@Entity('product')
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255, nullable: false })
    name: string;

    @Column()
    description: string

    @Column({ nullable: false })
    price: number

    @Column({ nullable: false })
    active: boolean

    @ManyToOne(() => Category, (category) => category.id, { nullable: false },)
    @JoinColumn({ name: 'categoryId' })
    category: Category;
}