import {Module} from "@nestjs/common";
import {TrackModule} from "./track/track.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FileModule} from "./file/file.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path'
import {AlbumModule} from "./album/album.module";

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static')
        }),
        TrackModule,
        AlbumModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '0000',
            database: 'spotik-js',
            autoLoadEntities: true,
            synchronize: true,
        }), FileModule]
})
export class AppModule {

}