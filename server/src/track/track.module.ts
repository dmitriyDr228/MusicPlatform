import {Module} from "@nestjs/common";
import {TrackService} from "./track.service";
import {TrackController} from "./track.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Track} from "./entities/track";
import {Comment} from "./entities/comment";
import {FileService} from "../file/file.service";
import {AlbumService} from "../album/album.service";
import {Album} from "../album/album.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Track, Comment, Album])],
    controllers: [TrackController],
    providers: [TrackService, FileService, AlbumService],
    exports: [TypeOrmModule]

})
export class TrackModule {

}