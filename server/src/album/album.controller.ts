import {Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {AlbumService} from "./album.service";
import {AlbumCreateDto} from "./dto/album-create.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";

@Controller('/albums')
export class AlbumController {

    constructor(private albumService: AlbumService) {
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1},
    ]))
    createAlbum(@Body() dto: AlbumCreateDto, @UploadedFiles() files) {
        const {picture} = files;
        return this.albumService.create(dto, picture[0])
    }

    @Get()
    getAllAlbums(@Query('take') take: number,
                 @Query('skip') skip: number) {
        return this.albumService.findAll(take, skip)
    }

    @Get(':id')
    getAlbumById(@Param('id') id: number) {
        return this.albumService.getOne(id)
    }

    @Delete(':id')
    deleteAlbumById(@Param('id') id: number) {
        return this.albumService.delete(id)
    }


}