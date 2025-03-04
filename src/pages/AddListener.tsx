import React, { useState } from 'react'
import { CreateListenerInfoModel, GenderEnum, ListenerTypeEnum } from '../dtos/typeListener';

export const AddListener: React.FC = () => {
    const [listenerData, setListenerData] = useState<CreateListenerInfoModel>({
        registerRequest: {
          userName: "",
          password: "",
          fullName: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          gender: GenderEnum.Male,
          avatarUrl: "",
          weight: 0,
        },
        listenerRequest: {
          description: "",
          listenerType: ListenerTypeEnum.Share,
          price: 0,
        },
      });
      
  return (
    <div>AddListener</div>
  )
}
