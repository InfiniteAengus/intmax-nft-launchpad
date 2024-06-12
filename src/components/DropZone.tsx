import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { useDisplayImage } from '@/hooks/useDisplayImage';

// import { ReactComponent as UploadIcon } from "src/assets/upload.svg";
// import { replacePinataUrl } from "src/helpers/pinata";

interface Props {
  acceptType: string | string[];
  setFile: any;
  defaultRes?: {
    type?: number;
    link?: string;
  };
  disabled?: boolean;
  imgStyle?: Record<string, any>;
  style?: Record<string, any>;
}

const replacePinataUrl = (url: string | undefined = '') => url;

const Dropzone = (props: Props) => {
  const { acceptType, setFile, defaultRes, disabled = false } = props;

  const [fileType, setFileType] = useState(defaultRes?.type || 0);

  const onDrop = useCallback((acceptedFiles: any[]) => {
    acceptedFiles.forEach((file) => {
      uploader(file);
    });
  }, []); //eslint-disable-line

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: acceptType as any,
    maxSize: 10 ** 9,
  });

  const { result, uploader } = useDisplayImage();

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      let type = 0;
      if (acceptedFiles[0].type.includes('image')) {
        type = 0;
      } else if (acceptedFiles[0].type.includes('video')) {
        type = 1;
      } else if (acceptedFiles[0].type.includes('audio')) {
        type = 2;
      }

      setFileType(type);
      setFile(acceptedFiles[0], type);
    }
  }, [acceptedFiles]); //eslint-disable-line

  useEffect(() => {
    setFileType(props.defaultRes?.type || 0);
  }, [props.defaultRes]);

  const inputProps = disabled ? {} : getInputProps();
  const rootProps = disabled ? {} : getRootProps();

  return (
    <div
      {...rootProps}
      className='relative flex aspect-square w-[300px] max-w-full flex-col items-center justify-center overflow-hidden rounded-md border border-border bg-componentBackground'
      style={{ ...props.style }}>
      <input {...inputProps} />
      <div className='absolute left-0 top-0 h-full w-full bg-componentBackground opacity-0 transition-all duration-300 hover:opacity-20' />
      {typeof result === 'string' && !result.toString() && !defaultRes?.link ? (
        <>
          {/* <UploadIcon /> */}
          <p className='mt-2 text-textDescription'>
            PNG, GIF, WEBP or MP4. MAX 1Gb
          </p>
        </>
      ) : fileType === 0 ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={
            (typeof result === 'string' && result.toString()) ||
            replacePinataUrl(defaultRes?.link) ||
            '/images/img_error.png'
          }
          alt='placeholder'
          style={{ ...props.imgStyle }}
        />
      ) : (
        <video
          src={
            (typeof result === 'string' && result.toString()) ||
            replacePinataUrl(defaultRes?.link)
          }
          width='100%'
          style={{ ...props.imgStyle }}
          autoPlay
          loop
          muted
        />
      )}
    </div>
  );
};

export default Dropzone;
