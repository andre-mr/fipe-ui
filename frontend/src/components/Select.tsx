import { ChangeEventHandler } from 'react';
import { FipeData } from '../interfaces';

interface Props {
  title: string,
  data: FipeData[],
  onChange?: ChangeEventHandler
}

export default function Select(props: Props) {
  return (
    <>
      <div className="flex items-center h-full w-1/3">
        <p className="text-lg font-bold px-5">{props.title}</p>
      </div>
      <div className="flex items-center px-5 h-full w-2/3 md:w-full">
        <select className="select-text h-1/2 w-full rounded" onChange={props.onChange} defaultValue={'0'} >
          {props.title != 'Tabela' ? <option key={'0'} value={'0'} label={'Selecione'} hidden /> : null}
          {props.data.map((item: FipeData) => <option key={item.Key} value={item.Key} label={item.Value} />)}
        </select>
      </div>
    </>
  )
}