import { Button, Card, SelectWithSearch, TextField } from '@/core/components/ui'
import { useModal } from '@/core/hooks/utils/use-modal'
import { FormProvider, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

// import { useAuthSessionStore } from '@/core/store/auth/auth-session-store'
import {
  NotificationEmailGet,
  NotificationEmailPostPut
} from '../types/notification-email'
import {
  NotificationEmailInputsType,
  notificationEmailSchema
} from '../models/notification-email-schema'
import { useCreateNotificationEmail } from '../hooks/requests/use-create-notification-email'
import { useUpdateNotificationEmail } from '../hooks/requests/use-update-notification-email'
import { useEstablishment } from '../../establishments/hooks/requests/use-establishments'

interface NotificationEmailsFormProps {
  type: string
  email?: NotificationEmailGet | null
}

const NotificationEmailsForm = ({
  type,
  email
}: NotificationEmailsFormProps) => {
  const form = useForm<NotificationEmailInputsType>({
    mode: 'all',
    resolver: zodResolver(notificationEmailSchema),
    defaultValues: {
      email: email?.email ?? '',
      establishment_id: email?.establishment?.id ?? null
    }
  })

  // const { company } = useAuthSessionStore()
  const { closeModal } = useModal()
  const { createNotificationEmailFn, isPending } = useCreateNotificationEmail()
  const { updateNotificationEmailFn, isPending: isPendingUpdate } =
    useUpdateNotificationEmail()
  const { establishmentsToSelect, isLoading } = useEstablishment()

  const onSubmit = async (data: NotificationEmailInputsType) => {
    const emailToSend = {
      email: data.email,
      user_id: 1, 
      establishment_id: data.establishment_id
    } as NotificationEmailPostPut
    let resp

    if (type === 'edit') {
      resp = await updateNotificationEmailFn({
        data: emailToSend,
        id: email?.id ?? 0
      })
    } else {
      resp = await createNotificationEmailFn(emailToSend)
    }

    if (resp.status === 201 || resp.status === 200) {
      form.reset()
      closeModal({ elementById: 'create-notification-email' })
      closeModal({ elementById: 'edit-notification-email' })
    } else {
      console.log('Error al crear correo')
    }
  }

  return (
    <Card title={type === 'edit' ? 'Editar correo' : 'Crear correo'}>
      {/* <CreateCategoryClaim /> */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-4 '>
            <TextField
              label='Correo electrónico'
              inputName='email'
              inputError={form.formState.errors.email}
            />
            <SelectWithSearch
              label='Establecimiento'
              inputName='establishment_id'
              inputError={form.formState.errors.establishment_id}
              options={establishmentsToSelect}
              isLoading={isLoading}
              key={crypto.randomUUID()}
            />

            <Button
              type='submit'
              variant='primary'
              disabled={isPending || isPendingUpdate}
            >
              {type === 'edit' ? 'Guardar' : 'Crear'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Card>
  )
}

export default NotificationEmailsForm
