import './form-input.styles.scss'

export default function FormInput({ label, inputOptions }) {
    return (
        <div className='group'>
            <input className='form-input' {...inputOptions} />
            {label && (
                <label
                    className={`${
                        inputOptions?.value?.length ? 'shrink' : ''
                    } form-input-label`}>
                    {label}
                </label>
            )}
        </div>
    )
}
