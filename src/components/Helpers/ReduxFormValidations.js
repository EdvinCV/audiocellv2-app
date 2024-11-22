export const required = value => (value || typeof value === 'number' ? undefined : 'Required')
export const maxLength = max => value =>
    value && value.length > max ? `Debe tener ${max} carácteres o menos.` : undefined
export const maxLength15 = maxLength(15)
export const maxLength50 = maxLength(50)
export const maxLength200 = maxLength(200)
export const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)
export const number = value =>
    value && isNaN(Number(value)) ? 'Must be a number' : undefined
export const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined
export const minValue13 = minValue(13)
export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined