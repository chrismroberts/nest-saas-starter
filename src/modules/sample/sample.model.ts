import * as Joi from 'joi'

export class Sample {
    id: string
    count: number
    name: string
    email: string
    status: string
    back_order?: boolean

    static validationSchema: Joi.ObjectSchema = Joi.object({
        count: Joi.number().required().min(1),
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        status: Joi.string().required().valid('Available', 'Unavailable'),
        back_order: Joi.boolean().when('status', { is: 'Unavailable', then: Joi.required() })
    })
}