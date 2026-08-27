import { Input, Modal, Select, DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';

type Props = {
    isModalOpen: boolean
    handleOk: () => void
    handleCancel: () => void
}

const { TextArea } = Input;

export default function TodoEditModal({isModalOpen, handleOk, handleCancel}: Props) {

    const onOk = (value: DatePickerProps['value'] ) => {
        console.log('onOk: ', value.format('YYYY-MM-DD HH:mm:ss'));
    };

    return (
        <>
        <Modal
            title="Редактировать задачу"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={760}
        >
            <p>* Название</p>
            <Input  />
            <p>* Описание</p>
            <TextArea  
                placeholder='Опишите задачу, добавьте заголовки и списки...'
                style={{ height: 120, resize: 'none' }}
            />
            <div style={{display: "flex", gap: "12px"}}>
                <div>
                    <p>* Исполнитель</p>
                    <Select   
                        style={{width: 350}}
                    />
                </div>
                <div>
                    <p>* Статус</p>
                    <Select  
                        style={{width: 350}}
                    />
                </div>
            </div>
            <p>* Дедлайн</p>
            <DatePicker  
                showTime
                onOk={onOk}
            />

        </Modal>
    </>
  );
};