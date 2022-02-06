import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('user')
class User
{
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;
}

export { User }