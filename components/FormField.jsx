import React from 'react'

function FormField({ title, type, state, placeholder, isTextArea, setState }) {
    return (
        <div className="flexStart flex-col w-full gap-4">
            <label className='w-full text-gray-100'>
                {title}
            </label>

            {isTextArea ? (
                <textarea placeholder={placeholder} value={state} className='form_field-input' onChange={(event) => setState(event.target.value)} />
                ) : (
                    <input type={type || 'text'} placeholder={placeholder} value={state} className='form_field-input' onChange={(event) => setState(event.target.value)} required />
                )}
        </div>
    )
}

export default FormField