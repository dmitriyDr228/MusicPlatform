import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Comment} from "./comment";
import {Album} from "../../album/album.entity";


@Entity()
export class Track {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    artist: string;

    @Column()
    name: string;

    @Column()
    text: string;

    @Column()
    listens: number;

    @Column({
        nullable: true
    })
    picture: string;

    @Column({
        nullable: true
    })
    audio: string;

    @ManyToOne(() => Album, (album: Album) => album.tracks,
        {
            onDelete: 'SET NULL'
        })
    album?: Album;


    @OneToMany(() => Comment
        , (comment) => comment.track
        , {
            cascade: true,
        })
    comments: Comment[]
}