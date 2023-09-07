import React from 'react';
import {alpha, Button, FormControl, Grid, InputLabel, Menu, MenuItem, MenuProps} from "@mui/material";
import {styled} from "@mui/material/styles";
import {IAlbum} from "@/types/album";
import {ITrack} from "@/types/track";
import IconButton from "@mui/material/IconButton";
import {Delete, Send} from "@mui/icons-material";
import SelectAlbums from "@/components/SelectAlbums";
import {useRouter} from "next/router";
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({theme}) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

interface OptionMenuProps {
    deleteTrack: (trackId: number) => void
    addTrack: (trackId: number) => void
    album?: IAlbum
    track: ITrack
    setAlbum: Function
    selectedAlbum: string
    albums: IAlbum[]


}

const OptionMenu: React.FC<OptionMenuProps> = ({
                                                   deleteTrack,
                                                   addTrack,
                                                   album,
                                                   track,
                                                   setAlbum,
                                                   selectedAlbum,
                                                   albums
                                               }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        event.stopPropagation();
    };
    const handleClose = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        setAnchorEl(null);
    };

    const router = useRouter()

    return (
        <div style={{margin: 5}}>
            <Button
                id="demo-customized-button"
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<ArrowDropDownRoundedIcon/>}

            >
                Options
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {!track.album &&
                    <MenuItem style={{marginTop: 5}} onClick={handleClose} disableRipple
                    >
                        <Grid
                            onClick={(e) => e.stopPropagation()}
                            container
                            justifyContent={'flex-end'}
                        >
                            <FormControl fullWidth>
                                <InputLabel>Albums</InputLabel>
                                <SelectAlbums albums={albums} setAlbum={setAlbum} album={selectedAlbum}/>
                            </FormControl>
                        </Grid>
                        <IconButton onClick={(e) => e.stopPropagation()}>
                            <Send onClick={() => {
                                addTrack(track.id)
                                setAnchorEl(null)
                            }}/>
                        </IconButton>
                    </MenuItem>
                }

                <MenuItem style={{justifyContent: 'end'}} onClick={handleClick} disableRipple>
                    <Button
                        fullWidth
                        endIcon={<MoreHorizRoundedIcon/>}
                        variant={'outlined'}
                        onClick={(e) => {
                            e.stopPropagation()
                            router.push('tracks/' + track.id)
                            setAnchorEl(null)
                        }
                        }
                    >
                        Подробности
                    </Button>
                </MenuItem>

                <MenuItem style={{justifyContent: 'end'}} onClick={handleClick} disableRipple>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteTrack(track.id)
                            setAnchorEl(null);
                        }
                        }
                        fullWidth
                        endIcon={<Delete/>}
                        variant={'outlined'}
                    >
                        Удалить
                    </Button>
                </MenuItem>

            </StyledMenu>
        </div>
    );
};

export default OptionMenu;