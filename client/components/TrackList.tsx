import React from 'react';
import {ITrack} from "@/types/track";
import {Grid, Pagination, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import TrackItem from "@/components/TrackItem";
import {useInput} from "@/hooks/useInput";
import {useFilter} from "@/hooks/useFilters";
import {Stack} from "@mui/system";
import {usePagination} from "@/hooks/usePagination";

interface TrackListProps {
    tracks: ITrack[]
}

const ITEMS = 5;

const TrackList: React.FC<TrackListProps> = ({tracks}) => {

    const nameTrack = useInput('')
    const [page, setPage] = React.useState(1)

    const filteredTracks = useFilter(tracks, nameTrack.value)

    const countPages = Math.ceil(tracks.length / ITEMS)

    const handleChange = (e: React.ChangeEvent<any>, value: number) => {
        setPage(value)
    }

    const paginationTracks = usePagination(ITEMS, page, filteredTracks);

    return (

        <Grid container direction='column'>
            <TextField
                {...nameTrack}
                style={{marginTop: 10, background: "lightgrey"}}
                label='Введите название песни'
            />
            <Box p={5}>
                {paginationTracks.map(track =>
                    <TrackItem
                        key={track.id}
                        track={track}
                    />
                )}
            </Box>
            <Stack marginBottom={4} alignItems={'center'} spacing={2}>
                <Pagination page={page} onChange={handleChange} count={countPages}/>
            </Stack>
        </Grid>
    );
};

export default TrackList;