import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Album} from "./album.entity";
import {Repository} from "typeorm";
import {FileService, FileType} from "../file/file.service";
import {AlbumCreateDto} from "./dto/album-create.dto";
import {Track} from "../track/entities/track";

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(Album)
        private albumRepository: Repository<Album>,
        @InjectRepository(Track)
        private trackRepository: Repository<Track>,
        private fileService: FileService,
    ) {
    }


    async create(albumDto: AlbumCreateDto, picture) {
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture);

        const album = await this.albumRepository.save(
            {...albumDto, picture: picturePath, listens: 0}
        )

        return album;
    }

    async findAlbumByTitle(album: string) {
        return this.albumRepository.findOne({
            relations: {
                tracks: true,
            },
            where: {title: album},
        })
    }

    async findAll(take = 10, skip = 0) {
        const albums = this.albumRepository.find({
            relations: {
                tracks: true
            },
            skip: skip,
            take: take,
        })
        return albums;
    }

    async delete(id: number) {

        await this.albumRepository.delete({id})
            .then(() => console.log('Альбом удален'))

    }

    async getOne(id: number) {
        return this.albumRepository.findOne({
            relations: {
                tracks: true,
            },
            where: {id},
        })
    }
}