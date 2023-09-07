import {Module} from "@nestjs/common";
import {Album} from "./album.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FileService} from "../file/file.service";
import {AlbumController} from "./album.controller";
import {AlbumService} from "./album.service";
import {Track} from "../track/entities/track";
import {TrackService} from "../track/track.service";


@Module({
    imports: [TypeOrmModule.forFeature([Album, Track])],
    exports: [TypeOrmModule],
    controllers: [AlbumController],
    providers: [AlbumService, FileService],
})
export class AlbumModule {

}