import { Oval } from 'react-loader-spinner';

interface Props {
  width?: number;
  height?: number;
}

const Spinner: React.FC<Props> = ({ width, height }: Props) => {
  return (
    <Oval
      visible={true}
      height={width || '80'}
      width={height || '80'}
      color='#beff58'
      ariaLabel='oval-loading'
      wrapperStyle={{}}
      wrapperClass=''
    />
  );
};

export default Spinner;
