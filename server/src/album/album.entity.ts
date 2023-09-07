import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Track} from "../track/entities/track";

@Entity()
export class Album {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    picture: string;

    @Column()
    listens: number;

    @Column()
    artist: string;

    @OneToMany(() => Track, (track: Track) => track.album, {
        cascade: ['insert', 'update'],
        onDelete: "CASCADE",
    })
    tracks: Track[]

}