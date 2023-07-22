import * as yup from 'yup'

import { isValidPhone } from '@brazilian-utils/brazilian-utils'

export const schema = yup
  .object({
    fullName: yup
      .string()
      .required('Nome e sobrenome são obrigatórios.')
      .min(3, 'Nome e sobrenome muito curto')
      .matches(/(\w.+\s).+/gi, 'O nome deve conter o sobrenome'),
    email: yup.string().required('O email é obrigatório.').email('O email deve ser válido.'),
    mobile: yup
      .string()
      .required('O celular é obrigatório.')
      .transform((value) => value.replace(/[^\d]/g, ''))
      .test('validateMobile', 'O celular inválido.', (value) => isValidPhone(value)),
  })
  .required()

export type FieldValues = yup.InferType<typeof schema>
