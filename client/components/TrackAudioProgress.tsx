import React from 'react';

interface TrackAudioProgressProps {
    left: number;
    right: number;

    onChange: (e: any) => void

}

const TrackAudioProgress: React.FC<TrackAudioProgressProps> = ({left, right, onChange}) => {

    return (
        <div style={{display: 'flex'}}>
            <div>{(left/60).toFixed(2)}</div>
            <input
                type={'range'}
                style={{boxSizing:"border-box", width:850, marginLeft:8, marginRight:8}}
                min={0}
                max={right}
                value={left}
                onChange={onChange}
            />
            <div>{(right/60).toFixed(2)}</div>
        </div>
    );
};

export default TrackAudioProgress;