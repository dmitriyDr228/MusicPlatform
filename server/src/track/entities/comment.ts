import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Track} from "./track";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    text: string;

    @ManyToOne(() => Track, track => track.comments, {
        onDelete: 'CASCADE'
    })
    track: Track;

}