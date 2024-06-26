import cx from 'classnames';
import { useId } from 'react';

interface TextareaFormProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  label?: string;
  maxLength?: number;
  input: any;
  meta: any;
}

const TextareaForm: React.FC<TextareaFormProps> = ({
  className,
  label,
  maxLength,
  input,
  meta,
  ...props
}: TextareaFormProps) => {
  const id = useId();

  return (
    <div className={cx('relative', className)}>
      <label htmlFor={id}>
        {label && <p className='input-label pb-4'>{label}</p>}
        <textarea
          {...input}
          className={cx(
            'w-full rounded-md border p-2 text-sm',
            meta.touched && meta.error ? 'border-error' : 'border-border'
          )}
          id={id}
          {...props}
        />
        {(meta.touched && meta.error) || maxLength ? (
          <div className='absolute -bottom-1.5 left-0 flex w-full translate-y-full justify-between'>
            <p className='input-error'>
              {meta.touched && meta.error && meta.error}
            </p>
            {maxLength && <p className='text-xs'>(MAX {maxLength})</p>}
          </div>
        ) : (
          <></>
        )}
      </label>
    </div>
  );
};

export default TextareaForm;
