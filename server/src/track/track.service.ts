import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Track} from "./entities/track";
import {Comment} from "./entities/comment";
import {CreateTrackDto} from "./dto/create-track.dto";
import {CommentCreateDto} from "./dto/comment-create.dto";
import {FileService, FileType} from "../file/file.service";
import {AlbumService} from "../album/album.service";
import {Album} from "../album/album.entity";
import {TrackAlbumUpdateDto} from "./dto/track-update.dto";


@Injectable()
export class TrackService {
    constructor(
        @InjectRepository(Track)
        private trackRepository: Repository<Track>,
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
        @InjectRepository(Album)
        private albumRepository: Repository<Album>,
        private fileService: FileService,
        private albumService: AlbumService,
    ) {
    }

    async findTrackByArtist(artist: string) {
        return this.trackRepository.find({
            where: {artist}
        })
    }

    async updateAlbum(id, dto: TrackAlbumUpdateDto): Promise<any> {
        const trackFromDB = await this.trackRepository.findOneBy({id});
        trackFromDB.album = dto.albumId;
        await this.trackRepository.update(id, trackFromDB);
        return `track with ${id} добавлен в альбом ${dto.albumId}`
    }

    async create(dto: CreateTrackDto, audio, picture): Promise<Track> {
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
        const picturePAth = this.fileService.createFile(FileType.IMAGE, picture);

        const track = await this.trackRepository.save(
            {...dto, audio: audioPath, picture: picturePAth, listens: 0}
        )


        if (dto.albumId) {
            const album = await this.albumService.getOne(dto.albumId);
            album.tracks = [track, ...album.tracks]
            await this.albumRepository.save(album);
        }


        return track;
    }

    async getAll(count = 0, offset = 10): Promise<Track[]> {
        const tracks = await this.trackRepository.find({
            relations: {
                album: true,
                comments: true,
            },
            skip: count,
            take: offset,
        })
        return tracks;
    }

    async getOne(id: number) {
        const track = await this.trackRepository.findOne({
            relations: {
                album: true,
                comments: true,
            },
            where: {id}
        })
        return track;
    }


    async deleteById(id: number): Promise<void> {
        await this.trackRepository.delete({id})
            .then(data => console.log(`Трек успешно удален`));
    }

    async addComment(dto: CommentCreateDto): Promise<Comment> {
        const track = await this.trackRepository.findOne({
            where: {id: dto.trackId},
        })
        const comment = await this.commentRepository.create({
            ...dto
        })
        track.comments = [comment, ...track.comments]
        await this.trackRepository.save(track);
        return comment;
    }

    async listen(id: number) {
        const track = await this.trackRepository.findOneBy({id})
        track.listens += 1;
        track.id = id;
        await this.trackRepository.update(id, track).then(
            () => console.log('Трек прослушали')
        );
    }

    async search(query: string): Promise<Track[]> {

        const tracks = await this.trackRepository.find({
            relations: {
                comments: true,
            },
            where: {name: query}
        })
        return tracks;

    }
}