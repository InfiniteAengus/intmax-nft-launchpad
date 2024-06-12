import cx from 'classnames';
import { useId } from 'react';

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
  boldLabel?: boolean;
  className?: string;
  label?: string;
  maxLength?: number;
  input: any;
  meta: any;
}

const InputForm: React.FC<InputFormProps> = ({
  boldLabel = false,
  className,
  label,
  maxLength,
  input,
  meta,
  ...props
}: InputFormProps) => {
  const id = useId();

  return (
    <div className={cx('relative', className)}>
      <label htmlFor={id}>
        {label && (
          <p className={boldLabel ? 'input-label-bold' : 'input-label'}>
            {label}
          </p>
        )}
        <div
          className={cx(
            'overflow-hidden rounded-md border',
            meta.touched && meta.error ? 'border-error' : 'border-border'
          )}>
          <input {...input} className='w-full p-2 text-sm' id={id} {...props} />
        </div>
        {(meta.touched && meta.error) || maxLength ? (
          <div className='absolute -bottom-1.5 left-0 flex w-full translate-y-full justify-between'>
            <p className='input-error overflow-hidden overflow-ellipsis whitespace-nowrap'>
              {meta.touched && meta.error && meta.error}
            </p>
            {maxLength && <p className='text-[10px]'>(MAX {maxLength})</p>}
          </div>
        ) : (
          <></>
        )}
      </label>
    </div>
  );
};

export default InputForm;
