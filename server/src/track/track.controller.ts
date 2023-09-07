import {Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {TrackService} from "./track.service";
import {CreateTrackDto} from "./dto/create-track.dto";
import {CommentCreateDto} from "./dto/comment-create.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {TrackAlbumUpdateDto} from "./dto/track-update.dto";

@Controller('/tracks')
export class TrackController {

    constructor(private trackService: TrackService) {
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1},
        {name: 'audio', maxCount: 1},
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
        const {picture, audio} = files;
        return this.trackService.create(dto, audio[0], picture[0]);
    }

    @Get()
    getAll(@Query('count') count: number,
           @Query('offset') offset: number) {
        return this.trackService.getAll(count, offset)
    }

    @Get(':id')
    getOneById(@Param('id') id: number) {
        return this.trackService.getOne(id)
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.trackService.deleteById(id);
    }

    @Post('/comment')
    addComment(@Body() dto: CommentCreateDto) {
        return this.trackService.addComment(dto);
    }


    @Get('/search')
    search(@Query('query') query: string) {
        return this.trackService.search(query);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: TrackAlbumUpdateDto) {
        return this.trackService.updateAlbum(id, dto);
    }

    @Put('/listen/:id')
    listen(@Param('id') id: number) {
        return this.trackService.listen(id);
    }

}
