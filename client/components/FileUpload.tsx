import React, {useRef} from 'react';

interface FileUploadProps {
    setFile: Function
    accept: string;
    children: React.ReactNode
}

const FileUpload: React.FC<FileUploadProps> = ({setFile, accept, children}) => {

    const ref = useRef<HTMLInputElement>(null)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            console.log(new Error("File wasn't selected"));
            return;
        }
        setFile(e.target.files[0])
    }

    return (

        <div  onClick={() => ref.current?.click()}>
            <input
                accept={accept}
                type={"file"}
                style={{display: 'none'}}
                ref={ref}
                onChange={onChange}
            />
            {children}
        </div>
    );
};

export default FileUpload;